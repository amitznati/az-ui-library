import React from 'react';
import { Paper, Fab } from '@material-ui/core';
import { SearchLocationProps } from './SearchLocation.types';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles
} from '@material-ui/core/styles';
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
    searchInput: {
      margin: '1rem',
      display: 'flex',
      alignItems: 'center',
      flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row'
    },
    iconButton: {
      color: 'white'
    }
  })
);

const StyledSearchInput = withStyles({
  root: {
    flexGrow: 1
  }
})(SearchInput);
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
        header={(selectedLocation && selectedLocation.name) || 'no location'}
      >
        <div className={classes.searchInput}>
          <Fab
            size="small"
            color="secondary"
            aria-label="myLocation"
            className={classes.iconButton}
            onClick={onSearchMyLocation}
          >
            <MyLocationIcon />
          </Fab>
          <StyledSearchInput
            placeholder="חיפוש לפי עיר..."
            onSearch={onSearch}
          />
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
