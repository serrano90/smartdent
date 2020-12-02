const FlowApi = require("flowcl-node-api-client").default;
const config = require("../config")

const flowClient = new FlowApi(config.flowCL)

module.exports = flowClient
