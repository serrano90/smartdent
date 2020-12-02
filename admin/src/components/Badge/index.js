/**
 * Badge Component
 */

import React from "react"

export default function ({type, text, size}) {

    const getSize = () => {
        switch(size) {
            case "md":
                return "badge-md"
            case "lg":
                return "badge-lg"
            default:
                return ""
        }
    }
    
    return (
        <span className={`badge bg-${type} ${getSize()}`}>{text}</span>
    )
}