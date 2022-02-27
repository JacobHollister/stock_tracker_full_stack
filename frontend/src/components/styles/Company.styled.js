import styled from 'styled-components';

export const CompanyContainer = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
`;

export const CompanyHeading = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;

    h1 {
        font-size: 1.3rem;
        margin: 30px 0 5px 0;
    }

    h2 {
        font-size: 1.3rem;
        font-weight: 300;
        margin: 5px 0;

        span {
            margin-right: 1rem;
        }
    }
`

export const CompanyInfoContainer = styled.div`
    display: grid;
    grid-auto-flow: row;
`