/**
 * NewPassword Page
 */

import React from "react"
import {Formik} from "formik"
import {Auth} from "aws-amplify"
import Alert from "components/Alert"
import routers from "utils/routers"
import {validateNewPassword} from "./validate"
import NewPassword from "./ChangePassword"

const ChangePasswordPage = () => {
	const [success, setSuccess] = React.useState(false)
	const [error, setError] = React.useState()

	async function handlerChangePasswordSubmit(values, {setSubmitting}) {
		try {
			setSuccess(false)
			setError("")
			const user = await Auth.currentAuthenticatedUser()
			await Auth.changePassword(user, values.oldPassword, values.newPassword)
			clearData(values)
			setSuccess(true)
		} catch (error) {
			console.log(error)
			if (error.code === "NotAuthorizedException") {
				setError("Contraseña actual incorrecta")
			} else {
				if (error.code === "LimitExceededException") {
					setError("Ha excedido el numero maximo de intentos, intente mas tarde")
				} else {
					setError("La contraseña no ha podido ser modificada")
				}
			}
		}
	}

	function clearData(values) {
		values.oldPassword = ""
		values.newPassword = ""
		values.confirmPassword = ""
	}

	return (
		<>
			<div className="row d-flex justify-content-center">
				<div className="col-12 col-xl-6">
					<div className="card card-body bg-white border-light shadow-sm mb-4">
						<h2 className="h5 mb-4">Cambiar Contraseña</h2>
						{ error && <Alert className="text-white" message={error} type="danger"/> }
						{ success && <Alert className="text-white" message="Contraseña actualizada satisfactoriamente" type="success"/> }
						<Formik
							initialValues={{
								oldPassword: "",
								newPassword: "",
								confirmPassword: ""
							}}
							onSubmit={handlerChangePasswordSubmit}
							validationSchema={validateNewPassword()}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting
							}) => (
								<NewPassword
									values={values}
									errors={errors}
									touched={touched}
									handleChange={handleChange}
									handleBlur={handleBlur}
									handleSubmit={handleSubmit}
									isSubmitting={isSubmitting}
								/>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</>
	)
}

export default ChangePasswordPage
