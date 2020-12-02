/**
 * StepperContext
 */

import React from "react"
import {NEXT_STEP, PREVIOUS_STEP, RESTART_STEP} from "consts/steppers"
import {useStorageReducer} from "react-storage-hooks"

const initialState = {
    step: 0
}

function reducer(state, action) {
    switch(action.type) {
        case NEXT_STEP:
            return {
                ...state,
                step: state.step + 1,
            }
        case PREVIOUS_STEP:
            return {
                ...state,
                step: state.step - 1,
            }
        case RESTART_STEP: 
            return {
                ...state,
                step: 0
            }
        default:
            return state
    }  
}

export const StepperContext = React.createContext()

export function StepperProvider ({children}) {
    const contextValue = useStorageReducer(
        localStorage,
        "step",
        reducer,
        initialState
    )

    return (
        <StepperContext.Provider value={contextValue}>
            {children}
        </StepperContext.Provider>
    )
}

export const StepperConsumer = StepperContext.Consumer