/**
 * SignIn Form
 */

import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const SignIn = ({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	handleSubmit,
	isSubmitting
	/* and other goodies */
}) => (
	<form onSubmit={handleSubmit}>
		<div className="form-group mb-4">
			<label>Usuario</label>
			<div className="input-group">
				<span className="input-group-text" id="basic-addon1">
					<FontAwesomeIcon icon={["fas", "user"]} size="sm" />
				</span>
				<input
					type="text"
					className="form-control"
					placeholder="Username"
					id="username"
					name="username"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.username}
				/>
			</div>
		</div>
		<div className="form-group mb-4">
			<label>Contraseña</label>
			<div className="input-group">
				<span className="input-group-text" id="basic-addon2">
					<FontAwesomeIcon icon={["fas", "unlock-alt"]} size="sm" />
				</span>
				<input
					type="password"
					placeholder="Password"
					className="form-control"
					id="password"
					name="password"
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.password}
				/>
			</div>
		</div>
		<div className="form-group mb-5">
			{/* <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck5"
                    />
                    <label className="form-check-label" for="defaultCheck5">
                        Recuerdame
                    </label>
                </div>
                <div>
                    <a href="#" className="small text-right">
                        Perdistes tu contraseña?
                    </a>
                </div>
            </div> */}
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
				"Entrar"
			)}
		</button>
	</form>
)

export default SignIn
