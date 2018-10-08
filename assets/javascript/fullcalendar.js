$(document).ready($(function() {
    CalendarHelper();
}));

function CalendarHelper() {
    $('#calendar').fullCalendar({
      editable: true, 
      header:{
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      }, 
      // events: Events,
      renderEvent: true,
      navLinks: true,
      eventLimit: true, // for all non-agenda views
      views: {
        agenda: {
          eventLimit: 3 // adjust to 6 only for agendaWeek/agendaDay
        }
      },
      editable: true,
    });
}



