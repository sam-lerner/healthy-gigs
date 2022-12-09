
// "https://cors-anywhere.herokuapp.com/
// Grabs county name from the geocode of zip code from API grabs zip from within display event func
function geoPostCode(zip) {
var county;
  console.log('Begin geoPostCode');
  $.ajax({
    url: "https://service.zipapi.us/zipcode/county/"+ zip +"/?X-API-KEY=js-9bba29279d7363655cc244b9ad8465ee",
    method: "GET",
  }).then(function (response) {
    console.log("Zip --> County Ajax Reponse \n-------------");
    console.log(response);
    console.log(response.data.county);
    // localStorage.setItem('county',response.data.county[0]);

    county = response.data.county[0];
    
    console.log('zip func log county');
    console.log(county);
  });
  return county;
}


// call cdc API for covid data through input of state and county
function cdcCovidData(/*state, county*/) {
  $.ajax({
    // url:"https://data.cdc.gov/resource/3nnm-4jni.json?$order=date_updated%20DESC&$limit=1&state="+ state +"&county="+ county +"%20County",
    url:"https://data.cdc.gov/resource/3nnm-4jni.json?$order=date_updated%20DESC&$limit=1&state=New Jersey&county=Ocean%20County",
    method: "GET",
  }).then(function (response) {
    console.log("Covid Data Ajax Reponse \n-------------");
    console.log(response[0]);

    return response[0].state;
    /* Cant store/pass
    var covidData = {
      level: response[0].covid_19_community_level,
      covidCase: response[0].covid_cases_per_100k,
      pop: response[0].county_population,
      updateDay: response[0].date_updated,} */
      
  });
}

// var postalCode = localStorage.getItem('postalCode');
// console.log(postalCode)
// var state, level, covidCase, pop, updateDay;
// state = 'place'
// county = 'place';


// testing code

function tester() {
var postal = geoPostCode('08817');
console.log(postal);
}
// var objectExample = {name:'Larry',family}
  console.log(cdcCovidData());
  var objectTest = cdcCovidData();
  console.log(objectTest);