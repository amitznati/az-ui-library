import React from 'react';
import { Paper } from '@material-ui/core';
import { SelectedDayInfoProps } from './SelectedDayInfo.types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import NextEvents from './NextEvents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '1.6rem',
      textAlign: 'right',
      direction: theme.direction,
      padding: '2rem',
      paddingBottom: 0
    },
    heEvent: {
      color: theme.palette.primary.main,
      fontSize: '2rem',
      fontWeight: 700,
      textAlign: 'center'
    },
    heDate: {
      marginLeft: '2rem'
    },
    padding: {
      padding: '2rem'
    }
  })
);

const SelectedDayInfo: React.FC<SelectedDayInfoProps> = ({
  selectedDateFormatted,
  nextEvents = []
}) => {
  const classes = useStyles();
  return (
    <Paper>
      <div className={classes.root}>
        <p>זמני היום עבור:</p>
        {selectedDateFormatted.event && (
          <p className={classes.heEvent}>{selectedDateFormatted.event}</p>
        )}
        <span className={classes.heDate}>
          {selectedDateFormatted.formattedDateHe}
        </span>
        <span>{selectedDateFormatted.formattedDate}</span>
      </div>
      <div className={classes.padding}>
        <NextEvents events={nextEvents} />
      </div>
    </Paper>
  );
};
export default SelectedDayInfo;
