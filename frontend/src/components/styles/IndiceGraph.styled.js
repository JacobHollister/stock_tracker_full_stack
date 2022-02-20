import styled from 'styled-components';

export const IndiceGraphContainer = styled.div`
    display: grid;
`

export const IndiceGraphHeading = styled.div`
    display: flex;
    justify-content: space-between;

    span {
        margin: .5rem 1rem;
        font-size: .75rem;
    }
    
    > * {
        &:first-child{
            font-weight: bold;
        }
    
        &:nth-child(2){
            color: #333;
            text-transform: uppercase;
            border-bottom: 1px solid #333;
            padding-bottom: 2px;
        }
    }
`