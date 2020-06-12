//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    // const result = browser(req.headers['user-agent']);
    // console.log('result => ', result);
    // if (result.name === "chrome" || result.name === "safari") {
    if (process.env.NODE_ENV === "production") {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header(`host`)}${req.url}`)
        } else {
            next();
        }
    } else {
        next();
    }
})

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/build'));
// app.use(favicon(__dirname + '/build/favicon.ico'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);
