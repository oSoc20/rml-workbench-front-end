import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';

import MyDialog from '../components/MyDialog';
import Column from '../components/Column';
import { ComponentCategory } from '../constants/componentCategory';
import {Columns} from "../constants/columns";
import {findSources} from "../utils/mapperConfig";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deploy: {
      display: 'flex',
      alignItems: 'center',
      justifyCenter: 'center',
      marginTop: theme.spacing(4),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      paddingTop: theme.spacing(8),
    },
  }),
);

const CONFIG_DEFAULT = {
  download: true,
  execute: false,
};

const COLUMNS_DEFAULT = [
  {
    id: new Date().getTime(),
    name: Columns[ComponentCategory.Source].title,
    category: ComponentCategory.Source,
    components: [],
  },
  {
    id: new Date().getTime() + 1, // or unique hash in future
    name: Columns[ComponentCategory.Processor].title,
    category: ComponentCategory.Processor,
    components: [],
  },
];

const getAllComponentsByCategory = (columns, category) => {
  // get all components of a specific category over multiple columns
  return columns
    .filter((col) => col.category === category)
    .reduce((arr, col) => ([...arr, ...col.components]), []);
}

const updateConfig = (config, columns) => {
  const newConfig = {...config};

  const sources = getAllComponentsByCategory(columns, ComponentCategory.Source);
  const processors = getAllComponentsByCategory(columns, ComponentCategory.Processor);

  newConfig.processors = processors.map((processor) => {
    if (processor.type === 'mapper') {
      const sourceIds = findSources(processor.config)
        .map((fileName) => sources.find((s) => s.file?.name === fileName)?.id)
        .map((id) => !id); // only keep the ones that exist as a source

      return {
        ...processor,
        sources: sourceIds,
      }
    }
    return processor;
  });

  newConfig.sources = sources;

  return newConfig;
};

const Dashboard = () => {
  const classes = useStyles();

  const [isDeploySettingsOpen, setIsDeploySettings] = useState(false);

  const [columns, setColumns] = useState([...COLUMNS_DEFAULT.map((col) => ({ ...col }))]);

  const [config, setConfig] = useState({...CONFIG_DEFAULT});

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

    // TODO save to localStorage
  };

  /* const handleFilesUpload = (event: any) => {
    if (event.target.files.length > 0 && sources.length === 0) {
      setSources(event.target.files);
    } else {
      let sourcesArray = toArray(sources);
      let tmp = [];
      for (const file of event.target.files) {
        if (
          sourcesArray
            .map((source: any) => {
              return source.name;
            })
            .indexOf(file.name) === -1
        ) {
          tmp.push(file);
        }
      }
      setSources(sourcesArray.concat(tmp));
    }
  }; */

  const handleSettingsChange = (event: any) => {
    setConfig({
      ...config,
      [event.target.name]: event.target.checked,
    })
  };

  const setDeploySettingsOpen = (open) => {
    setIsDeploySettings(open);
  };

  const handleSettingsSave = () => {
    sendData();
    setIsDeploySettings(false);
  };

  /* const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }; */

  const sendData = async () => {
    let formData = new FormData();

    /* let tmpProcessors = [...processors];
    for (const processor of tmpProcessors) {
      processor.config = btoa(processor.config);
      console.log(processors[0].config);
      formData.append('processors[]', JSON.stringify(processor));
    }

    toArray(sources).forEach((source) => {
      getBase64(source, (result: any) => {
        console.log(result);
        formData.append('sources[]', result);
      });
    });

    for (const pair of formData.entries()) {
      console.log(pair[0] + ' - ' + pair[1]);
    } */
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        {columns.map((column, index: number) => (
          <Column key={index} updateColumn={handleUpdateColumn} column={column} />
        ))}
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center">
            <div className={classes.deploy}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setDeploySettingsOpen(true)}
              >
                Deploy
              </Button>
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
              label="Execute the RDF file"
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
    </Paper>
  );
};

export default Dashboard;
