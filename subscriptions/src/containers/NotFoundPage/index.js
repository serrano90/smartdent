/**
 * NotFoundPage
 */
import React from "react"
import {useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import svg404 from "assets/img/illustrations/404.svg"

const NotFoundPage = () => {
    let navigate = useNavigate(); 

    return (
        <React.Fragment>
            <section className="vh-100 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center d-flex align-items-center justify-content-center">
                            <div>
                                <img className="img-fluid w-75" src={svg404} alt="404 not found" />
                                
                                <h1 className="mt-5">Page not <span className="font-weight-bolder text-primary">found</span></h1>
                                <p className="lead my-4">Oops! A ocurrido un problema, presione el boton para volver al paso anterior</p>
                                <button className="btn btn-primary animate-hover" onClick={() => navigate(-1)}>
                                    <FontAwesomeIcon icon={["fas", "chevron-left"]} size="sm" className="mr-3"/>
                                    
                                    Atras
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default NotFoundPage