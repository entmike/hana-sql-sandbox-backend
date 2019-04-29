const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hana = require('@sap/hana-client');

const port = process.env.PORT || 9999;

if(!process.env.HANA_SERVER || !process.env.HANA_PORT
    || !process.env.HANA_PW || !process.env.HANA_USER) {
    console.error(`Set the following environment variables:
    HANA_SERVER\tYour HANA Host
    HANA_PORT\tYour HANA Tenant DB port
    HANA_USER\tYour HANA User
    HANA_PW\tYour HANA Password`);
}else{
    console.log(`Testing HANA Connection to ${process.env.HANA_SERVER}:${process.env.HANA_PORT}...`)
    let conn_params = {
        serverNode  : process.env.HANA_SERVER + ':' + process.env.HANA_PORT,
        uid         : process.env.HANA_USER,
        pwd         : process.env.HANA_PW
    };
    const conn = hana.createConnection();
    conn.connect(conn_params, err=>{
        if(err){
            console.log('An error occured while trying to connect:\n\n');
            console.log(JSON.stringify(err));
        }else{
            console.log(`Connection test successful.`);
            conn.disconnect();
            let sqlRouter = require('./api/sql');
            let overviewRouter = require('./api/overview');
            app.use('/api/sql', sqlRouter);
            app.use('/api/overview', overviewRouter);
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended : true
            }));
            
            app.listen(port, ()=>{
                console.log(`Server started on port ${port}`)
            });
        }
    });
}