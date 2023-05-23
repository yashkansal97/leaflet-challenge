# Leaflet Challenge

In this assignment, we focused on using leaflet to plot USGS data. Specifically, we used the geojson provided by the USGS for earthquakes in the last month.

We had three files for this assignment:
1. index.html - This contains our main html file, which when called, gives us a leaflet map of the earthquakes in the last month.
2. style.css - This contains are styling for the different elements, mainly the legend.
3. logic.js - This contains our main javascript code which does the following:
    - Creates a map
    - Defines a function to be used for the color of the circle markers
    - Calls the USGS url to get data and add a circle marker for each earthquake, where the radius is the magnitude of the earthquake and color indicates the depth
    - Adds a legend at the bottom right to use color to read depth of the earthquake

Usage: Open the path for index.html in a browser.