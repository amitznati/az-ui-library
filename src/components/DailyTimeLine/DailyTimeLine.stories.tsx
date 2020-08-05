import React from 'react';
import DailyTimeLine from './DailyTimeLine';

export default {
  title: 'DailyTimeLine',
  component: DailyTimeLine
};
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
export const DailyTimes = (): JSX.Element => (
  <DailyTimeLine dayTimes={dayTimes} />
);
