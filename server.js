/* Simple Express.js Server */
const express = require("express");
const app = express();
let canGeolocate = false;
try {
  const termuxAPI = require("termux-api").default;
  canGeolocate = true;
} catch (err) {
  console.log(err);
}

// define the port where client files will be provided
let port = process.env.PORT || 3000;

// provide static access to the files in the "public" folder
app.use(express.static("public"));

// provide access to boostrap libraries
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist/")
);

// start to listen to that port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/", (req, res) => res.send("index.html"));

let geoLocation;

if (canGeolocate) {
  geoLocation = termuxAPI
    .createCommand()
    .location()
    .fromGPSProvider()
    .requestOnce()
    .build()
    .run();
}

app.get("/getGPSLocation", (req, res) => {
  const d = new Date();
  // const response = `Geolocation! But now the time is ${d.toLocaleString()}`;

  if (canGeolocate) {
    const thisLocation = geoLocation
      .getOutputObject()
      .then(function (location) {
        console.log("Last known location: ", location);
        const response = { location, date: d.toLocaleString() };
        res.send(response);
      });
  } else {
    res.send({location: "cant geolocate", date: d.toLocaleString()});
  }

  const example_location = {
    latitude: 47.0,
    longitude: 19.0,
    altitude: 100,
    accuracy: 19.0,
    vertical_accuracy: 0.0,
    bearing: 0.0,
    speed: 1.5650451183319092,
    elapsedMs: 15,
    provider: "gps",
  };
});
