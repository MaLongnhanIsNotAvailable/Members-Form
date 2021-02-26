const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Member');
const app = express();

// *HandleBars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// *Body Parser Middleware
app.use(express.json()); // Handle json
app.use(express.urlencoded({ extended: false })); // Handle urlencoded

app.get('/', (req, res) =>
    res.render("index", {
        title: 'Member App',
        members
    })
);
// ! Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));