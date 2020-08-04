import React from 'react';
import DailyTimeLine from './DailyTimeLine';

export default {
  title: 'DailyTimeLine',
  component: DailyTimeLine
};
const dayTimes = JSON.parse(
  '[{"key":"dayHour","title":"שעה זמנית הגר\\"א","time":"01:07"},{"key":"alotHashahar90","title":"עלות השחר 90 דקות","time":"04:16"},{"key":"alotHashahar72","title":"עלות השחרת 72 דקות","time":"04:37"},{"key":"misheyakir","title":"זמן משיכיר","time":"05:02"},{"key":"sunrise","title":"זריחה (הנץ)","time":"05:58"},{"key":"sofZmanShma","title":"סוף זמן ק\\"ש","time":"09:22"},{"key":"sofZmanTfila","title":"סוף זמן תפילה","time":"10:30"},{"key":"hazot","title":"חצות היום והלילה","time":"12:45"},{"key":"minhaGdola","title":"מנחה גדולה","time":"13:19"},{"key":"minhaKtana","title":"מנחה קטנה","time":"16:43"},{"key":"plagMinha","title":"פלג מנחה","time":"18:08"},{"key":"sunset","title":"שקיעה","time":"19:33"},{"key":"tzetHakohavim","title":"צאת הכוכבים","time":"19:53"},{"key":"tzetHakohavimRT","title":"צאת הכוכבים ר\\"ת","time":"20:54"}]'
);
export const DailyTimes = (): JSX.Element => (
  <DailyTimeLine dayTimes={dayTimes} />
);
