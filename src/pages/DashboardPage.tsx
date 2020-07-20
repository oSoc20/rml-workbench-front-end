import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { deepOrange, purple, teal } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import DescriptionIcon from '@material-ui/icons/Description';
import MapIcon from '@material-ui/icons/Map';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

import MyDialog from '../components/MyDialog';
import Title from '../components/Title';
import { MAPPER_DEFAULT, RDF_FILE_FORMATS } from '../constants/defaults';
import { TITLES } from '../constants/titles';
import {
  capitalizeFirstLetter,
  getExtension,
  getFilename,
  getRdfByExtension,
  getRdfFileFormat,
  trimFilename,
} from '../utils/stringProcessing';
import { addProcessor, getById, getConfig, removeById } from '../utils/processor';
import { addSource, removeSource } from '../utils/source';
import LineTo from 'react-lineto';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textConfig: {
      width: '30vw',
      margin: '0 auto',
    },
    deploy: {
      display: 'flex',
      alignItems: 'center',
      justifyCenter: 'center',
    },
    btnAdd: { paddingLeft: 0 },
    input: { display: 'none' },
    listItemText: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      minWidth: 200,
      maxWidth: 200,
      [theme.breakpoints.up('sm')]: {
        maxWidth: 400,
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth: 200,
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      paddingTop: theme.spacing(8),
    },
    sourcesTitle: {
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
      },
    },
    teal: { backgroundColor: teal[500] },
    textOrange: { color: deepOrange[500] },
    textPurple: { color: purple[500] },
    textTeal: { color: teal[500] },
  }),
);

const Dashboard = () => {
  const classes = useStyles();

  const [isDeploySettingsOpen, setIsDeploySettings] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);
  const [isProcessingOpen, setIsProcessingOpen] = useState(false);

  const [processors, setProcessors] = useState([Object.assign({}, MAPPER_DEFAULT)]);
  const [sources, setSources] = useState([]);

  const [tmpConfig, setTmpConfig] = useState('');

  const [isTmpDownloadable, setIsTmpDownloadable] = useState(false);
  const [isTmpExecutable, setIsTmpExecutable] = useState(false);
  const [isExecutable, setIsExecutable] = useState(false);
  const [isDownloadable, setIsDownloadable] = useState(false);

  const [currentTarget, setCurrentTarget] = useState(0);
  const [processorIndex, setProcessorIndex] = useState(0);

  const handleAddProcessor = () => {
    setProcessors(addProcessor(processors));
  };

  const handleAddSource = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      let sourcesCopy = sources;
      for (var file of event.target.files) {
        sourcesCopy = addSource(
          {
            name: getFilename(file.name),
            extension: getExtension(file.name),
          },
          sourcesCopy,
        );
      }
      setSources(sourcesCopy);
    }
  };

  const handleChange = (event: any) => {
    setTmpConfig(event.target.value);
  };

  const handleChangeSettings = (setting: string) => (event: any) => {
    if (setting === 'isTmpDownloadable') {
      setIsTmpDownloadable(event.target.checked);
    } else {
      setIsTmpExecutable(event.target.checked);
    }
  };

  const handleFileFormatClick = (fileFormat: any) => {
    let processor = getById(processors, currentTarget);
    processor.target = getRdfFileFormat(fileFormat).extension;
    setIsTargetOpen(false);
  };

  const handleProcessingClick = (index: number) => {
    setProcessorIndex(index);
    setIsProcessingOpen(true);
  };

  const handleProcessingClose = () => {
    setIsProcessingOpen(false);
  };

  const handleProcessingSave = () => {
    processors[processorIndex].config = tmpConfig;
    setIsProcessingOpen(false);
  };

  const handleSettings = () => {
    setIsDeploySettings(true);
  };

  const handleRemoveProcessor = (id: number) => {
    setProcessors(removeById(processors, id));
    setTmpConfig(MAPPER_DEFAULT.config);
  };

  const handleRemoveSource = (source: any) => {
    setSources(removeSource(source.name, sources));
  };

  const handleSettingsClose = () => {
    setIsTmpDownloadable(isDownloadable);
    setIsTmpExecutable(isExecutable);
    setIsDeploySettings(false);
  };

  const handleSettingsSave = () => {
    setIsDownloadable(isTmpExecutable);
    setIsExecutable(isTmpDownloadable);
    setIsDeploySettings(false);
  };

  const handleTargetClick = (id: number) => {
    setCurrentTarget(id);
    setIsTargetOpen(true);
  };

  const handleTargetClose = () => {
    setIsTargetOpen(false);
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container justify="center" spacing={8}>
        <Grid item container md={4} sm={12} xs={12}>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Title title={TITLES[0].title} tooltip={TITLES[0].tooltip} />
              <List>
                {sources.map((source: any, index: number) => (
                  <ListItem
                    button
                    key={`source_${index}`}
                    disableGutters={true}
                    className={'source' + index}
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.purple}>
                        <DescriptionIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.listItemText}
                      secondary={source.extension.toUpperCase() + ' file'}
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.textPurple}
                        color="textPrimary"
                      >
                        {trimFilename(source.name)}
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveSource(source)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                    <LineTo
                      from={'source' + index}
                      to="processor1"
                      fromAnchor="center right"
                      toAnchor="-10% 50%"
                      borderColor="black"
                      borderWidth={2}
                      delay={100}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item>
              <input
                required
                accept=".csv,.json,.nt,.ttl,.xml"
                className={classes.input}
                id="input-button-file"
                type="file"
                onChange={handleAddSource}
                multiple
              />
              <label htmlFor="input-button-file">
                <Button color="primary" component="span" className={classes.btnAdd}>
                  <AddIcon /> Add a source
                </Button>
              </label>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container md={4} sm={6} xs={12}>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Title title={TITLES[1].title} tooltip={TITLES[1].tooltip} />
            </Grid>
            <Grid item>
              <List>
                {processors.map((processor: any, index: number) => (
                  <ListItem
                    button={true}
                    key={`processor_${processor.id}`}
                    disableGutters={true}
                    onClick={() => handleProcessingClick(index)}
                    className={'processor' + index}
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.orange}>
                        {processor.category === 'mapper' ? <MapIcon /> : <TrackChangesIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.textOrange}
                      primary={`${capitalizeFirstLetter(processor.category)} ${index + 1}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveProcessor(processor.id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                component="span"
                className={classes.btnAdd}
                onClick={handleAddProcessor}
              >
                <AddIcon /> Add a processor
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container md={4} sm={6} xs={12}>
          <Grid item container direction="column" alignItems="center">
            <Grid item>
              <Title title={TITLES[2].title} tooltip={TITLES[2].tooltip} />
            </Grid>
            <Grid item>
              <List>
                {processors.map((processor: any) => (
                  <ListItem
                    onClick={() => handleTargetClick(processor.id)}
                    button
                    key={`target_${processor.id}`}
                    disableGutters={true}
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.teal}>
                        <DescriptionIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.listItemText}>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.textTeal}
                        color="textPrimary"
                      >
                        {getRdfByExtension(processor.target).name}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
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

      <MyDialog
        content={
          <TextField
            autoFocus
            variant="outlined"
            id="name"
            label="Config"
            multiline
            size="medium"
            rows={30}
            onChange={handleChange}
            defaultValue={getConfig(processors[processorIndex])}
            fullWidth
          />
        }
        onClose={handleProcessingClose}
        onSave={handleProcessingSave}
        open={isProcessingOpen}
        save="Save"
        title={'Mappings config'}
      />

      <MyDialog
        content={
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
      />

      <MyDialog
        content={
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
