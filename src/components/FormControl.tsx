import { FormControl, Select, MenuItem, makeStyles } from '@material-ui/core';
import React from 'react';

const handleChange = (event) => {
  console.log(`works ${event}`);
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    color: 'ff0000',
  },
}));

const MyForm = () => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined" fullWidth>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value="test"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'Mapper'}>Mapper</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MyForm;
