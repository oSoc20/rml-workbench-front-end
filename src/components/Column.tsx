
import * as React from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
  Grid,
  List,
  Button
} from '@material-ui/core';
import Title from "./Title";
import AddIcon from "@material-ui/icons/Add";
import {deepOrange, purple, teal} from "@material-ui/core/colors";
import {Columns} from "../constants/columns";
import ComponentItem from "./item/ComponentItem";
import {ComponentCategory} from "../constants/componentCategory";
import {useState} from "react";
import ComponentForm from "./form/ComponentForm";

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

const isAddAllowed = (category) => {
  if (category === ComponentCategory.Processor || category === ComponentCategory.Source) {
    return true;
  }
  return false;
}

interface ColumnProps {
  updateColumn: (id: number, data: any) => void,
  column: any;
}

const Column = ({ updateColumn, column }: ColumnProps) => {
  const classes = useStyles();

  const [detail, setDetail] = useState();

  const handleUpdateColumn = (data: any) => {
    updateColumn(column.id, data);
  }

  const handleUpdate = (component) => {
    // close dialog if necessary
    if (detail) {
      setDetail(null);
    }
    // save data
    const data = { ...column };
    if (component.id) {
      // existing, replace
      data.components = data.components.map((c) => {
        if (c.id === component.id) {
          return component;
        }
        return c;
      });
    } else {
      // add
      data.components = [...data.components, {
        ...component,
        id: new Date().getTime()
      }];
    }
    handleUpdateColumn(data);
  }

  const handleRemove = (id: number) => {
    const data = { ...column };
    data.components = data.components.filter((component) => component.id !== id);
    handleUpdateColumn(data);
  };

  const handleDetail = (component: any) => {
    setDetail(component);
  };

  return (
    <>
      <Grid item container md={4} sm={6} xs={12}>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Title title={Columns[column.category].title} tooltip={Columns[column.category].tooltip} />
          </Grid>
          <Grid item>
            <List>
              {column.components.map((component: any, index: number) => (
                <ComponentItem key={component.id}
                               index={index}
                               onUpdate={handleDetail}
                               onRemove={handleRemove}
                               component={component} />
              ))}
            </List>
          </Grid>
          {isAddAllowed(column.category) && (
            <Grid item>
              <Button
                color="primary"
                component="span"
                className={classes.btnAdd}
                onClick={() => handleDetail({
                  category: column.category,
                })}
              >
              <AddIcon /> Add a {column.category}
            </Button>
          </Grid> )}
        </Grid>
      </Grid>
      {
        detail && <ComponentForm onUpdate={handleUpdate} component={detail} onClose={() => setDetail(null)} />
      }
    </>
  );
};

export default Column;
