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

