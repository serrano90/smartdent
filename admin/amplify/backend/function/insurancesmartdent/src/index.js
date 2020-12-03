/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_SMARTDENTCARDINTENT_ARN
	STORAGE_SMARTDENTCARDINTENT_NAME
	STORAGE_SMARTDENTCUSTOMER_ARN
	STORAGE_SMARTDENTCUSTOMER_NAME
Amplify Params - DO NOT EDIT */const awsServerlessExpress = require('aws-serverless-express');
const httpServer = require('./interfaces/http/server');

const { app } = httpServer()

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;