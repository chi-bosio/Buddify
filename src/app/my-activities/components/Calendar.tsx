"use client";

import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'; // Cambié BigCalendar por Calendar
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Activity } from '@/components/Interfaces/activity.interface';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: moment.Moment;
  end: moment.Moment;
}

const CalendarActivities = ({ activities }: { activities: Activity[] }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const events = activities.map((activity: Activity) => ({
      title: activity.name,
      start: moment(activity.date), 
      end: moment(activity.date),
    }));
    setEvents(events);
  }, [activities]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultDate={moment().toDate()}
      style={{ height: 500 }}
    />
  );
};

export default CalendarActivities;
