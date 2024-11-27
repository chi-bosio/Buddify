"use client"
import { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'; 
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Activity } from '@/components/Interfaces/activity.interface';
import { CustomToolbar } from './ToolBar';
moment.locale('es');
const localizer = momentLocalizer(moment);
type Keys = keyof typeof Views;
interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  backgroundColor?: string;
}
const BigCalendar = ({ activitiesCreated,activitiesJoined }: { activitiesCreated: Activity[] , activitiesJoined: Activity[]}) => {
  const [activities,setActivities] = useState<Activity[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [date, setDate] = useState<Date>(moment().toDate());
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.MONTH);

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
    if(activities.length === 0){
      const events:CalendarEvent[] = []
      setEvents(events);
    }else{
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
    }
  },[activities, activitiesCreated])

  useEffect(() => {
    memoizedSetEventsCalback()
  }, [memoizedSetEventsCalback]);
  useEffect(()=>{
    setActivities(activitiesCreated.concat(activitiesJoined))
  },[activitiesCreated,activitiesJoined])
  useEffect(()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const dateQuery = queryParams.get("date");
    if(dateQuery){
      setDate(moment(dateQuery).toDate() )
    }
  },[])
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
      defaultDate={date}
      style={{ height: 500 , width: '100%'}}
      components={{
        toolbar: CustomToolbar,
      }}
      dayPropGetter={dayPropGetter}
      view={view}
      views={[Views.MONTH, Views.WEEK, Views.DAY,Views.AGENDA]}
      onView={setView}
      onNavigate={setDate}
      date={date}
    />
      
  );
};

export default BigCalendar;
