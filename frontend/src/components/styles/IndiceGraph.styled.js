import styled from 'styled-components';

export const IndiceGraphContainer = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-rows: auto 1fr;
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
            width: 100%;
        }
    
        &:nth-child(2){
            color: #333;
            text-transform: uppercase;
            margin-right: 0;
            padding-right: .25rem;
        }

        &:nth-child(3){
            margin-left: 0;
        }

        &:nth-child(2),
        &:nth-child(3){
            border-bottom: 1px solid #333;
            padding-bottom: 2px;
        }
    }
`