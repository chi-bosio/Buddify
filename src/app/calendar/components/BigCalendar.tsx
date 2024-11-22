"use client"
import { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'; 
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Activity } from '@/components/Interfaces/activity.interface';
import { CustomToolbar } from './ToolBar';
moment.locale('es');
const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  backgroundColor?: string;
}

const BigCalendar = ({ activitiesCreated,activitiesJoined }: { activitiesCreated: Activity[] , activitiesJoined: Activity[]}) => {
  const [activities] = useState<Activity[]>(activitiesCreated.concat(activitiesJoined));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const dayPropGetter = (date: Date) => {
    const today = moment().startOf('day'); 
    const currentDate = moment(date).startOf('day'); 
    const isToday = currentDate.isSame(today, 'day');
    return {
      className: isToday
        ? '!bg-customPalette-orange !text-customPalette-white '  
        : '!bg-customPalette-graydark !text-customPalette-black opacity-70', 
      color: '#020100'
    };
  };
  const memoizedSetEventsCalback = useCallback(()=>{
    const events = activities.map((activity: Activity) => {
      const [hours, minutes] = activity.time.split(':').map(Number);
      const startDateTime = moment(activity.date).set({ hour: hours, minute: minutes });
      const endDateTime = startDateTime.clone().add(1, 'hour');
    
      return {
        title: activity.name,
        start: startDateTime.toDate(),
        end: endDateTime.toDate(),
        backgroundColor: `${activitiesCreated.includes(activity) ? "#27AE60":"#235789"}`
      };
    });
    setEvents(events);
  },[activities, activitiesCreated])
  useEffect(() => {
    memoizedSetEventsCalback()
  }, [activities, activitiesCreated, memoizedSetEventsCalback]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      eventPropGetter={(event) => ({
        style: {
          backgroundColor: event.backgroundColor,
        },
      })}
      startAccessor="start"
      endAccessor="end"
      defaultDate={moment().toDate()}
      style={{ height: 500 , width: '100%'}}
      components={{
        toolbar: CustomToolbar,
      }}
      dayPropGetter={dayPropGetter}
    />
  );
};

export default BigCalendar;
