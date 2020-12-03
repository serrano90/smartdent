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
		name: "Estado"
	},
	{
		name: "Tarjeta de Credito"
	},
	{
		name: "Fecha de Creacion"
	},
]