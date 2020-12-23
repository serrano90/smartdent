/**
 * Constants
 */

import routers from "utils/routers"

export const links = [
	{
		name: "Inicio",
		link: routers.ADMIN.path
	},
	{
		name: "Clientes",
		link: routers.ADMIN_CUSTOMERS.route
	},
	{
		name: "Lista Clientes"
	}
]

export const columnsName = [
	{
		name: "Nombre y Apellidos"
	},
	{
		name: "RUT"
	},
	{
		name: "Estado"
	},
	{
		name: "Suscripcion Plan"
	},
	{
		name: "Suscripcion Precio"
	},
	{
		name: "Fecha de Creacion"
	},
]