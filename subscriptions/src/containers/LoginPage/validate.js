/**
 * Validation Form
 */
import * as yup from "yup"

export const validateSignIn = () => {
	return yup.object().shape({
		username: yup.string().required(),
		password: yup.string().required()
	})
}
