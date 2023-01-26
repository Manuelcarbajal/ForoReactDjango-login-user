import React from 'react'
import styled from 'styled-components';


function Portal(props) {
    return (

        (props.trigger) ? (
        <PopUp>
            {props.children}
        </PopUp>


        ):""
    )
}

const PopUp = styled.div`
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100vh;
    background:rgba(57, 51, 51, 0.563);

    display:flex;
    justify-content:center;
    align-items:center;
    
`;

const PopupInner = styled.div`
    position:relative;
    padding:32px;
    width:100%;
    max-width:640px;
    background-color:white;

    border-radius: 10px;
    
`;

const Title = styled.div`
display:flex;
justify-content: center;
align-items:center;
flex-direction:column;

`;

const Form = styled.div`
display:flex;
justify-content: center;
align-items:center;
`;

const Input = styled.div`
display:flex;
justify-content: center;
align-items:center;
`;

const Button = styled.div`
display:flex;
justify-content: space-evenly;
align-items:center;

button{
    background:black;
    color:white;
}
`;




export { Portal, PopupInner,Title, Form, Input, Button }

