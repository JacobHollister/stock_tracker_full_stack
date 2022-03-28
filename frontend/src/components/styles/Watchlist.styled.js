import styled from 'styled-components';

export const SlimCard = styled.div`
    cursor: pointer;
    margin-bottom: .5rem;
    margin: .5rem;
    position: relative;
    border-bottom: 1px solid grey;
    display: grid;
    gap: 1rem;
    grid-template-columns: 15rem 1fr 15rem;
    justify-content: space-between; 
    align-items: center;
    color: black;
    &:hover {
        background-color: #f3f3f3;
        font-size: 1.01rem;
    }
    h3 {
        margin: .5rem 0;
        padding: .5rem;
    }
    
    h4 {
        color: ${props => props.color};
        margin: 0;
        display: grid;
        grid-auto-flow: column;
        justify-content: end;
        gap: .5rem;
        padding: .5rem;
    }
    div {
        width: 10rem;
        height: 5rem;
        justify-self: end;
    }
    
    @media (max-width: 992px) {
    }
    @media (max-width: 767px) {
        margin: .5rem 0;
        grid-template-columns: .75fr .5fr 1fr;
        h3{
            span {
                &:nth-child(2){
                    display: none;
                }
                &:nth-child(3){
                    display: none;
                }
            }
        }
    }
    @media (max-width: 576px) {
        margin: .5rem 0;
        grid-template-columns: .5fr 1fr 1fr;
        margin: .5rem 0;
        h4{
            text-align: end;
            grid-auto-flow: row;
            justify-content: end;
        }
        div {
            width: 100px;
        }
        h3{
            span {
                &:nth-child(1){
                    display: none;
                }
                &:nth-child(3){
                    display: contents;
                }
            }
        }
    }
    
`
