import { FormControl, Select, MenuItem, makeStyles } from '@material-ui/core';
import React from 'react';
import { MAPPER_CONFIG, INPUT_CONFIG } from '../constants/defaults';

const handleChange = (event) => {
  console.log(`works ${event.target.value}`);
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
  },
}));

const SelectComponent = (props: any) => {
  const title = props.title;
  const classes = useStyles();
  var selectChoices = [];
  console.log(title);
  switch (title) {
    case 'Mappings config':
      selectChoices = MAPPER_CONFIG;
      break;
    case 'Source config':
      selectChoices = INPUT_CONFIG;
      break;
    default:
  }

  return (
    <FormControl className={classes.formControl} variant="outlined" fullWidth>
      <Select
        labelId="simple-select-filled-label"
        id="simple-select-filled"
        value={selectChoices[0].type}
        onChange={handleChange}
      >
        {selectChoices.map((mapper) => (
          <MenuItem value={mapper.type}>{mapper.type}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
