/**
 * Routers
 */

export default {
    SUBCRIPTIONS: {
        path: "/subcriptions",
        route: "/subcriptions",
        name: "Subcricciones"
    },
    THANKYOU: {
        path: "/thankyou",
        route: "/thankyou",
        name: "Thank You"
    },
    ADMIN:{
        path: "/admin"
    },
    ADMIN_DASHBOARD: {
        path: "/",
        route: "/admin",
        name: "Dashboard"
    },
    ADMIN_LOGIN: {
        path: "/login",
        route: "/admin/login",
        name: "Login"
    },
    ADMIN_CHANGE_PASSWORD:  {
        path: "/changePassword",
        route: "/admin/changePassword",
        name: "Cambio de Contraseña"
    },
    ADMIN_PLANS: {
        path: "/plans",
        route: "/admin/plans",
        name: "Planes"
    },
    ADMIN_CUSTOMERS: {
        path: "/customers",
        route: "/admin/customers",
        name: "Clientes"
    },
    ADMIN_CUSTOMERS_PAYMENT: {
        path: ":id",
        route: "/admin/customers/:id",
        name: "Clientes"
    },
    ADMIN_USERS: {
        path: "/users",
        route: "/admin/users/:id",
        name: "Usuarios"
    }
}