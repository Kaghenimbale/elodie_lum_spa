"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calender = () => {
  const [events, setEvents] = useState([
    { title: "Meeting", date: "2025-07-07" },
    { title: "Birthday Party", date: "2025-07-15T14:00:00" },
  ]);

  const handleDateClick = (arg: { dateStr: any }) => {
    // bind with an external function
    alert(arg.dateStr);
  };

  // Example: Fetch events from an API
  useEffect(() => {
    // In a real app, you might fetch data here
    // fetch('/api/events')
    //   .then(res => res.json())
    //   .then(data => setEvents(data));
  }, []);
  return (
    <div className="bg-white">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true} // Allows dragging/resizing events
        selectable={true} // Allows selecting dates
        selectMirror={true}
        dayMaxEvents={true} // when too many events in a day, show "more" link
        weekends={true} // show weekend days
        events={events} // Your array of events
        dateClick={handleDateClick} // handle date clicks
        eventClick={(info) => {
          // handle event clicks
          alert("Event: " + info.event.title);
          alert(
            "Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY
          );
          alert("View: " + info.view.type);
          // change the border color just for fun
          info.el.style.borderColor = "red";
        }}
        select={(info) => {
          // handle date range selection
          let title = prompt("Please enter a new title for your event");
          let calendarApi = info.view.calendar;

          calendarApi.unselect(); // clear date selection

          if (title) {
            calendarApi.addEvent({
              id: `${Date.now()}`, // unique ID
              title,
              start: info.startStr,
              end: info.endStr,
              allDay: info.allDay,
            });
          }
        }}
        // You can add more props for event content, styling, etc.
      />
    </div>
  );
};

export default Calender;
