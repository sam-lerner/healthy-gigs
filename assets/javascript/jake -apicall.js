
var county = 'Ocean'
var state = 'New Jersey'

function call() {
    console.log('https://data.cdc.gov/resource/3nnm-4jni.json?$order=date_updated%20DESC&$limit=1&state='+ state +'&county='+ county +'%20County');
$.ajax({
    url: 'https://data.cdc.gov/resource/3nnm-4jni.json?$order=date_updated%20DESC&$limit=1&state='+ state +'&county='+ county +'%20County',
    method: 'GET',
  }).then(function (response) {
    console.log('Ajax Reponse \n-------------');
    console.log(response);
  });
return;
}

call();