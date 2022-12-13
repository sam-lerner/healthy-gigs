# Healthy Gigs Website

## Description

Healthy Gigs is a website dedicated to finding safe events during the COVID-19 pandemic. The website allows the user to search for events based on type, location or date. When the event results display, the user is also presented with information on COVID levels in the area where the events are.

[Healthy Gigs](https://sam-lerner.github.io/healthy-gigs/ "Healthy Gigs Website")

## Mock-Up

The following animation shows the web application's appearance and functionality:

![website demo](./images/website-nav.gif)


## Installation

N/A

## Usage

### On Page Load
When loaded, the page immediately returns results based on the user's IP address. 

### Page interaction
The webpage has a collapsable search bar on the left side of the screen, which can be used to begin a specific search. Through this, the user is able to search for a specific event by name, choose an event type, specify an area by ZIP Code and redius and set both start and end dates for their searches. 

### Results interaction
After the search is undertaken, the user is presented with ten results per page. To see additional results, there is an option at the bottom of the results section to navigate to additional pages of results. Selected events are stored locally so that a user can easily view them again, allowing comparison between events as needed. 

### COVID Information
Clicking on the title of an event brings up a card displaying expanded event information, as well as a map of the event's location. To the right of this is information about the COVID conditons around the event site. This includes the CDC COVID level (high, medium or low), the number of cases per 100k people, the county population and the date when the information was last update. We hope this will help people make an informed decision about attending events and what level of caution to take when going out.

### Plans for future expansion
In the future, we hope to continue to improve the site's design and layout to make it more engaging for users on both computers and mobile devices. 

Additonally, we hope to continue to develop the interaction with the map API. We would like the user to be able to see all events in their search laid out on a single map and would allow for pulling up of event information directly from this map instead of having to filter through all the search results. The map could also have a color filter that would be responsive to input from the CDC COVID threat level. 

## Credits

This page was created as a project for the Rutgers Coding Bootcamp. It was coded by [Sam Lerner](https://github.com/sam-lerner), [Peter Lim](https://github.com/peterlim995), [Jake Nguyen](https://github.com/JakeTNguyen) and [Jackie Zheng](https://github.com/jackiezheng1998). We thank Professor Joe Han, TAs Paul Cwik, Justyn Subrai and Manoli Koutouzos for their guidance with this project. 

Event information is provided by [Seatgeek](https://platform.seatgeek.com/)

COVID information is provided by the [CDC](https://data.cdc.gov/)

Map information is provided by [mapbox](https://www.mapbox.com/)

ZIP Code information is provided by [ZIP API](https://service.zipapi.us)

## License

N/A