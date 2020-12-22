/**
 * Resources
 */

const resources = {
    PLAN: {
        GET_PLAN: {
            PATH: "v1/plans"
        }
    },
    CUSTOMER: {
        CREATE_CUSTOMER: {
            PATH: "v1/customers"
        },
        LIST_CUSTOMER: {
            PATH: "v1/customers"
        },
        DETAILS_CUSTOMER: {
            PATH: "v1/customers"
        },
        UPDATE_CUSTOMER: {
            PATH: "v1/customers"
        },
        DELETE_CUSTOMER: {
            PATH: "v1/customers"
        }
    },
    INVOICES: {
        CUSTOMER_INVOICE: {
            PATH: "v1/customers"
        },
    },
    PAYMENT: {
        ADD_CARD: {
            PATH: "v1/payments/registerCard"
        },
        REMOVE_CARD: {
            PATH: "v1/payments/unRegisterCard"
        },
        GET_STATUS_CARD: {
            PATH: "v1/payments/getRegisterCardStatus"
        },
        UPDATE_REGISTER_CARD: {
            PATH: "v1/payments/sendEmailToRegisterCard"
        }
    },
    SUBCRIPTIONS: {
        CREATE: {
            PATH: "v1/subscriptions"
        },
        UPDATE: {
            PATH: "v1/subscriptions/update"
        },
        DELETE: {
            PATH: "v1/subscriptions/unSubscriber"
        }
    },
    REPORTS: {
        GET_TOTAL_REPORT: {
            PATH: "v1/reports/totalReport"
        }
    }
}

export default resources