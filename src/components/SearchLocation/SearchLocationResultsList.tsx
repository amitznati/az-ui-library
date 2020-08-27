import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    },
    listItem: {
      boxShadow: theme.shadows[3],
      margin: '1rem',
      width: 'unset'
    },
    listItemText: {
      textAlign: 'center'
    }
  })
);

export default function SearchLocationResultsList({
  items,
  onSelectLocation
}): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav">
        {items.map((item) => (
          <ListItem
            button
            onClick={(): void => onSelectLocation(item)}
            key={item.coords.latitude + item.coords.longitude}
            className={classes.listItem}
          >
            <ListItemText
              className={classes.listItemText}
              primary={item.formattedName}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
