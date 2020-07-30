import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Column from '../components/Column';
import MyDialog from '../components/MyDialog';
import ProjectTitle from '../components/ProjectTitle';
import { ComponentCategory } from '../constants/componentCategory';
import { PROJECT_DEFAULT } from '../constants/project';
import { findSources } from '../utils/mapperConfig';
import { getProjects, isProjectExist, removeProject, saveProject } from '../utils/storage';
import { genId } from '../utils/stringProcessing';
import Line from '../components/Lines';
import { DeployService } from '../services/DeployService';
import DownloadWithSocket from '../components/DownloadWithSocket';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deploy: {
      display: 'flex',
      alignItems: 'center',
      justifyCenter: 'center',
      marginTop: theme.spacing(4),
    },
    heroContent: {
      padding: theme.spacing(4, 0, 6),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      paddingTop: theme.spacing(8),
    },
    projectName: {
      display: 'flex',
      justifyContent: 'center',
    },
    textField: {
      marginLeft: theme.spacing(2),
    },
  }),
);

const getAllComponentsByCategory = (columns, category) => {
  return columns
    .filter((col) => col.category === category)
    .reduce((arr, col) => [...arr, ...col.components], []);
};

const updateConfig = (config, columns) => {
  const newConfig = { ...config };

  const sources = getAllComponentsByCategory(columns, ComponentCategory.Source);
  const processors = getAllComponentsByCategory(columns, ComponentCategory.Processor);
  newConfig.processors = processors.map((processor: any) => {
    if (processor.type === 'mapper') {
      const sourceIds = findSources(processor.config).map(
        (fileName) => sources.find((s) => s.filename === fileName)?.id,
      );
      return {
        ...processor,
        sources: sourceIds,
      };
    }
    return processor;
  });
  newConfig.sources = sources;
  return newConfig;
};

const DashboardPage = () => {
  const { id } = useParams();
  var isUntitled = false;
  if (id.includes('untitled')) {
    isUntitled = true;
  }

  const project = useMemo(() => getProjects()[id], [id]);
  if (!isUntitled && !project) {
    return <Redirect to="/" />;
  } else if (isUntitled) {
    const newId = genId();
    return (
      <Dashboard
        key={newId}
        project={{
          ...PROJECT_DEFAULT,
          createdAt: new Date().getTime(),
          id: newId,
          name: newId,
        }}
      />
    );
  } else {
    return <Dashboard key={id} project={project} />;
  }
};

const Dashboard = ({ project }) => {
  const classes = useStyles();

  const [isDeploySettingsOpen, setIsDeploySettings] = useState(false);
  const [downloadId, setDownloadId] = useState(null);
  const [columns, setColumns] = useState(project.columns);
  const [projectName, setProjectName] = useState(project.name);
  const [config, setConfig] = useState(project.config);

  const handleUpdateProject = (title: string) => {
    setProjectName(title);
  };

  const handleUpdateColumn = (id, data) => {
    const newColumns = columns.map((col) => {
      if (col.id === id) {
        return { ...data };
      }
      return col;
    });
    const newConfig = updateConfig(config, newColumns);
    setConfig(newConfig);
    setColumns(newColumns);
  };

  useEffect(() => {
    const isEmptyDashboard = () => {
      for (const column of columns) {
        if (column.components.length !== 0) {
          return false;
        }
      }
      return true;
    };

    if (!isEmptyDashboard()) {
      saveProject(project.id, {
        ...project,
        name: projectName,
        config,
        columns,
      });
    } else if (isProjectExist(project.id)) {
      removeProject(project);
    }
  }, [columns, config, projectName, project]);

  const handleSettingsChange = (event: any) => {
    setConfig({
      ...config,
      [event.target.name]: event.target.checked,
    });
  };

  const setDeploySettingsOpen = (open) => {
    setIsDeploySettings(open);
  };

  const handleSettingsSave = () => {
    sendData();
    setIsDeploySettings(false);
  };

  const sendData = async () => {
    config.processors = config.processors.map((processor) => ({
      ...processor,
      config: btoa(processor.config),
    }));
    console.log(config);
    var deployService = new DeployService();
    var response = await deployService.create(config);
    setDownloadId(response['token']);
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <ProjectTitle title={projectName} onUpdate={handleUpdateProject} />
        <Typography variant="h6" align="center" color="textSecondary" component="h2" gutterBottom>
          Add your source files and mappings configs to deploy generate your RML file!
        </Typography>
      </Container>
      <Grid container>
        {columns.map((column: any, index: number) => (
          <Column key={index} column={column} onUpdate={handleUpdateColumn} />
        ))}
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center">
            <div className={classes.deploy}>
              {downloadId != null ? (
                <DownloadWithSocket id={downloadId} onFinished={() => setDownloadId(null)} />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setDeploySettingsOpen(true)}
                  startIcon={<SendIcon />}
                >
                  Deploy
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <MyDialog
        children={
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={config.execute}
                  onChange={handleSettingsChange}
                  name="execute"
                  color="primary"
                />
              }
              label="Execute the RML file"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={config.download}
                  onChange={handleSettingsChange}
                  name="download"
                  color="primary"
                />
              }
              label="Download the workspace"
            />
          </FormGroup>
        }
        onClose={() => setDeploySettingsOpen(false)}
        onSave={handleSettingsSave}
        open={isDeploySettingsOpen}
        save={'Deploy'}
        title={'Deployment settings'}
      />

      {config.processors !== undefined ? (
        config.processors.map((processor) => {
          return processor.sources.map((source, index: number) => {
            return <Line key={index} sourceId={source} processorId={processor.id} />;
          });
        })
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default DashboardPage;
