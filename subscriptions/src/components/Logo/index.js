/**
 * Logo
 */

import React from "react"
import styled from "styled-components" 
import smartDentLogo from "assets/img/logo/logo.png"

const Wrapper = styled.div`
    width: 250px
`

const Logo = ({width}) => (
    <Wrapper>
        <img src={smartDentLogo} alt="logo"/>
    </Wrapper>
)

export default Logo