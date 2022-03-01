import { 
    NewsArticle, 
    NewsTitle, 
    NewsImage, 
    NewsSummary, 
    NewsSource
} from './styles/NewsSnippet.styled';

import defaultImage from '../assets/default.jpg'

const fns = require('date-fns')

export default function NewsSnippet ({articleData})  {
    const date = fns.format(fns.fromUnixTime(articleData.datetime), "eee do MMMM")

    return (
        <NewsArticle>
            <div>
                <a href={articleData.url}>
                    <NewsTitle>{articleData.headline}</NewsTitle>
                    <NewsSummary>{articleData.summary}</NewsSummary>
                </a>
                <NewsSource>{articleData.source} - {date} </NewsSource>
            </div>
            <div>
                <NewsImage src={articleData.image ? articleData.image : defaultImage}/>
            </div>
        </NewsArticle>
    )
}
