/**
 * Login Page
 */

import React from "react"
import {Formik} from "formik"
import { useNavigate } from 'react-router-dom';
import {Auth} from "aws-amplify"
import routers from "utils/routers"
import {validateSignIn} from "./validate"
import SignInForm from "./SignIn"

const LoginPage = () => {
	let navigate = useNavigate();
	const [error, setError] = React.useState()

	React.useEffect(() => {
		checkAuthentication()
	})

	async function checkAuthentication() {
		let session = await Auth.currentSession()
		if(session.isValid) {
			navigate(routers.ADMIN.path)
		}
	}

	async function handleSignInSubmit(values, {setSubmitting}) {
		try {
			setError("")
			let user = await Auth.signIn({
				username: values.username,
				password: values.password
			})
			// required new password
			if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
				await Auth.completeNewPassword(user, values.password)
			}
			navigate(routers.ADMIN.path)
		} catch (error) {
			console.log(error)
			setSubmitting(false)
			values.password = ""
			setError("Usuario o contraseña incorrecto")
		}
	}

	return (
		<>
			<section className="vh-lg-100 bg-soft d-flex align-items-center">
				<div className="container">
					<div className="row justify-content-center form-bg-image">
						<div className="col-12 d-flex align-items-center justify-content-center">
							<div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
								<div className="text-center text-md-center mb-4 mt-md-0">
									<h1 className="mb-0 h3">Administrador</h1>
								</div>
								{error ? (
									<div
										className="alert alert-danger text-white text-center"
										role="alert"
									>
										{error}
									</div>
								) : (
									""
								)}

								<Formik
									initialValues={{username: "", password: ""}}
									onSubmit={handleSignInSubmit}
									validationSchema={validateSignIn()}
								>
									{({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										handleSubmit,
										isSubmitting
										/* and other goodies */
									}) => (
										<SignInForm
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
				</div>
			</section>
		</>
	)
}

export default LoginPage
