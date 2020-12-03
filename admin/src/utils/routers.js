/**
 * Routers
 */

export default {
    ADMIN:{
        path: "/"
    },
    ADMIN_DASHBOARD: {
        path: "/",
        route: "/",
        name: "Dashboard"
    },
    ADMIN_LOGIN: {
        path: "/login",
        route: "/login",
        name: "Login"
    },
    ADMIN_CHANGE_PASSWORD:  {
        path: "/changePassword",
        route: "/changePassword",
        name: "Cambio de Contraseña"
    },
    ADMIN_PLANS: {
        path: "/plans",
        route: "/plans",
        name: "Planes"
    },
    ADMIN_CUSTOMERS: {
        path: "/customers",
        route: "/customers",
        name: "Clientes"
    },
    ADMIN_CUSTOMERS_PAYMENT: {
        path: ":id",
        route: "/customers/:id",
        name: "Clientes"
    },
    ADMIN_USERS: {
        path: "/users",
        route: "/users/:id",
        name: "Usuarios"
    }
}