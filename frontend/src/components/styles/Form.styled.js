import styled from 'styled-components';

export const FormContainer = styled.div`
    width: 70%;
    padding: 0 10px;
    margin: 2rem auto;
`

export const FormHeading = styled.section`
    width: 100%;
    text-align: center;
    h1, p {
        margin: .5rem;
    }
    h1 {
        display: grid;
        grid-gap: .5rem;
        grid-auto-flow: column;
        align-items: center;
        justify-content: center;
    }
`

export const Form = styled.section`
    width: 100%;
    padding: .5rem;
    form {
    }
    form input{
        width: 100%;
        display: block;
        margin: 1rem auto;
        padding: .5rem;
        border: 1px solid #e6e6e6;
        border-radius: .2rem;
        font-size: 1rem;
    }
    div {
        display: grid;
        grid-auto-flow: column;
        justify-content: space-evenly; 
        align-items: center;   
    }
`

export const QueryButton = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    &:hover {
        text-decoration: underline;
    }
`

