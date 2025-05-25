const request = require("request");

const geocode = (place, callback) => {
  const geocodeUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    place
  )}&access_token=pk.eyJ1Ijoic2FuZGhyYS1tIiwiYSI6ImNtYjI4YjV2ejE4ZWoyanF6OW1sOGhnY2MifQ.j8t-bR1p5WuMbBxnPEvWIQ&limit=1`;
  request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
      callback({ error: "Something went wrong", response: null });
    } else if (
      !response?.body?.features ||
      response?.body?.features?.length === 0
    )
      callback({ error: "Couldn't find", response: null });
    else {
      callback({
        error: null,
        response: {
          latitude: response.body.features?.[0].properties.coordinates.latitude,
          longitude:
            response.body.features?.[0].properties.coordinates.longitude,
          place: response.body.features?.[0].properties?.full_address,
        },
      });
    }
  });
};

module.exports = geocode;
