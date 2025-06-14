import React, { useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Event as CalendarEvent,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const sampleEvents: Event[] = [
      {
        id: 1,
        title: "Overland South",
        start: new Date(2025, 10, 6),
        end: new Date(2025, 10, 9),
      },
      {
        id: 2,
        title: "Wrench Day - Install Lift Kit",
        start: new Date(2025, 6, 20, 10, 0),
        end: new Date(2025, 6, 20, 16, 0),
      },
    ];
    setEvents(sampleEvents);
  }, []);

  const eventStyleGetter = (
    event: CalendarEvent,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    return {
      style: {
        backgroundColor: "#FACC15", // yellow
        color: "#000",
        borderRadius: "4px",
        border: "none",
        padding: "4px",
        cursor: "pointer",
      },
    };
  };

  return (
    <div style={{ height: "93vh", paddingTop: "12rem", backgroundColor: "#1a1a1a" }}>
      <h1 style={{ color: "#FACC15" }}>Muddy Duck Offroad Events</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "87%", color: "#fff" }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Calendar;
