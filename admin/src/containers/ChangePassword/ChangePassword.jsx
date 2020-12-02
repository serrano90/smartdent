/**
 * New Password
 */

import React from "react"

const ChangePassword = ({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	handleSubmit,
	isSubmitting
}) => (
	<form onSubmit={handleSubmit}>
		<div className="form-group mb-4">
			<label>Contraseña Actual</label>
			<input
				type="password"
				className={"form-control " + (errors.oldPassword ? "is-invalid" : "")}
				placeholder="Contraseña Actual"
				id="oldPassword"
				name="oldPassword"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.oldPassword}
			/>
			{touched.oldPassword && errors.oldPassword ? (
				<div className="invalid-feedback">{errors.oldPassword}</div>
			) : (
				""
			)}
		</div>
		<div className="form-group mb-4">
			<label>Nueva Contraseña</label>
			<input
				type="password"
				className={"form-control " + (errors.newPassword ? "is-invalid" : "")}
				placeholder="Nueva Contraseña"
				id="newPassword"
				name="newPassword"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.newPassword}
			/>
			{touched.newPassword && errors.newPassword ? (
				<div className="invalid-feedback">{errors.newPassword}</div>
			) : (
				""
			)}
		</div>
		<div className="form-group mb-4">
			<label>Confirma Contraseña</label>
			<input
				type="password"
				className={
					"form-control " + (errors.confirmPassword ? "is-invalid" : "")
				}
				placeholder="Confirma Contraseña"
				id="confirmPassword"
				name="confirmPassword"
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.confirmPassword}
			/>
			{touched.confirmPassword && errors.confirmPassword ? (
				<div className="invalid-feedback">{errors.confirmPassword}</div>
			) : (
				""
			)}
		</div>
		<button
			type="submit"
			className="btn btn-block btn-info"
			disabled={isSubmitting}
		>
			{isSubmitting ? (
				<span
					className="spinner-border spinner-border-md"
					role="status"
					aria-hidden="true"
				></span>
			) : (
				"Guardar"
			)}
		</button>
	</form>
)

export default ChangePassword
