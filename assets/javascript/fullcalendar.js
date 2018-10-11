$(document).ready(
  $(function() {
    CalendarHelper();
  })
);

function CalendarHelper() {
  $("#calendar").fullCalendar({
    editable: true,
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay"
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
    eventRender: function(event, element) {
      element.click(function() {
        $("#myModal")
          .modal(open)
          .show();
        $("#myModal").removeClass("fade");
        $("#modal-name").val(event.title);
        $("#modal-start").val(moment(event.start).format());
        $("#modal-end").val(moment(event.end).format());
        $("#modal-address").val(event.address);
        $("#modal-url").attr("href", event.url);
        $("#modal-update").show();
        $("#modal-add-event").hide();
      });
    }
  });
}
