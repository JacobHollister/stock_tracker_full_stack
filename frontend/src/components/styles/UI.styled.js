import styled from 'styled-components';

export const ButtonLarge = styled.button`
    cursor: pointer;
    font-weight: 600;
    width: 10rem;
    height: 2rem;
    justify-self: end;
    align-self: end;
    margin: .5rem;
    background-color: ${props => {
        switch(props.color){
            case 'danger':
                return "#d9534f"
            case 'warning':
                return "#ffc107"
            case 'success':
                return "#5cb85c"
            default:
                return "lightgrey"
        }
    }};
    border: none;
    border-radius: .1rem;
    color: ${props => props.color ? '#ffffff' : '#343a40'};
    transition: .1s;
    &:hover {
        filter: brightness(90%);
    }
`