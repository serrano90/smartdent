/**
 * DynamoDB client resources
 */
const AWS = require("aws-sdk")

module.exports = function ({config}) {
	if (config.app.env === "local") {
		AWS.config.update(config.awsRemote)
	} else {
		AWS.config.update({
			region: config.database.region
		})
	}

	var db = new AWS.DynamoDB.DocumentClient()
	return db
}
