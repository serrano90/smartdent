/**
 * Validation Form
 */
import * as yup from "yup"

export const validateNewPassword = () => {
	return yup.object().shape({
		oldPassword: yup
			.string()
			.required("Entre la contraseña actual"),
		newPassword: yup
			.string()
			.required("La nueva contraseña es requerida")
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
				"Debe contener 8 caracteres, un mayúscula, una minúscula y un numero"
			),
		confirmPassword: yup
			.string()
			.required("Entre la confirmación contraseña")
			.oneOf([yup.ref("newPassword"), null], "No coinciden la contraseña")
	})
}