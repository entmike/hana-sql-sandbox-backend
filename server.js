const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 9999;

let topTables = require('./api/list');

app.use('/api/top-tables', topTables);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});