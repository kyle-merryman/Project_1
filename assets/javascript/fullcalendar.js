// $(document).ready($(function() {
//     CalendarHelper();
// }));

function CalendarHelper() {
    $('#calendar').fullCalendar({
      editable: true, 
      header:{
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      // events: [
      //   {
      //     title  : 'event1',
      //     start  : '2018-10-01'
      //   },
      //   {
      //     title  : 'event2',
      //     start  : '2018-10-05',
      //     end    : '2018-10-07'
      //   },
      //   {
      //     title  : 'event3',
      //     start  : '2018-10-09T12:30:00',
      //     allDay : false // will make the time show
      //   }
      // ], 
      events: Events,
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



