import styled from 'styled-components';

export const MarketGraphContainer = styled.div`
    display: flex;
    flex-direction: col;
    flex: 1 1;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: space-between;
    
    & > div {
        flex: 1 0 calc(50% - .5rem);
        height: 200px;
        border: 1px solid black;
    }
`;