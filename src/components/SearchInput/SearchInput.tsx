import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, InputBase } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      direction: theme.direction,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      fontSize: '1.6rem'
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
);

export default function SearchInput({ placeholder, onSearch }): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  return (
    <Paper className={classes.root}>
      <IconButton
        onClick={(): void => setValue('')}
        className={classes.iconButton}
      >
        <ClearIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={(e): void => setValue(e.target.value)}
      />
      <IconButton
        color="primary"
        className={classes.iconButton}
        onClick={(): void => onSearch(value)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
