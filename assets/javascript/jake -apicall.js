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
  // console.log('https://data.cdc.gov/resource/3nnm-4jni.json?$order=date_updated%20DESC&$limit=1&state='+ state +'&county='+ county +'%20County');
  $.ajax({
    url:"https://data.cdc.gov/resource/3nnm-4jni.json?$order=date_updated%20DESC&$limit=1&state="+ state +"&county="+ county +"%20County",
    method: "GET",
  }).then(function (response) {
    console.log("Ajax Reponse \n-------------");
    console.log(response);
    level = response.covid_19_community_level;
    covidCase = response.covid_cases_per_100k;
    pop = response.county_population;
    updateDay = response.date_updated;
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

