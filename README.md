# HANA Sandbox Backend
Uses `@sap/hana-client` to run HANA Statements to HANA backend.  Returns JSON meant for a Vue frontend like https://github.com/entmike/hana-sql-sandbox-frontend.

## Installation
```(bash)
git clone https://github.com/entmike/hana-sql-sandbox-backend.git
cd hana-sql-sandbox-backend
npm install
```

## Usage (Dev Mode, Windows)
```(bash)
set HANA_USER=SYSTEM
set HANA_PW=HXEHana1
set HANA_SERVER=hxehost
set HANA_PORT=39017
npm run dev
```

### Results
```
> backend@1.0.0 dev C:\code\backend
> nodemon server.js

[nodemon] 1.18.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
Testing HANA Connection to hxehost:39017...
Connection test successful.  Disconnecting for now.
Server started on port 9999
```

## Next Steps
Setup [hana-sql-sandbox-frontend](https://github.com/entmike/hana-sql-sandbox-frontend)