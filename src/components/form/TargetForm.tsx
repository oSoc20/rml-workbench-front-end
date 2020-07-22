import React, { useState } from 'react';

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import DescriptionIcon from '@material-ui/icons/Description';

import { FormProps } from './ComponentForm';
import MyDialog from '../MyDialog';

import { ComponentCategory } from '../../constants/componentCategory';
import { RDF_FILE_FORMATS } from '../../constants/defaults';

// import { getById } from '../utils/processor';
// import { getRdfFileFormat } from '../utils/stringProcessing';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    textOrange: { color: deepOrange[500] },
  }),
);

const DEFAULT = {
  category: ComponentCategory.Target,
};

// const [isTargetOpen, setIsTargetOpen] = useState(false);
// const [processors, setProcessors] = useState([Object.assign({}, MAPPER_DEFAULT)]);
// const [currentTarget, setCurrentTarget] = useState(0);

const TargetForm = ({ component, onClose }: FormProps) => {
  const [data, setData] = useState({
    ...DEFAULT,
    ...component,
  });

  const handleClick = (fileFormat: any) => {
    setData({
      ...data,
      fileFormat,
    });
    // let processor = getById(processors, currentTarget);
    // processor.target = getRdfFileFormat(fileFormat)?.extension;
    // setIsTargetOpen(false);
  };

  const classes = useStyles();
  return (
    <MyDialog
      content={
        <List>
          {RDF_FILE_FORMATS.map((fileFormat: any) => (
            <ListItem button onClick={() => handleClick(fileFormat.name)} key={fileFormat.name}>
              <ListItemAvatar>
                <Avatar className={classes.orange}>
                  <DescriptionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={fileFormat.name} />
            </ListItem>
          ))}
        </List>
      }
      onClose={onClose}
      open={true}
      title={'RDF file format'}
    />
  );
};

export default TargetForm;
