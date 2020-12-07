/**
 * AxiosService
 *
 * Define a internal implementation using axios
 */
import axios from "axios"
import {api} from "../../config"

export default class AxiosService {
	constructor() {
		if (!AxiosService.instance) {
			const instance = axios.create({
				baseURL: api.url,
				timeout: 3600,
				headers: {
					"Cache-Control": "no-cache",
					"Content-Type": "application/json",
					Accept: "application/json",
				}
			})
			instance.defaults.headers.post["Content-Type"] = "application/json"
			this.instance = instance
			AxiosService.instance = this
		}
		return AxiosService.instance
	}

	get(path, params, headers) {
		return this.instance.get(path, {params, headers})
	}

	post(path, params, headers) {
		return this.instance.post(path, params, {headers})
	}

	put(path, params, headers) {
		return this.instance.post(path, params, {headers})
	}

	delete(path, params, headers) {
		return this.instance.delete(path, {params, headers})
	}

	request(method, path, body, headers) {
		return this.instance[method](path, body, {headers})
	}

	requestWithFullUri(method, path, body, headers) {
		return axios({
			method: method,
			headers: headers,
			url: path,
			data: body
		})
	}
}
