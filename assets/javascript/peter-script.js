console.log("Begin");

var searchFormEl = $('#search-form'); // Input Form
var eventNameEl = $('#event-name'); // Event Name
var locationEl = $('#location-input'); //City Name
var startDateEl = $('#start-date'); // Start Date
var endDateEl = $('#end-date'); // End Date
var concertEl = $('#concerts'); // Event type: concert
var sportingEl = $('#sporting-events'); //Event type: sporting-event
var theaterEl = $('#theater');   // Event type: theater
var searchBtn = $('#btn-search');
var searchResultEl = $('#search-results');


// https://platform.seatgeek.com/  Event API document
// Query String:  https://api.seatgeek.com/2/events?client_id=MYCLIENTID
// Our Example: https://api.seatgeek.com/2/events?client_id=OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ

var apiKeyEvent = 'OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ';
var eventUrl = 'https://api.seatgeek.com/2/events?client_id='+apiKeyEvent;

// https://api.seatgeek.com/2/venues?client_id=OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ


// event.type: music_festival, concert, golf, family, theater, broadway_tickets_national, ncaa_basketball, ncaa_womens_basketball, wrestling, comedy, cirque_du_soleil, dance_performance_tour, minor_league_hockey, nhl......

// $event.type=music_festival+concert

console.log("Day: "+dayjs('2022-12-07T08:30:00'));

// Event Handle: when click the search button
function searchHandle(event){
    
    console.log("function call");
    console.log("URL: "+ eventUrl);

    event.preventDefault();

    //  'https://api.seatgeek.com/2/events?venue.state=NY'

    var eventName = eventNameEl.val().trim(); 
    var zipcode = locationEl.val().trim() // search
    var startDate = startDateEl.val();  // Starting Date
    var endDate = endDateEl.val();  // Ending Date

    
    var apiUrl = eventUrl;// + '&q='+eventName+'&postal_code='+zipcode;

    if(eventName !== ''){
        apiUrl += '&q='+eventName;
    }

    if(zipcode !== ''){
        apiUrl += '&postal_code='+zipcode+'&range=30mi';
    }

    if(startDate !== ''){
        console.log("Start Day: "+startDate);

        apiUrl += '&datetime_utc.gte='+startDate;
    }
    
    if(endDate !== ''){
        apiUrl += '&datetime_utc.lte='+endDate;
    }

    // if(desc){
    //     apiUrl += '&sort=datetime_utc.desc';
    // }

    console.log("dateURL: "+ apiUrl);


    connectUrl(apiUrl); // sending API url
}

// Recevie apiUrl and call displayEvent();
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

        displayEvent(data);

    })
    .catch(function (error) {
        console.log(error);
        alert('Some problems happened!');
    });

}

// If there is no result, show the message
function noData(){
    searchResultEl.empty();
    var noData = $('<p>').text("We're sorry!\nNo events matched your selection. \nTry broadening your selections");
    searchResultEl.append(noData);
}

// Connection Error
function errorMessage(){
    searchResultEl.empty();

}


// display event list on the screen;
function displayEvent(data){
console.log(data);
    searchResultEl.empty();
    var events = data.events;   // 

    if(events.length === 0){
        noData();
        console.log("No Data");
    }

    for (let i = 0; i < events.length; i++) {
        var type = events[i].type;
        console.log("Type: "+type);
        var title = events[i].title;
        var url = events[i].url;
        var score = events[i].score;
        var date = events[i].datetime_utc;
        var dateLocal = events[i].datetime_local;
    
        var venue = events[i].venue;    // venue
        var state = venue.state;
        var postalCode = venue.postal_code;
        var placeName = venue.name;
        var lat = venue.location.lat;
        var lon = venue.location.lon;
        var address = venue.address;
        var city = venue.city;
        var displayLocation = venue.display_location;
    
        var performers = events[i].performers[0];   // performers
        var performerName = performers.name;
        var image = performers.image;

        console.log("City: "+city);
    
        var eventDetails = $('<div class="event-details">');
        // var eventImage = $('<div class="event-image">').html($('<a href="#" onclick="displayDetails("'+city+'")"><img src="'+image+'" alt="'+title+'"></a>'));
        var eventImage = $('<div>');
        var imgA = $('<a>');
        imgA.attr("href", "#");
        imgA.attr("onclick","displayDetails('"+events[i]+"')"); // sending events[i] to displayDetails
        var img = $('<img>');
        img.attr("src",image);
        imgA.append(img);
        eventImage.append(imgA);

        

        var eventInformation = $('<div class="event-information">');
        var eventTitle = $('<h4>');
        var titleA = $('<a>');
        titleA.attr("href", "#");
        titleA.attr("onclick","displayDetails('"+events[i]+"')"); // sending events[i] to displayDetails
        titleA.text(title);
        eventTitle.append(titleA);



        var eventDate = $('<p>').text(dayjs(date).format('MMM D, YYYY')+' / Place: '+placeName+' / '+address+', '+displayLocation);
        var eventPerfomer = $('<p>').text('Event Type: '+type+" / Performer: "+performerName);
        var eventUrl = $('<p>').html($('<a href="'+url+'" target="_blank"> SeatgeekLink </a>'));
       
        eventInformation.append(eventTitle, eventDate, eventPerfomer, eventUrl);
        eventDetails.append(eventImage, eventInformation);

        searchResultEl.append(eventDetails);        
    }
}

function displayDetails(event){
    // alert("Call me");

    searchResultEl.empty();

    // var type = events.type;
    console.log("Event: "+event);


    searchResultEl.append($('<p> Hello </p>'));
}

searchFormEl.on('submit', searchHandle);
connectUrl(eventUrl+"&geoip=true");
