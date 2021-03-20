var now = new Date(),
  currYear = now.getFullYear(),
  currMonth = now.getMonth(),
  currDay = now.getDate(),
  min = new Date(currYear, currMonth, currDay),
  max = new Date(currYear, currMonth + 6, currDay);

mobiscroll.datepicker("#demo-booking-multiple", {
  controls: ["calendar"],
  min: min,
  max: max,
  selectMultiple: true,
  onInit: function (event, inst) {
    inst.setVal(
      [
        new Date(currYear, currMonth, currDay + 1),
        new Date(currYear, currMonth, currDay + 5),
        new Date(currYear, currMonth, currDay + 6),
      ],
      true
    );
  },
  onPageLoading: function (event, inst) {
    getBookings(event.firstDay, function callback(bookings) {
      inst.setOptions({
        labels: bookings.labels,
        invalid: bookings.invalid,
      });
    });
  },
});

function getBookings(d, callback) {
  var invalid = [],
    labels = [];

  mobiscroll.util.http.getJson(
    "//trial.mobiscroll.com/getbookings/?year=" +
      d.getFullYear() +
      "&month=" +
      d.getMonth(),
    function (bookings) {
      for (var i = 0; i < bookings.length; ++i) {
        var booking = bookings[i],
          d = new Date(booking.d);

        if (booking.nr > 0) {
          labels.push({
            start: d,
            title: booking.nr + " SPOTS",
            textColor: "#e1528f",
          });
        } else {
          invalid.push(d);
        }
      }
      callback({ labels: labels, invalid: invalid });
    },
    "jsonp"
  );
}
