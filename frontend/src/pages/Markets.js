import React, {useEffect, useState} from 'react'
import axios from 'axios'

import { StyledHeading } from "../components/styles/Heading.styled"
import { MarketGraphContainer } from "../components/styles/MarketGraphContainer.styled"
import IndiceGraph from '../components/IndiceGraph'
import NewsSnippet from '../components/NewsSnippet'

function Markets() {

  const [newsData, setNewsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      loadNewsContent()
  //disable-eslint-next-line
  }, [])

  useEffect(() => {
    if(newsData.length){
      setIsLoading(false)
    }
  }, [newsData])

  const loadNewsContent = async () => {
    setIsLoading(true)
    axios.get(`http://localhost:5000/api/v1/news`)
    .then(result => {
        setNewsData(result.data)
    })
    .catch (
        err => console.error(err)
    )
  }

  let content = null

  if (!isLoading) {
    content = newsData.map((article) => {
        return (
            <NewsSnippet articleData={article} key={article.id}/>
        )
    }) 
  }

  return (
    <>
      {/* US markets heading */}
      <StyledHeading>
        <h1>
          US MARKETS
        </h1>
      </StyledHeading>
      {/* US Markets (4 x indices graph components) */}
      <MarketGraphContainer>
        <IndiceGraph ticker={"spy"} indice={'S&P500'}/>
        <IndiceGraph ticker={"qqq"} indice={'NASDAQ'}/>
        <IndiceGraph ticker={"iwm"} indice={'RUSSEL 2000'}/>
        <IndiceGraph ticker={"vxx"} indice={'VOLATILITY INDEX'}/>
      </MarketGraphContainer>
      {/* General news */}
      <StyledHeading>
        <h1>
          news
        </h1>
      </StyledHeading>
      {content}
    </>
  )
}

export default Markets