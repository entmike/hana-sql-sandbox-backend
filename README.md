[![CircleCI](https://circleci.com/gh/entmike/hana-sql-sandbox-backend.svg?style=shield)](https://circleci.com/gh/entmike/hana-sql-sandbox-backend) [![npm version](https://badge.fury.io/js/hana-sql-sandbox-backend.svg)](https://badge.fury.io/js/hana-sql-sandbox-backend)

# HANA Sandbox Backend
Uses `@sap/hana-client` to run HANA Statements to HANA backend.  Returns JSON meant for a Vue frontend like https://github.com/entmike/hana-sql-sandbox-frontend.

## Docker Installation
Easy-mode here:

https://hub.docker.com/r/entmike/hana-sql-sandbox 

## Installation
```bash
npm i hana-sql-sandbox-backend
cd hana-sql-sandbox-backend
npm config set @sap:registry https://npm.sap.com
npm install
```

## Environment Config

### (Windows)
```bash
set HANA_USER=SYSTEM
set HANA_PW=HXEHana1
set HANA_SERVER=hxehost
set HANA_PORT=39017
```

### (Mac/Linux)
```bash
export HANA_USER=SYSTEM
export HANA_PW=HXEHana1
export HANA_SERVER=hxehost
export HANA_PORT=39017
```
## Run
3 different ways to run, depending if you are tinkering/developing/etc...
### Debug Mode
```bash
npm run debug
```
### Development Mode
```bash
npm run dev
```
### Production Mode
```bash
npm run prod
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
