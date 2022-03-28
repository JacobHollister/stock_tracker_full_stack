import styled from 'styled-components';

export const MarketGraphContainer = styled.div`
    display: grid;
    grid-gap: .5rem;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 768px) {
        grid-template-columns: 100%;
    }
    & > div {
        flex: 1 0 calc(50% - .5rem);
        height: 200px;
        border: 1px solid black;
    }
`;

export const SmallGraphContainer = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-rows: auto 1fr;
`

export const SmallGraphHeading = styled.div`
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