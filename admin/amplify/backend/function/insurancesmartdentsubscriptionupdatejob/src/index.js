/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_SMARTDENTCUSTOMER_ARN
	STORAGE_SMARTDENTCUSTOMER_NAME
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk")
const FlowApi = require("flowcl-node-api-client").default
const dotenv = require("dotenv")
dotenv.config()
// Load config AWS
if (process.env.ENV === "local") {
	AWS.config.update({
		accessKeyI: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION
	})
} else {
	AWS.config.update({
		region: process.env.TABLE_REGION
	})
}

// Instance
const dbdynamoDBClient = new AWS.DynamoDB.DocumentClient()
const flowClient = new FlowApi({
	apiKey: process.env.FLOWCL_API_KEY,
	secretKey: process.env.FLOWCL_SECRET_KEY,
	apiURL: process.env.FLOWCL_API_URL
})
const tableName =
		"Customer" +
		(process.env.ENV && process.env.ENV !== "NONE"
			? "-" + (process.env.ENV === "local" ? "dev" : process.env.ENV)
			: "")
const today = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")

// Get All Customer With Subscriptions Availability
async function getAllCustomers() {
	var params = {
		TableName: tableName,
		FilterExpression: "subscription <> :null",
		ExpressionAttributeValues: {
			":null": null
		}
	}
	//":date": today,
	// AND ((subscription.subscriptionEnd != :null AND subscription.subscriptionEnd between <= :date) OR (subscription.nextInvoiceDate != :null AND subscription.nextInvoiceDate between <= :date))

	try {
		let result = await dbdynamoDBClient.scan(params).promise()
		if (result.Count === 0) {
			return null
		}
		return result.Items
	} catch (err) {
		console.log(err)
		return null
	}
}

// Update Customers Subscriptions
async function updateCustomersSubscriptions(id, subsctiptions) {
	const timestamp = new Date().toISOString()
	let params = {
		TableName: tableName,
		Key: {
			id: id
		},
		UpdateExpression:
			"set subscription = :subscription, updatedAt = :updatedAt",
		ExpressionAttributeValues: {
			":subscription": subsctiptions,
			":updatedAt": timestamp
		},
		ReturnValues: "UPDATED_NEW"
	}

	try {
        await dbdynamoDBClient.update(params).promise()
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

// Get Subscriptions By Subscriptions Id
async function getSubscriptionBySubscriptionId(subscriptionsId) {
	const body = {
		subscriptionId: subscriptionsId
	}
	try {
		const resp = await flowClient.send("subscription/get", body, "GET")
		return {
			id: resp.subscriptionId,
			planId: resp.planId,
			plan: resp.plan_name,
			status: resp.status,
			morose: resp.morose,
			subscriptionStart: resp.subscription_start,
			subscriptionEnd: resp.subscription_end,
			nextInvoiceDate: resp.next_invoice_date,
			createdAt: resp.created
		}
	} catch (error) {
		console.log(error)
		return null
	}
}

async function runJob() {
	const customers = await getAllCustomers()
	if (customers === null) {
        console.log(`No encontramos customer que actualizar`)
        return
    }

    console.log(`Evaluate ${customers.length} customer`)

	customers.forEach(async (item) => {
		const subscriptionsUpdate = await getSubscriptionBySubscriptionId(
			item.subscription.id
		)
		if (subscriptionsUpdate === null) {
			console.log(
				`No fue posible encontrar las subscripcion con id ${item.subscription.id} del customer con id ${item.id}`
			)
		}
		if (item.subscription !== subscriptionsUpdate) {
            const result = await updateCustomersSubscriptions(item.id, subscriptionsUpdate)
            if (!result) {
                console.log(`No fue posible actualizar la subscripcion del customer con id ${item.id}`)
            }
		}
	})
}

exports.handler = async (event) => {
	runJob()
	// TODO implement
	const response = {
		statusCode: 200,
		body: JSON.stringify("Running Complete")
	}
	return response
}

runJob()
