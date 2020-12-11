/**
 * SubcriptionContext
 */

import React from "react"
import {
	ADD_PLAN,
	ADD_CUSTOMER,
	ADD_PAYMENT_TOKEN,
	ADD_CARD,
	ADD_SUBSCRIPTION_ID,
	RESET_DATA,
	ERROR,
	LOADING,
	COMPLETE
} from "consts/subcriptions"
import {useStorageReducer} from "react-storage-hooks"

const ttl = 1*60*60*1000

const initialState = {
	error: null,
	loading: false,
	complete: false,
	customer: {
		rut: "",
		customerId: "",
		name: "",
		lastName: "",
		email: "",
	},
	card: {
		last4CardDigits: "",
		creditCardType: "",
		status: false,
	},
	plan: {
		name: "",
		amount: 0,
		currency: ""
	},
	subcriptionId: "",
	customerId: "",
	planId: "",
	token: "",
	expiry: (new Date()).getTime() + ttl
}

function reducer(state, action) {
	switch (action.type) {
		case ADD_PLAN:
			return {
				...state,
				planId: action.planId,
				plan: action.plan,
			}
		case ADD_CUSTOMER:
			return {
				...state,
				customerId: action.customerId,
				customer: action.customer
			}
		case ADD_PAYMENT_TOKEN:
			return {
				...state,
				token: action.token
			}
		case ADD_CARD:
			return {
				...state,
				card: action.card
			}
		case ADD_SUBSCRIPTION_ID:
			return {
				...state,
				subscriptionsId: action.subscriptionsId
			}
		case RESET_DATA:
			return {
				error: null,
				loading: false,
				complete: false,
				customerId: "",
				customer: {
					name: "",
					lastName: "",
					email: ""
				},
				card: {
					last4CardDigits: "",
					creditCardType: "",
					status: false,
				},
				plan: {
					name: "",
					amount: 0,
					currency: ""
				},
				planId: "",
				token: "",
				expiry: (new Date()).getTime() + ttl
			}
		case ERROR:
			return {
				...state,
				error: action.error
			}
		case LOADING: {
			return {
				...state,
				loading: action.loading
			}
		}
		case COMPLETE: {
			return {
				...state,
				complete: action.complete
			}
		}
		default:
			return state
	}
}

export const SubcriptionContext = React.createContext()

export function SubcriptionProvider({children}) {
	const contextValue = useStorageReducer(
		localStorage,
		"subcription",
		reducer,
		initialState
	)

	return (
		<SubcriptionContext.Provider value={contextValue}>
			{children}
		</SubcriptionContext.Provider>
	)
}

export const SubcriptionConsumer = SubcriptionContext.Consumer
