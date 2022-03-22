import styled from 'styled-components';

export const Container = styled.div`
    width: 1000px;
    max-width: 100%;
    padding: 0 10px;
    margin: 0 auto;
    @media (max-width: 992px) {
        width: 992px;
    }
    @media (max-width: 768px) {
        width: 768px;
    }
    @media (max-width: 576px) {
        width: 576px;
        margin-top: 3rem;
        padding: 0;
    }
`