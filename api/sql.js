const express = require('express'),
router = express.Router();
const cors = require('cors');
const hana = require('@sap/hana-client');
const bodyParser = require('body-parser');

let conn = hana.createConnection();
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended:true}));

router.options('*',cors());

router.post('/',cors(),(req,res)=>{
    var conn_params = {
        serverNode  : process.env.HANA_SERVER + ':' + process.env.HANA_PORT,
        uid         : process.env.HANA_USER,
        pwd         : process.env.HANA_PW
    };

    conn.connect(conn_params, function(err) {
        if (err) {
            console.log(err);
            res.end(err.msg);
        }else{
            /**
             * Confirmed working:
             * 
             * conn.exec('ALTER SYSTEM ALTER CONFIGURATION (\'global.ini\', \'system\') SET (\'public_hostname_resolution\', \'use_default_route\') = \'name\' WITH RECONFIGURE;', null, function (err, results) {
                console.log(results);
            });
            */
            conn.exec(req.body.sql, null, function (err, results) {
                if (err) {
                    conn.disconnect();
                    res.status(500);
                    res.json(err);
                    console.log(err);
                }else{
                    conn.disconnect();
                    res.json(results);
                }
            });
        }
    });
});

router.get('/',cors(),(req,res)=>{
    if(!process.env.HANA_SERVER || !process.env.HANA_PORT) {
        res.status(500);
        res.end("Set your server and port in your environment, dummy.");
        return 1;
    }

    if(!process.env.HANA_PW || !process.env.HANA_USER) {
        res.status(500);
        res.end("Set your username and password in your environment, dummy.");
        return 1;
    }

    var conn_params = {
        serverNode  : process.env.HANA_SERVER + ':' + process.env.HANA_PORT,
        uid         : process.env.HANA_USER,
        pwd         : process.env.HANA_PW
    };

    conn.connect(conn_params, function(err) {
        if (err) {
            console.log(err);
            res.end(err.msg);
        }else{
            /**
             * Confirmed working:
             * 
             * conn.exec('ALTER SYSTEM ALTER CONFIGURATION (\'global.ini\', \'system\') SET (\'public_hostname_resolution\', \'use_default_route\') = \'name\' WITH RECONFIGURE;', null, function (err, results) {
                console.log(results);
            });
            */
            conn.exec('SELECT SCHEMA_NAME, TABLE_NAME, RECORD_COUNT FROM M_TABLES ORDER BY RECORD_COUNT DESC', null, function (err, results) {
                if (err) {
                    res.err(err);
                    console.log(err);
                }else{
                    conn.disconnect();
                    res.end(JSON.stringify(results, null, 2));
                }
            });
        }
    });
});

module.exports = router;