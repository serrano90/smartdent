/**
 * Plan Service
 */

class PlanService {
    
    constructor({planHttpService}) {
        this.planHttpService = planHttpService
    }

    async all() {
		try {
            const plans = await this.planHttpService.getAll()
            return plans
		} catch (error) {
            throw Error("Internal Server Error")
        }
    }
}

module.exports = PlanService