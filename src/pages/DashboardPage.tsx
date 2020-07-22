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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deploy: {
      display: 'flex',
      alignItems: 'center',
      justifyCenter: 'center',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      paddingTop: theme.spacing(8),
    },
  }),
);

const CONFIG_DEFAULT = [
  {
    id: new Date().getMilliseconds(),
    category: ComponentCategory.Source,
    components: [],
  },
  {
    id: new Date().getMilliseconds() + 1, // or unique hash in future
    category: ComponentCategory.Processor,
    components: [],
  },
  {
    id: new Date().getMilliseconds() + 2,
    category: ComponentCategory.Target,
    components: [],
  },
];

const Dashboard = () => {
  const classes = useStyles();

  const [isDeploySettingsOpen, setIsDeploySettings] = useState(false);

  const [columns, setColumns] = useState([...CONFIG_DEFAULT.map((col) => ({ ...col }))]);

  const [isTmpDownloadable, setIsTmpDownloadable] = useState(false);
  const [isTmpExecutable, setIsTmpExecutable] = useState(false);
  const [isExecutable, setIsExecutable] = useState(false);
  const [isDownloadable, setIsDownloadable] = useState(false);

  const handleUpdateColumn = (id, data) => {
    const newColumns = columns.map((col) => {
      if (col.id === id) {
        return { ...data };
      }
      return col;
    });

    // TODO save to localStorage (all projects) + processColumns to check if every processor has a target with same id

    setColumns(newColumns);
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

  const handleChangeSettings = (setting: string) => (event: any) => {
    if (setting === 'isTmpDownloadable') {
      setIsTmpDownloadable(event.target.checked);
    } else {
      setIsTmpExecutable(event.target.checked);
    }
  };

  const handleSettings = () => {
    setIsDeploySettings(true);
  };

  const handleSettingsClose = () => {
    setIsTmpDownloadable(isDownloadable);
    setIsTmpExecutable(isExecutable);
    setIsDeploySettings(false);
  };

  const handleSettingsSave = () => {
    setIsDownloadable(isTmpExecutable);
    setIsExecutable(isTmpDownloadable);
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
    formData.append('isExecutable', JSON.stringify(isExecutable));
    formData.append('isDownloadable', JSON.stringify(isDownloadable));

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

  /* const toArray = (fileList: any) => {
    return Array.prototype.slice.call(fileList);
  }; */

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        {columns.map((column) => (
          <Column updateColumn={handleUpdateColumn} column={column} />
        ))}
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center">
            <div className={classes.deploy}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => handleSettings()}
              >
                Deploy
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>

      {/* <MyDialog
        children={
          <List>
            {RDF_FILE_FORMATS.map((fileFormat: any) => (
              <ListItem
                button
                onClick={() => handleFileFormatClick(fileFormat.name)}
                key={fileFormat.name}
              >
                <ListItemAvatar>
                  <Avatar className={classes.teal}>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={fileFormat.name} />
              </ListItem>
            ))}
          </List>
        }
        onClose={handleTargetClose}
        open={isTargetOpen}
        title={'RDF file format'}
      /> */}

      <MyDialog
        children={
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isTmpExecutable}
                  onChange={handleChangeSettings('isTmpExecutable')}
                  name="isExecutable"
                  color="primary"
                />
              }
              label="Execute the RDF file"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isTmpDownloadable}
                  onChange={handleChangeSettings('isTmpDownloadable')}
                  name="isDownloadable"
                  color="primary"
                />
              }
              label="Download the workspace"
            />
          </FormGroup>
        }
        onClose={handleSettingsClose}
        onSave={handleSettingsSave}
        open={isDeploySettingsOpen}
        save={'Deploy'}
        title={'Deployment settings'}
      />
    </Paper>
  );
};

export default Dashboard;
