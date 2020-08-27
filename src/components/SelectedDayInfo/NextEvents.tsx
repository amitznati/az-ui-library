import React from 'react';
import { Paper } from '@material-ui/core';
import { NextEventProps } from './SelectedDayInfo.types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '1.8rem',
      textAlign: 'right',
      direction: theme.direction,
      padding: '3rem'
    },
    title: {
      color: theme.palette.primary.main,
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '1rem',
      borderBottom: `0.3rem solid ${theme.palette.primary.main}`
    },
    formattedDate: {
      marginLeft: '2rem'
    }
  })
);

const NextEvents: React.FC<NextEventProps> = ({ events }) => {
  const classes = useStyles();
  return (
    <>
      {events.map((event) => (
        <Paper className={classes.root} key={event.date.formattedDateHe}>
          <div>
            <p className={classes.title}>{event.title}</p>
            <div>
              <span className={classes.formattedDate}>
                {event.date.formattedDateHe}
              </span>
              <span>{event.date.formattedDate}</span>
            </div>
            <p>{`כניסה ${event.enter}`}</p>
            <p>{`יציאה ${event.out}`}</p>
          </div>
        </Paper>
      ))}
    </>
  );
};

export default NextEvents;
