import styled from 'styled-components';

export const NewsArticle = styled.article`
    width: 100%;
    border-bottom: 1.5px solid lightgray;
    padding-bottom: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
        text-decoration: none;
        color: black;
    }
`;

export const NewsTitle = styled.h3`
    font-size: .8rem;
    margin: 1rem 0 .5rem 0;
`;

export const NewsSummary = styled.p`
    font-size: .75rem;
    margin-top: .5rem;
    `;

export const NewsSource = styled.span`
    font-size: .75rem;
    color: gray;
    
`;

export const NewsImage = styled.img`
    object-fit: cover;
    width: 7.5rem;
    height: 5rem;
    border-radius: .5rem;
    margin-left: 1rem;
`;