import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema'
import os from 'os';
// console.log('process.env:', process.env);
require("appdynamics").profile({
    controllerHostName: process.env.APPD_HOSTNAME,
    controllerPort: process.env.APPD_PORT,
    controllerSslEnabled: process.env.APPD_SSL_ENABLED,
    accountName: process.env.APPD_ACCOUNT_NAME,
    accountAccessKey: process.env.APPD_ACCOUNT_KEY,
    applicationName: process.env.APPD_APP_NAME,
    tierName: process.env.APPD_TIER_NAME,
    nodeName: os.hostname(),
    proxyHost: process.env.APPD_PROXYHOST,
    proxyPort: process.env.APPD_PROXYPORT,
    enableGraphQL: true
});

//https://github.com/ardatan/graphql-mesh/discussions/6761
// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
const app = express();
app.all('/graphql', createHandler({ schema }));

app.listen({ port: 5000 });
console.log('Listening to port 5000');