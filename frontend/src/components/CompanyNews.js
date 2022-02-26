import Loader from "./Loader"
import { StyledHeading } from "./styles/Heading.styled"
import useInfiniteScroll from "../hooks/useInfiniteScroll"
import axios from "axios"
import NewsSnippet from "./NewsSnippet"
import {useEffect, useState} from 'react'

function CompanyNews({ticker}) {


    const [newsData, setNewsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(0)

    useEffect(() => {
        loadNewsContent()
    //disable-eslint-next-line
    }, [page])
  
    useEffect(() => {
      if(newsData.length){
        setIsLoading(false)
      }
    }, [newsData])

    const loadNewsContent = async () => {
        setIsLoading(true)
        axios.get(`http://localhost:5000/api/v1/news/${ticker}?page=${page}`)
        .then(result => {
          if(newsData.length){
            setNewsData(prevState => {
              return [...prevState, ...result.data]
            })
          } else {
            setNewsData(result.data)
          }
        })
        .catch (
          err => console.error(err)
          )
        }
        
      const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
    
      async function fetchMoreListItems() {
        setPage(prevState => (prevState + 1));
        setTimeout(() => {
          setIsFetching(false);
        }, 1000)
      }
      
    let content = newsData.map((article) => {
        return (
            <NewsSnippet articleData={article} key={article.id}/>
        )
    }) 

    return (
      <>
        {/* General news */}
        <StyledHeading>
            <h1>
            news
            </h1>
        </StyledHeading>
        {content}
        {(isFetching || isLoading) && <Loader/>}
        </>  
    )
    return ( 
        <>
        </>
     );
}

export default CompanyNews;
