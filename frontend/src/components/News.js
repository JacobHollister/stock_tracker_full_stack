import {useEffect, useState, useCallback} from 'react'
import { fetchNewsContent } from '../utils/Api'
import useInfiniteScroll from "../hooks/useInfiniteScroll"

import Loader from "./Loader"
import NewsSnippet from "./NewsSnippet"

import { StyledHeading } from "./styles/Heading.styled"


function News({ticker}) {

  const [newsData, setNewsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [getPage, setGetPage] = useInfiniteScroll();
  const [page, setPage] = useState(0)

  const loadNewsContent = useCallback(
    async (page, ticker) => {
      setIsLoading(true)

      fetchNewsContent(page, ticker)
        .then((NewsContent) => {
          setNewsData(prevState => {
            return [...prevState, ...NewsContent]
          })
          setGetPage(false)
          setIsLoading(false)
      })
    },
    [setGetPage],
  )
  

  useEffect(() => {
      loadNewsContent(page, ticker)
  }, [page, ticker, loadNewsContent]) 


  useEffect(() => {
    if(!getPage) return

    setIsLoading(true)

    const delay = setTimeout(() => {
      setPage(prevState => (prevState + 1));
    }, 500)

    return () => clearTimeout(delay)
  }, [getPage])

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
          NEWS
          </h1>
      </StyledHeading>
      {content}
      {isLoading ? <Loader/> : null}
      </>  
  )
}

export default News;
