import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + './.env' });
import type { YamlConfig } from '@graphql-mesh/types';
import os from 'os';
// console.log('process.env:', process.env);


const config = async (): Promise<YamlConfig.Config> => ({
    sources: [
        {
            name: "FakeActivitySwagger",
            handler: {
              openapi: {
                source: "https://fakerestapi.azurewebsites.net/swagger/v1/swagger.json",
                endpoint: "https://fakerestapi.azurewebsites.net",
              },
            },
          }
    ]
});

export default (async function () {
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
    return await config()
})()