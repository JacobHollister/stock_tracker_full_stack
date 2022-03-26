// Package imports
import {useEffect, useState} from 'react'

// Hooks
import useInfiniteScroll from "../../hooks/useInfiniteScroll"

// Helper functions
import { fetchNewsContent } from '../../utils/Api'

// Components
import Loader from "./Loader"
import NewsSnippet from "./NewsSnippet"

// Styled Components
import { StyledHeading } from "../styles/Heading.styled"


export default function News({ticker}) {

  const [newsData, setNewsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [getPage, setGetPage] = useInfiniteScroll();
  const [page, setPage] = useState(0)
  
  useEffect(() => {
    let isMounted = true

    setIsLoading(true)

    fetchNewsContent(page, ticker)
      .then((NewsContent) => {
        if(!isMounted) return
        setNewsData(prevState => {
          return [...prevState, ...NewsContent]
        })
        setGetPage(false)
        setIsLoading(false)
    })

    return () => isMounted = false
  }, [page, ticker, setGetPage]) 


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