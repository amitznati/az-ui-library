import React from 'react';
import { AppBar, SearchLocation } from '../index';
import * as logo from '../styles/assets/images/ic_launcher_round.png';
import { LocationItem } from '../components/SearchLocation/SearchLocation.types';
import Calendar from '../components/Calendar/Calendar';
import DailyTimeLine from '../components/DailyTimeLine/DailyTimeLine';
import { Grid } from '@material-ui/core';
import SelectedDayInfo from '../components/SelectedDayInfo/SelectedDayInfo';

const dayTimes = JSON.parse(
  `[
  {
    "key": "dayHour",
    "title": "שעה זמנית הגרא",
    "time": "01:07",
    "inDay": false
  },
  {
    "key": "alotHashahar90",
    "title": "עלות השחר 90 דקות",
    "time": "04:16",
    "inDay": false
  },
  {
    "key": "alotHashahar72",
    "title": "עלות השחרת 72 דקות",
    "time": "04:37"
  },
  {
    "key": "misheyakir",
    "title": "זמן משיכיר",
    "time": "05:02"
  },
  {
    "key": "sunrise",
    "title": "זריחה (הנץ)",
    "time": "05:58",
    "inDay": true
  },
  {
    "key": "sofZmanShma",
    "title": "סוף זמן קש",
    "time": "09:22",
    "inDay": true
  },
  {
    "key": "sofZmanTfila",
    "title": "סוף זמן תפילה",
    "time": "10:30",
    "inDay": true
  },
  {
    "key": "hazot",
    "title": "חצות היום והלילה",
    "time": "12:45",
    "inDay": true
  },
  {
    "key": "minhaGdola",
    "title": "מנחה גדולה",
    "time": "13:19",
    "inDay": true
  },
  {
    "key": "minhaKtana",
    "title": "מנחה קטנה",
    "time": "16:43",
    "inDay": true
  },
  {
    "key": "plagMinha",
    "title": "פלג מנחה",
    "time": "18:08",
    "inDay": true
  },
  {
    "key": "sunset",
    "title": "שקיעה",
    "time": "19:33"
  },
  {
    "key": "tzetHakohavim",
    "title": "צאת הכוכבים",
    "time": "19:53"
  },
  {
    "key": "tzetHakohavimRT",
    "title": "צאת הכוכבים רת",
    "time": "20:54"
  }
]`
);
export const DayTimesPage = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [searchResults, setSearchResults] = React.useState<Array<LocationItem>>(
    []
  );
  const [selectedLocation, setSelectedLocation] = React.useState();
  const navigationLinks = [
    { title: 'בית', to: '#' },
    { title: 'זמני היום', to: '#', active: true },
    { title: 'תפילה קרובה', to: '#' },
    { title: 'אודות', to: '#' }
  ];
  const locations = [
    { formattedName: 'דימנה', coords: { latitude: 123, longitude: 342 } },
    { formattedName: 'תל אביב', coords: { latitude: 1232, longitude: 342 } },
    { formattedName: 'ירושלים', coords: { latitude: 1233, longitude: 342 } },
    { formattedName: 'New York', coords: { latitude: 1234, longitude: 342 } }
  ];
  return (
    <div>
      <AppBar
        logoSrc={logo}
        title="זמני היום"
        navigationLinks={navigationLinks}
      />
      <Grid container>
        <Grid item xs={12} md={6} lg={6}>
          <Grid container>
            <Grid item xs={12}>
              <SearchLocation
                onSearch={(): void => setSearchResults(locations)}
                searchResults={searchResults}
                onSelectLocation={(loc): void => setSelectedLocation(loc)}
                selectedLocation={selectedLocation}
              />
            </Grid>
            <Grid item xs={12}>
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectedDayInfo
                selectedDateFormatted={{
                  event: 'ערב שבת נחמו',
                  formattedDate: '26 אוגוסט 2020',
                  formattedDateHe: 'ד אלול תש"פ'
                }}
                nextEvents={[
                  {
                    title: 'שבת הקרובה: שבת נחמו',
                    out: '18:36',
                    enter: '19:36',
                    date: {
                      formattedDate: '7/29/2020',
                      formattedDateHe: 'ט אלול תש"פ'
                    }
                  }
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <DailyTimeLine dayTimes={dayTimes} />
        </Grid>
      </Grid>
    </div>
  );
};
