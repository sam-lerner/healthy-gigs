mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhbmtldDIwMDAiLCJhIjoiY2xia2oydWFnMDByOTQwcG1iMHBkbnh5eiJ9.Yu_vJDHEbQJ1Yhmz91_E7g';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-98.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    