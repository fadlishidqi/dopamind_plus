// app/screens/calendar/utils.ts
import { MarkedDates } from '../../types';

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getMarkedDates = (activities: any, selectedDate: string): MarkedDates => {
  const marked: MarkedDates = {};
  
  // Mark all dates with activities
  Object.keys(activities).forEach(date => {
    if (activities[date].length > 0) {
      marked[date] = {
        marked: true,
        dotColor: '#FCC3D2'
      };
    }
  });

  // Mark selected date
  marked[selectedDate] = {
    ...marked[selectedDate],
    selected: true,
    selectedColor: '#FCC3D2'
  };

  return marked;
};