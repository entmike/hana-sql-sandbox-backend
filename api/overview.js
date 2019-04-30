const express = require('express'),
router = express.Router();
const cors = require('cors');
const hana = require('@sap/hana-client');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.options('*',cors());

router.post('/',cors(),(req,res)=>{
    let conn = hana.createConnection();
    var conn_params = {
        serverNode  : process.env.HANA_SERVER + ':' + process.env.HANA_PORT,
        uid         : process.env.HANA_USER,
        pwd         : process.env.HANA_PW
    };
    conn.connect(conn_params, function(err) {
        if (err) {
            conn.disconnect();
            console.log(`Error connectiong: ${JSON.stringify(err)}`);
            res.end(err.msg);
        }else{
            conn.exec("SELECT NAME AS KEY, VALUE AS VAL FROM M_SYSTEM_OVERVIEW;", null, function (err, results) {
                conn.disconnect();
                if (err) {
                    res.status(500);
                    res.json(err);
                    console.log(err);
                    res.end();
                }else{
                    res.json({
                        backend_information : {
                            server : process.env.HANA_SERVER,
                            port : process.env.HANA_PORT,
                            user : process.env.HANA_USER
                        },
                        M_SYSTEM_OVERVIEW : results
                    });
                    res.end();
                }
            });
        }
    });
});

module.exports = router;