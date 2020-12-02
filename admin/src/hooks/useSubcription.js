/**
 * SubcriptionHooks
 */
import React from "react"
import {SubcriptionContext} from "context/subcriptionContext"

export default function useSubcription() {
	const contextValue = React.useContext(SubcriptionContext)
	return contextValue
}
