/**
 * Validation Form
 */
import * as yup from "yup"

export const validateCustomer = () => {
	return yup.object().shape({
		rut: yup
			.string()
			.matches(
				/^[0-9]{7,9}[-|‐]{1}[0-9kK]{1}$/,
				"El RUT esta formado incorrectamente"
			),
		name: yup.string().required("El nombre es requerido"),
		lastName: yup.string().required("Los apellidos son requeridos"),
		email: yup
			.string()
			.email("El email no tiene un formato valido")
			.required("El email es requerido")
	})
}
