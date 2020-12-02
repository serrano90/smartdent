/**
 * Mail Service
 */
const fs = require("fs")
const {replacerHtmlToValues} = require("../utils/replace")

class MailService {
	constructor({config, mailProvider}) {
		this.mailProvider = mailProvider
		this.mailConfig = config.mail
	}

	sendToRegisterCard = async (to, data) => {
		const template = fs.readFileSync("./registerCardTemplate.html", {encoding: "utf-8"})
		const params = {
			Destination: {
				ToAddresses: [to]
			},
			Message: {
				Body: {
					Html: {
						Charset: "UTF-8",
						Data: replacerHtmlToValues(template, data)
					}
					/* replace Html attribute with the following if you want to send plain text emails. 
                    Text: {
                        Charset: "UTF-8",
                        Data: message
                    }
                 */
				},
				Subject: {
					Charset: "UTF-8",
					Data: this.mailConfig.subject
				}
			},
			ReturnPath: this.mailConfig.from,
			Source: this.mailConfig.from
		}

		try {
			this.mailProvider.sendEmail(params).promise()
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	}
}

module.exports = MailService
