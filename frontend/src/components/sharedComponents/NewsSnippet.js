// Package imports
import { format, fromUnixTime } from 'date-fns'

// Styled Components
import { 
    NewsArticle, 
    NewsTitle, 
    NewsImage, 
    NewsSummary, 
    NewsSource
} from '../styles/NewsSnippet.styled';

// Assets / Icons
import defaultImage from '../../assets/default.jpg'


export default function NewsSnippet ({articleData})  {
    const date = format(fromUnixTime(articleData.datetime), "eee do MMMM")

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
