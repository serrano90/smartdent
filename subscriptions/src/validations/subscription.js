/**
 * Validation Form
 */
import * as yup from "yup"

export const validateSubscription = () => {
	return yup.object().shape({
		planId: yup
			.string()
			.required("Seleccione un plan valido")
	})
}
