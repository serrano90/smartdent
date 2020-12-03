/**
 * PlansService
 */
import HTTPClient from "packages/http/http"
import resources from "./resources"

export default class PlanService {
    /**
     * Plans Service
     */
    constructor() {
        if (!PlanService.instance) {
			this.client = new HTTPClient()
			PlanService.instance = this
		}
		return PlanService.instance
    }

    /**
	 * Get plans 
	 */
	getPlans = () => {
		return this.client.get(resources.PLAN.GET_PLAN.PATH)
	}
}
