var intials = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
var state = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virgina', 'Wisconsin', 'Wyoming']

console.log("Begin");

var modal = document.getElementById("myModal");
var searchFormEl = $('#search-form'); // Input Form
var eventNameEl = $('#event-name'); // Event Name
var locationEl = $('#location-input'); //City Name
var startDateEl = $('#start-date'); // Start Date
var endDateEl = $('#end-date'); // End Date
// var eventTypeEl = $('#event-type');
var eventTypeEl = document.getElementById('event-type');

var concertEl = $('#concerts'); // Event type: concert
var familyEl = $('#familys'); //Event type: family-event
var theaterEl = $('#theater');   // Event type: theater
var searchBtn = $('#btn-search');
var searchResultEl = $('#search-results');
var rengeEl;

var paginationURL;


// https://platform.seatgeek.com/  Event API document
// Query String:  https://api.seatgeek.com/2/events?client_id=MYCLIENTID
// Our Example: https://api.seatgeek.com/2/events?client_id=OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ

var apiKeyEvent = 'OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ';
var eventUrl = 'https://api.seatgeek.com/2/events?client_id=' + apiKeyEvent;
paginationURL = eventUrl;

// https://api.seatgeek.com/2/venues?client_id=OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ


// event.type: music_festival, concert, golf, family, theater, broadway_tickets_national, ncaa_basketball, ncaa_womens_basketball, wrestling, comedy, cirque_du_soleil, dance_performance_tour, minor_league_hockey, nhl......

// $event.type=music_festival+concert

console.log("Day: " + dayjs('2022-12-07T08:30:00'));

// Event Handle: when click the search button
function searchHandle(event) {

    // console.log("function call");
    // console.log("URL: "+ eventUrl);

    event.preventDefault();

    //  'https://api.seatgeek.com/2/events?venue.state=NY'

    var eventName = eventNameEl.val().trim(); // search by any name match
    var zipcode = locationEl.val().trim() // search zipcode
    var startDate = startDateEl.val();  // Starting Date
    var endDate = endDateEl.val();  // Ending Date
    var concert = concertEl.val();
    var family = familyEl.val();
    var theater = theaterEl.val();


    var apiUrl = eventUrl;

    if (eventName !== '') {   // search by event name
        apiUrl += '&q=' + eventName;
    }


    if (zipcode !== '') { // search by zipcode
        apiUrl += '&postal_code=' + zipcode;
    }

    var range = 30;

    if (rengeEl) {    // search by range, default is 30mi
        range = rengeEl;
    }

    apiUrl += '&range=' + range + 'mi';


    if (startDate !== '') {   // search by start date

        apiUrl += '&datetime_utc.gte=' + startDate;
    }

    if (endDate !== '') {     // search by end date
        apiUrl += '&datetime_utc.lte=' + endDate;
    }

    var types = '';


    $('select option:selected').each(function (i, selectedElement) {
        types += '&type=' + $(selectedElement).val();
    });


    apiUrl += types;    // search by type
    // apiUrl += "&page=2";


    // if(desc){
    //     apiUrl += '&sort=datetime_utc.desc';     // Sorting to Desc
    // }

    console.log("dateURL: " + apiUrl);
    paginationURL = apiUrl;

    connectUrl(apiUrl); // sending API url
}

// Recevie apiUrl and call displayEvent();
function connectUrl(url) {

    console.log("Connect URL: " + url);
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
function noData() {
    searchResultEl.empty();
    var noDataContainer = $('<div class="no-data">');
    var noData = $('<h4>').html("We're sorry! <br />No events matched your selection. <br />Try broadening your selections");
    noDataContainer.append(noData);
    searchResultEl.append(noDataContainer);
}

// Connection Error
function errorMessage() {
    searchResultEl.empty();

}

function pagination(page, per_page, total) {

    var totalPagination = parseInt(total / per_page) + 1;
    var numberOfPagination = 10;

    console.log("pagination number: " + totalPagination);

    var remainer = page % numberOfPagination;

    console.log("remainer: " + remainer);

    var beginNumber = page - (page % numberOfPagination) + 1;

    console.log("beginNumber: " + beginNumber);

    var lastNumber = page - (page % numberOfPagination) + numberOfPagination;


    if (lastNumber > totalPagination) {
        lastNumber = totalPagination;
    }

    console.log("lastNumber: " + lastNumber);

    var pagenation = $('.pagination');
    pagenation.empty();
    
    console.log("paginationURL before: "+paginationURL);

    if (beginNumber !== 1) {
           
        var pre = $('<a>');
        pre.attr("href", "#");
        pre.html("&laquo;");
        pre.click(function () {
            paginationURL = paginationURL.replace(/(&page=)[^\&]+/, '$1' + (beginNumber - numberOfPagination));
            console.log("paginationURL later: "+paginationURL);
            connectUrl(paginationURL);
            return ;
        });

        pagenation.append(pre);
    }

    for (var i = 0; i < (lastNumber - beginNumber + 1); i++) {
        if (remainer === (i+1)) {
            var present = $('<a>');
            present.addClass('active');
            present.text(beginNumber+i);
            pagenation.append(present);
        } else {
            
            if(paginationURL.includes('&page=')){
                paginationURL = paginationURL.replace(/(&page=)[^\&]+/, '$1' + (beginNumber + i));
            } else {
                paginationURL += '&page=' + (beginNumber + i);
            }
            var present = $('<a>');
            present.attr("href", "#");
            present.attr("onclick", "connectUrl('"+paginationURL+"'); return false;");
            present.attr("id",i);

            if(i === (lastNumber - beginNumber)){
                present.html("&raquo;");
            } else {
                present.text(beginNumber+i);
            }               
       
            pagenation.append(present);
        }
    }
}


// display event list on the screen;
function displayEvent(data) {
    console.log(data);
    searchResultEl.empty();
    var events = data.events;
    var meta = data.meta;
    var total = meta.total;
    var page = meta.page;
    var per_page = meta.per_page;

    console.log("Total item: " + total);
    console.log("Page: " + page);
    console.log("Per_page: " + per_page);

    pagination(page, per_page, total);


    if (events.length === 0) {
        noData();
        console.log("No Data");
    }

    for (let i = 0; i < events.length; i++) {
        var type = events[i].type;
        // console.log("Event["+i+"] = " +events[i]);
        // console.log("Type: "+type);
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

        // console.log("City: "+city);

        var eventDetails = $('<div class="event-details">');
        var eventImage = $('<div>');
        var imgA = $('<a>');
        imgA.attr("href", "#");
        imgA.click(function () {     // sending events[i] to displayDetails
            displayDetails(events[i]);
            modal.style.display = "block";
        });

        var img = $('<img id=' + i + '>');
        img.attr("src", image);
        imgA.append(img);
        eventImage.append(imgA);

        var eventInformation = $('<div class="event-information">');
        var eventTitle = $('<h4>');
        var titleA = $('<a>');
        titleA.attr("href", "#");
        titleA.click(function () {
            displayDetails(events[i]);  // sending events[i] to displayDetails
            modal.style.display = "block";
        });

        titleA.text(title);
        eventTitle.append(titleA);



        var eventDate = $('<p>').text(dayjs(date).format('MMM D, YYYY') + ' / Place: ' + placeName + ' / ' + address + ', ' + displayLocation);
        var eventPerfomer = $('<p>').text('Event Type: ' + type + " / Performer: " + performerName);
        var eventUrl = $('<p>').html($('<a href="' + url + '" target="_blank"> SeatgeekLink </a>'));

        eventInformation.append(eventTitle, eventDate, eventPerfomer, eventUrl);
        eventDetails.append(eventImage, eventInformation);

        searchResultEl.append(eventDetails);
    }
}

function displayDetails(events) {
    $('.modal-content').empty();

    var type = events.type;
    console.log("Type: " + type);
    var title = events.title;
    var url = events.url;
    var score = events.score;
    var date = events.datetime_utc;
    var dateLocal = events.datetime_local;

    var venue = events.venue;    // venue
    // var state = venue.state;
    var state = intialConvert(venue.state);
    var postalCode = venue.postal_code;
    var placeName = venue.name;
    var lat = venue.location.lat;
    var lon = venue.location.lon;
    var address = venue.address;
    var city = venue.city;
    var displayLocation = venue.display_location;

    var performers = events.performers[0];   // performers
    var performerName = performers.name;
    var image = performers.image;
    var ticket = performers.url;
    var slug = performers.slug;



    var eventDetails = $('<div class="row detail-container">');
    var imgContainer = $('<div class="image-container">');
    var eventImg = $('<img height="400" width="400">');
    eventImg.attr('src', image);
    imgContainer.append(eventImg);

    var eventInformation = $('<div class="detail-information">');
    var eventTitle = $('<h3>').text(title);

    var eventDetailBox = $('<div class="detail-box">');
    var eventDate = $('<h5>').text(dayjs(dateLocal).format('MMM D, YYYY [-] hh:mm a'));
    var place = $('<h5>').text(placeName);
    var address = $('<h5>').text(displayLocation);
    var eventType = $('<p>').text('Event Type: ' + type);
    var nameOfPerformer = $('<p>').text('Performer: ' + performerName);
    var performerSlug = $('<p>').text('Slug: ' + slug);
    var eventScore = $('<p>').text("Score: " + score);
    var ticket = $('<p>').html($('<a href="' + ticket + '" target="_blank"> Ticket </a>'));
    var eventUrl = $('<p>').html($('<a href="' + url + '" target="_blank"> SeatgeekLink </a>'));
    // var closeBtn = $('<button id="closeBtn">').text('Close');

    eventDetailBox.append(eventDate, place, address, eventType, nameOfPerformer, performerSlug, eventScore, ticket, eventUrl);
    eventInformation.append(eventTitle, eventDetailBox);

    eventDetails.append(imgContainer, eventInformation);

    // searchResultEl.append(eventDetails);    
    $('.modal-content').append(eventDetails);

    // geoPostCode(postalCode,state);
    geoPostCode('08852', 'New Jersey');
}


// insert in Display event func ; store as stateProper pass to cdcCovidData
function intialConvert(venueLocale) {
    for (let i = 0; i < intials.length; i++) {
        if (intials[i] == venueLocale) {
            return state[i];
        }
    }
}


// "https://cors-anywhere.herokuapp.com/

// insert in Display event func ; store as county pass to cdcCovidData
function geoPostCode(zip, state) {

    console.log("function geoPostCode");
    console.log("zip:" + zip);
    console.log("state:" + state);
    cdcCovidData(state, "Middlesex");

    // $.ajax({
    //   url: " https://service.zipapi.us/zipcode/county/"+ zip +"/?X-API-KEY=js-9bba29279d7363655cc244b9ad8465ee",
    //   method: "GET",
    // }).then(function (response) {
    //   console.log("Zip --> County Ajax Reponse \n-------------");
    //   console.log(response);
    //   var county = response.data.county;
    //   cdcCovidData(state,county);

    // })
}

// returns object of covid data; insert in deisply event func apend info to event card
function cdcCovidData(state, county) {

    var apiUrl = "https://data.cdc.gov/resource/3nnm-4jni.json?$order=date_updated%20DESC&$limit=1&state=" + state + "&county=" + county + "%20County";

    $.ajax({
        url: apiUrl,
        method: "GET",
    }).then(function (response) {

        console.log("Covid Data Ajax Reponse \n-------------");
        console.log(response);
        var covidData = {
            county: response[0].county,
            level: response[0].covid_19_community_level,
            covidCase: response[0].covid_cases_per_100k,
            pop: response[0].county_population,
            updateDay: response[0].date_updated
        }
        console.log("CDC API URL: " + apiUrl);

        covidAppend(covidData);

    });
}

//   write code here to style/present covid data then append to existing events
function covidAppend(data) {
    var county = data.county;
    var level = data.level;
    var covidCase = data.covidCase;
    var pop = data.pop;
    var updateDay = data.updateDay;

    // console.log("level: "+level);

    var covidDisplay = $('<div class="covid-detail">');
    var countyEl = $('<h5>').text(county);
    var levelEl = $('<p>').text("Covid Level: " + level);
    var covidCaseEl = $('<p>').text("Cases Per 100K: " + covidCase);
    var popEl = $('<p>').text("County Populataion: " + pop);
    var updateDayEl = $('<p>').text("Last Updated: " + updateDay);


    covidDisplay.append(countyEl, levelEl, covidCaseEl, popEl, updateDayEl);
    $('.detail-information').append(covidDisplay);
}



searchFormEl.on('submit', searchHandle);
connectUrl(eventUrl + "&geoip=true");

$('#closeBtn').on('click', function () {
    modal.style.display = "none";
    console.log("close");
});




// Pagination Js





//////////////////////////// Pagination End
