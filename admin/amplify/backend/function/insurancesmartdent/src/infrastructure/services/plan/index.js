/**
 *  function for service plans manager
 */
const {toEntity} = require("./transform")

class PlansHTTPService {
	constructor({flowCL}) {
		this.flowClient = flowCL
	}

	/**
	 * Get All Plans
	 */
	async getAll() {
		try {
			let arr = new Array()
			const resp = await this.flowClient.send("plans/list", {status: 1}, "GET")

			if (resp.total > 0) {
				resp.data.map((item) => {
					arr.push(toEntity(item))
				})
			}

			return arr
		} catch (error) {
			console.log(error)
			throw Error(error.message)
		}
	}
}

module.exports = PlansHTTPService
