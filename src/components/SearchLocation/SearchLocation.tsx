import React from 'react';
import { Paper, Fab } from '@material-ui/core';
import { SearchLocationProps } from './SearchLocation.types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import Accordion from '../Accordion/Accordion';
import SearchInput from '../SearchInput/SearchInput';
import SearchLocationResultsList from './SearchLocationResultsList';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    accordionSummary: {
      fontSize: '3rem'
    },
    searchInputWrap: {
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row'
    },
    searchInput: {
      maxWidth: '80%',
      margin: '1rem'
    },
    iconButton: {
      color: 'white',
      '&:focus': {
        outline: 'none'
      }
    },
    expandMoreIcon: {
      color: 'white',
      height: '4rem',
      width: '4rem'
    }
  })
);

// const StyledAccordionSummary = withStyles((theme: Theme) => ({
//   root: {
//     backgroundColor: theme.palette.primary.main,
//     color: 'white',
//     '&.Mui-expanded': {
//       minHeight: 'unset'
//     }
//   },
//   content: {
//     justifyContent: 'center',
//     fontSize: '3rem',
//     margin: 0,
//     '&.Mui-expanded': {
//       margin: 0,
//       minHeight: 'unset'
//     }
//   }
// }))(AccordionSummary);
const SearchLocation: React.FC<SearchLocationProps> = ({
  onSearch,
  searchResults = [],
  onSelectLocation,
  selectedLocation,
  onSearchMyLocation
}) => {
  const classes = useStyles();
  return (
    <Paper>
      <Accordion
        header={
          (selectedLocation && selectedLocation.formattedName) || 'no location'
        }
      >
        <div className={classes.searchInputWrap}>
          <Fab
            size="medium"
            color="secondary"
            aria-label="myLocation"
            className={classes.iconButton}
            onClick={onSearchMyLocation}
          >
            <MyLocationIcon />
          </Fab>
          <div className={classes.searchInput}>
            <SearchInput placeholder="חיפוש לפי עיר..." onSearch={onSearch} />
          </div>
        </div>
        {searchResults.length > 0 && (
          <SearchLocationResultsList
            onSelectLocation={onSelectLocation}
            items={searchResults}
          />
        )}
      </Accordion>
    </Paper>
  );
};
export default SearchLocation;
