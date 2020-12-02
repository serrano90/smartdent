/**
 * SES client resources
 */
const AWS = require("aws-sdk")

module.exports = function ({config}) {
	if (config.app.env === "local") {
		AWS.config.update(config.awsRemote)
	} else {
		AWS.config.update({
			region: config.aws.region
		})
	}

	var ses = new AWS.SES({apiVersion: "2010-12-01"})
	return ses
}
