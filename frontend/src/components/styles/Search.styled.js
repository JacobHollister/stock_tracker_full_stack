import styled from 'styled-components';

export const SearchInput = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    input {
        width: 30rem;
        font-size: 1rem;
        font-weight: 600;
        margin-top: 1rem;
        padding: .5rem;
        background: #f3f3f3;
        border: 1px solid #dddddd;
        border-radius: .1rem;
        &:focus {
            outline: none;
            border-bottom: 1px solid black;
        }
    }
`

export const CompanyCard = styled.div`
    cursor: pointer;
    margin-bottom: .5rem;
    padding: 1rem;
    position: relative;
    border-bottom: 1px solid grey;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between; 
    align-items: center;
    &:hover {
        background-color: #f3f3f3;
        font-size: 1.01rem;
    }
    h3 {
        margin: .5rem 0;
    }

    h4 {
        margin: 0;
    }

`