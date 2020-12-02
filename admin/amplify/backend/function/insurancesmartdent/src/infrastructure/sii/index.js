/**
 * DynamoDB client resources
 */
const axios = require("axios")
const {
	InternalServerErrorException
} = require("../error")

class SIIClientService {
	constructor({config}) {
		const client = axios.create({
			baseURL: config.sii.baseURL,
			timeout: 30000,
			headers: {"Content-Type": "application/json"}
        })
        this.client = client
    }
    
    async validateRut(rut, name) {
        try {
            const resp = await this.client.get("/consulta", {
                params: {
                    rut: rut,
                }
            })
            const data = resp.data
            console.log(data)
            if (data.error && data.error === "Rut invalido") {
                return false
            } else {
                if (data.razon_social.toLowerCase() !== name.toLowerCase()) {
                    return false
                }
            }
            return true
        }catch(error) {
            console.log(error)
            throw new InternalServerErrorException(error.message)
        }
    }
}

module.exports = SIIClientService
