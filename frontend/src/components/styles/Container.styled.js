import styled from 'styled-components';

export const Container = styled.div`
    width: 1000px;
    max-width: 100%;
    padding: 0 10px 10px 10px;
    margin: 0 auto;
    @media (max-width: 992px) {
        width: 992px;
    }
    @media (max-width: 767px) {
        margin: 4rem 0 0 0;
        padding: 0;
    }
    @media (max-width: 576px) {
        
    }
`