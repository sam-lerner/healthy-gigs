mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhbmtldDIwMDAiLCJhIjoiY2xia2l5cmp0MDBxZTN2bDhzeWhtaDJ2ZSJ9.asUNuniNnHFj4dotCMH40g';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });



    function displayDetails(events){
        $('.modal-content').empty();
    
        var type = events.type;
        console.log("Type: "+type);
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
        imgContainer.append($('<div id ="map">')); // add
        
    
    
        var eventInformation = $('<div class="detail-information">');
        var eventTitle = $('<h3>').text(title);
        var eventDate = $('<h5>').text(dayjs(date).format('MMM D, YYYY'));
        var place = $('<h5>').text(placeName);
        var address = $('<h5>').text(displayLocation);
        var eventType = $('<p>').text('Event Type: '+type);
        var nameOfPerformer = $('<p>').text('Performer: '+performerName);
        var performerSlug = $('<p>').text('Slug: '+slug);
        var eventScore = $('<p>').text("Score: "+score);
        var ticket = $('<p>').html($('<a href="'+ticket+'" target="_blank"> Ticket </a>'));
        var eventUrl = $('<p>').html($('<a href="'+url+'" target="_blank"> SeatgeekLink </a>'));
        // var closeBtn = $('<button id="closeBtn">').text('Close');
       
        eventInformation.append(eventTitle, eventDate, place, address, eventType, nameOfPerformer, performerSlug, eventScore, ticket, eventUrl);
        eventDetails.append(imgContainer, eventInformation);
    
        // searchResultEl.append(eventDetails);    
        $('.modal-content').append(eventDetails);
    
        // geoPostCode(postalCode,state);
        geoPostCode('08852','New Jersey');
        
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhbmtldDIwMDAiLCJhIjoiY2xia2oydWFnMDByOTQwcG1iMHBkbnh5eiJ9.Yu_vJDHEbQJ1Yhmz91_E7g';
        const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-98.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    

        //add
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhbmtldDIwMDAiLCJhIjoiY2xia2oydWFnMDByOTQwcG1iMHBkbnh5eiJ9.Yu_vJDHEbQJ1Yhmz91_E7g';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-98.5, 40], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
    }