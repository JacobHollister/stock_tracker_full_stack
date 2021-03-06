import styled from 'styled-components';

export const StyledHeading = styled.div`
    border-bottom: 1.5px solid black;
    margin-bottom: 1.5rem;

    h1 {
        font-size: 1.3rem;
        font-style: italic;
        margin: 30px 0 5px 0;
    }
    @media (max-width: 576px) {
        margin-bottom: .5rem;
    }
`;