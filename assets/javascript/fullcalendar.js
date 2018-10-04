$(document).ready($(function() {

    // page is now ready, initialize the calendar...
  
    $('#calendar').fullCalendar({
        events: [
          {
            title  : 'event1',
            start  : '2018-10-01',
            url    : 'https://www.facebook.com'
          },
          {
            title  : 'event2',
            start  : '2018-01-05',
            end    : '2018-01-07'
          },
          {
            title  : 'event3',
            start  : '2018-01-09T12:30:00',
            allDay : false // will make the time show
          }
        ]
    });
    
  
  }));