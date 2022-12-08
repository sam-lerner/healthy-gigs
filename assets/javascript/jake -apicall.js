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

var apiKeyEvent = 'OTQ2MzM3NXwxNjcwMzg3MzgzLjM4MjcwMDQ';
var eventUrl = 'https://api.seatgeek.com/2/events?client_id='+apiKeyEvent;

function searchHandle(event){
    
  console.log("function call");
  console.log("URL: "+ eventUrl);

  event.preventDefault();


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
  
      var eventDetails = $('<div class="event-details">');
      var eventImage = $('<div class="event-image">').html($('<img>').attr('src',image));

      var eventInformation = $('<div class="event-information">');
      var eventTitle = $('<h4>').text(title);
      var eventDate = $('<p>').text(dayjs(date).format('MMM D, YYYY')+' / Place: '+placeName+' / '+address+', '+displayLocation);
      var eventPerfomer = $('<p>').text('Event Type: '+type+" / Performer: "+performerName);
      var eventUrl = $('<p>').html($('<a href="'+url+'" target="_blank"> SeatgeekLink </a>'));
     
      eventInformation.append(eventTitle, eventDate, eventPerfomer, eventUrl);
      eventDetails.append(eventImage, eventInformation);

      searchResultEl.append(eventDetails);        
  }
}


searchFormEl.on('submit', searchHandle);


































function geoPostCode(zip) {
console.log("https://service.zipapi.us/zipcode/county/"+ zip +"/?X-API-KEY=js-9bba29279d7363655cc244b9ad8465ee");
  $.ajax({
    url: "https://service.zipapi.us/zipcode/county/"+ zip +"/?X-API-KEY=js-9bba29279d7363655cc244b9ad8465ee",
    method: "GET",
  }).then(function (response) {
    console.log("Ajax Reponse \n-------------");
    console.log(response);
    county = response.data.county;

  });
  return;
}

function cdcCovidData(state, county) {
  var urlTest = "https://data.cdc.gov/resource/3nnm-4jni.json?$order=date_updated%20DESC&$limit=1&state="+ state +"&county="+ county +"%20County";
  $.ajax({
    url:urlTest,
    method: "GET",
  }).then(function (response) {
    console.log("Ajax Reponse \n-------------");
    console.log(response);
    level = response[0].covid_19_community_level;
    covidCase = response[0].covid_cases_per_100k;
    pop = response[0].county_population;
    updateDay = response[0].date_updated;
   console.log(level);
  });
 
  return;
}


var county, state, postalCode, level, covidCase, pop, updateDay;
postalCode = '08753';
state = "New Jersey";
county ="Ocean";
geoPostCode(postalCode);
console.log(county,state,postalCode);
cdcCovidData(state, county);
console.log(pop,covidCase,level);

