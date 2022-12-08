console.log("Begin");


var searchListEl = $('#search-bar');
var locationEl = $('#location-input'); //City Name
var startDateEl = $('#start-date'); // Start Date
var endDateEl = $('#end-date'); // End Date
var concertEl = $('#concerts'); // Event type: concert
var sportingEl = $('#sporting-events'); //Event type: sporting-event
var theaterEl = $('#theater');   // Event type: theater
var searchBtn = $('#btn-search');


// https://platform.seatgeek.com/  Event API document
// Query String:  https://api.seatgeek.com/2/events?client_id=MYCLIENTID
// Our Example: https://api.seatgeek.com/2/events?client_id=OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ

var apiKeyEvent = 'OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ';
var eventUrl = 'https://api.seatgeek.com/2/events?client_id='+apiKeyEvent;

// https://api.seatgeek.com/2/venues?client_id=OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ



// event.type: music_festival, concert, golf, family, theater, broadway_tickets_national, ncaa_basketball, ncaa_womens_basketball, wrestling, comedy, cirque_du_soleil, dance_performance_tour, minor_league_hockey, nhl......


console.log("Day: "+dayjs('2022-12-07T08:30:00'));

// Event Handle: when click the search button
function searchHandle(){
    console.log("function call");

    console.log("URL: "+ eventUrl);

    var startDate = startDateEl.val();  // Starting Date
    var endDate = endDateEl.val();  // Ending Date

    // Set the time period by using gt, gte, lt, lte
     //Ex: https://api.seatgeek.com/2/events?datetime_utc.gte=2012-04-01&datetime_utc.lte=2012-04-30
    var apiUrl = eventUrl + '&datetime_utc.gte='+startDate+'&datetime_utc.lte='+endDate;

    console.log("dateURL: "+ apiUrl);

       // Sort the data datetime desc
    var apiUrlDesc = apiUrl +'&sort=datetime_utc.desc';

    console.log("Sorted URL: "+ apiUrlDesc);

    connectUrl(apiUrl); // sending API url
}


function connectUrl(url){

    fetch(url)
    .then(function (response) {
        if (response.ok) {
            console.log("response: " + response);
            return response.json();
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .then(function (data) {
        console.log("Data: " + data);
        // console.log("apiUrl: " + apiUrl);

        displayWeather(data);

    })
    .catch(function (error) {
        console.log(error);
        alert('Unable to get the data');
    });

}




searchBtn.on('click',searchHandle);