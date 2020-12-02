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
		name: "Detalle de Cliente"
	}
]

export const columnsBillingName = [
	{
		name: "Conceptos"
	},
	{
		name: "Monto"
	},
	{
		name: "Fecha de Creacion"
	},
	{
		name: "Estado"
	},
	{
		name: "Acciones"
	}
]

export const columnsPaymentIntent = [
	{
		name: "No."
	},
	{
		name: "Concepto"
	},
	{
		name: "Fecha de Pago"
	},
	{
		name: "Monto Original"
	},
	{
		name: "Monto Pagado"
	},
	{
		name: "Estado"
	},
]

export const columnsChargeIntentFailed = [
	{
		name: "No."
	},
	{
		name: "No. Factura"
	},
	{
		name: "Monto"
	},
	{
		name: "Fecha de Creadoción"
	},
]