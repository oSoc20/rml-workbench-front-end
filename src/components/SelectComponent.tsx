import { FormControl, Select, MenuItem, makeStyles } from '@material-ui/core';
import React from 'react';

const handleChange = (event) => {
  console.log(`works ${event.target.value}`);
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
  },
}));

const SelectComponent = (props: any) => {
  const options = props.options;
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined" fullWidth>
      <Select
        labelId="simple-select-filled-label"
        id="simple-select-filled"
        value={options[0].type}
        onChange={handleChange}
      >
        {options.map((mapper) => (
          <MenuItem value={mapper.type}>{mapper.type}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
