/* Simple Express.js Server */
const express = require("express")
const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

const port = 3000
app.get("/", (req, res) => res.send("Hello World!"))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))