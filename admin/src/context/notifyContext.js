/**
 * Notify
 */

import React  from 'react'
import { Notyf } from 'notyf';

export default React.createContext(
  new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    types: [
        {
            type: 'info',
            background: 'blue',
            icon: {
                className: 'fas fa-info-circle',
                tagName: 'span',
                color: '#fff'
            },
            dismissible: false
        }
    ],
    duration: 5000 // Set your global Notyf configuration here
  })
);