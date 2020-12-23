/**
 * HTTPClient
 *
 * Define a internal implementation of http client
 */
import AxiosService from "./axios"

export default class HTTPClient {
	/**
	 * Construct a new instance of HTTPClient
	 * @param {object} instance
	 */
	constructor(service = null) {
		if (!HTTPClient.instance) {
			if (service !== null) {
				this.service = service
			} else {
				const axiosService = new AxiosService()
				this.service = axiosService
			}
			HTTPClient.instance = this
		}
		return HTTPClient.instance
	}

	/**
	 * Get used for call to resources with verb get
	 *
	 * @param {*} path
	 * @param {*} options
	 */
	get(path, {params, headers} = {}) {
		return this.service
			.get(path, params, headers)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error))
	}

	/**
	 * Post used for call to resources with verb post
	 *
	 * @param {*} path
	 * @param {*} params
	 * @param {*} optionals
	 */
	post(path, params, {headers} = {}) {
		return this.service
			.post(path, params, headers)
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error))
	}

	/**
	 * Delete used for call to resources with verb delete
	 * 
	 * @param {*} path
	 * @param {*} params
	 * @param {*} optionals
	 */
	delete(path, params, {headers} = {}) {
		return this.service
			.delete(path, {params, headers})
			.then((response) => Promise.resolve(response))
			.catch((error) => Promise.reject(error))
	}
}
