const { exec } = require("child_process");

/* Simple Express.js Server */
const express = require("express");
const termuxAPI = require("termux-api").default;

console.log("the script must run on termux on android");

const app = express();

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

app.get("/getGPSLocation", (req, res) => {
  console.log("Location requested CLI");

  exec("termux-location -r once", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    
    try {
		  const d = new Date();
      const location = JSON.parse(stdout);
      const { latitude, longitude, speed, accuracy, elapsedMs } = location;
      console.log(
        "Last known location: ", "lat", latitude, "lon", longitude, "speed", speed, "acc", accuracy, "ms", elapsedMs
      );
      res.send({ location: location, date: d.toLocaleString() });
    } catch (err) {
        console.log(err);
        return;
	  }
  });
});

app.get("/getBatteryStatus", (req, res) => {
  console.log("Battery requested CLI");

  exec("termux-battery-status", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    const d = new Date();
    const battery = JSON.parse(stdout);
    const { percentage } = battery;
    console.log("battery: ", percentage);

    res.send({ battery: battery, date: d.toLocaleString() });
  });
});

const geoLocation = termuxAPI
  .createCommand()
  .location()
  .fromGPSProvider()
  .requestUpdates()
  .build()
  .run();

app.get("/getGPSLocationOLD", (req, res) => {
  const d = new Date();
  // const response = `Geolocation! But now the time is ${d.toLocaleString()}`;

  const response = { date: d.toLocaleString() };

  try {
    console.log("Location requested");

    const thisLocation = geoLocation
      .getOutputObject()
      .then(function (location) {
        const { latitude, longitude, speed, accuracy, elapsedMs } = location;
        console.log(
          "Last known location: ",
          "lat",
          latitude,
          "lon",
          longitude,
          "speed",
          speed,
          "acc",
          accuracy,
          "ms",
          elapsedMs
        );
        const response = { location: location, date: d };
        res.send(response);
      });
  } catch (err) {
    console.log(err);
    res.send({ location: "CANNOT geolocate", date: d.toLocaleString() });
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
