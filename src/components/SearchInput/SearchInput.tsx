import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, InputBase, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      direction: theme.direction,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      fontSize: '2.5rem',
      flex: 1
    },
    iconButton: {
      padding: 10,
      '&:focus': {
        outline: 'none'
      }
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
        disabled={!value}
      >
        <ClearIcon />
      </IconButton>
      <Divider className={classes.divider} />
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={(e): void => setValue(e.target.value)}
      />
      <IconButton
        color="primary"
        disabled={!value}
        className={classes.iconButton}
        onClick={(): void => onSearch(value)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
