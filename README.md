# Kindle bike computer

A compuer for bicycle for Android phones. It makes route data available on a local letwork, so that you can access it through a webpge.

The idea comes from the need of using a Kindle as display: e-inks are energy efficient and are great for outdoor sunny locations and some are even waterproof. Serving everything through a localserver and a browser, no particular setting is needed for the device used as monitor.

Beside Kindles, it works anything with a browser and a wifi connection (and a display).

The project is inspired by this [bike computer build with a Raspberry Pi and a Kindle](https://the-digital-reader.com/2015/08/22/kindle-bike-raspi-equals-bike-comupter/).<br/>Raspberry needs GPS antenna and switches to detect wheel rotation and pedal cadence, but this app only uses the integrated smartphone GPS sensor.
It is then possible to move the computer from bike to (motor)bike.

From prelimiary tests, the battery duration is very satisfatory.

### Installation

Installation is not very straightforward, any help to make it easier is much welcomed.

To run the app you need an Android smartphone with
- [Termux](https://f-droid.org/en/packages/com.termux)
- [Termux:AP](https://f-droid.org/en/packages/com.termux.api/)
- git
- nodejs

Install Termux and TermuxAPI from the F-Droid store. Then open Termux and run:
````
pkg upgrade && pkg install termux-api && pkg install git && pkg install node
````
Notice that to use Termux:API you also need to install the [termux-api](https://github.com/termux/termux-api-package) package.


Before moving on, make shure `termux-location` is working fine and that appropriate permissions are granted by running the following command. It will take a bunch of seconds before returning current GPS position data:
````
location-termux
````
````
{
    latitude: 47.0,
    longitude: 19.0,
    altitude: 100,
    accuracy: 19.0,
    vertical_accuracy: 0.0,
    bearing: 0.0,
    speed: 1.5650451183319092,
    elapsedMs: 15,
    provider: "gps",
}
````

Clone the repo:
````
git clone https://github.com/iosonosempreio/bike-computer.git
````

Get the repo ready:
````
npm run update
````
Run the app
````
npm start
````
