const dotenv = require("dotenv");
var fs = require("fs");
var http = require("http");
var https = require("https");
var privateKey = fs.readFileSync("key.pem", "utf8");
var certificate = fs.readFileSync("crt.pem", "utf8");
var chain = fs.readFileSync("chain.pem", "utf8");

var credentials = { key: privateKey, cert: certificate, ca: chain };
const express = require("express");
const app = express();

var cors = require("cors");

dotenv.config();

const isTest = process.env.ENVIRONMENT;
const port = process.env.PORT || 3500;

var whitelist = ["https://yourfrontend.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
    callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'))
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

let project = require("./routes/project");

app.use("/project", project);


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

if (isTest) {
  httpServer.listen(port, () => {
    console.log("Running HTTP on ", port);
  });
} else {
  httpsServer.listen(port, () => {
    console.log("Running HTTPS on ", port);
  });
}
