import {useEffect, useState} from 'react'
import { fetchNewsContent } from '../utils/Api'
import useInfiniteScroll from "../hooks/useInfiniteScroll"

import Loader from "./Loader"
import NewsSnippet from "./NewsSnippet"

import { StyledHeading } from "./styles/Heading.styled"


function News({ticker}) {

  const [newsData, setNewsData] = useState([])
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)

  useEffect(() => {
      loadNewsContent(page)
  //disable-eslint-next-line
  }, [page])

  useEffect(() => {
    if(newsData.length){
      setIsLoading(false)
    }
  }, [newsData])

  const loadNewsContent = async(page) => {
    setIsLoading(true)

    fetchNewsContent(page, ticker)
      .then((NewsContent) => {
        if(newsData.length){
          setNewsData(prevState => {
            return [...prevState, ...NewsContent]
          })
        } else {
          setNewsData([...NewsContent])
        }
      })
  }

  async function fetchMoreListItems() {
    setPage(prevState => (prevState + 1));
    setTimeout(() => {
      setIsFetching(false);
    }, 1000)
  }
  

    const content = newsData.map((article) => {
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
}

export default News;
