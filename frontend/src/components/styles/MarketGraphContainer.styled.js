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