// Package imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Helper functions
import { fetchQuote } from '../../utils/Api'

// Components
import WatchlistGraph from './WatchlistGraph'

// Styled Components
import { SlimCard } from '../styles/Watchlist.styled'


export default function WatchlistCard({ticker}) {

  const [ quote, setQuote] = useState(null)
  const [ Color, setColor ] = useState(null)
  
  useEffect(() => {
    let isMounted = true
    fetchQuote(ticker)
      .then(result => {
        if(!isMounted) return
        setQuote(result)
      })
      .catch (
        err => console.error(err)
      )
      
      return () => {
        isMounted = false
      }
  }, [ticker])

  useEffect(() => {
      
      const dangerFill = '#d9534f';
      const successFill =  '#5cb85c'; 

      if (quote && quote.dp < 0){
          setColor(dangerFill)
      } else if (quote && quote.dp > 0) {
          setColor(successFill)
      }
  }, [quote])


  function quoteChangeHandler() {
      const changeDirection = ( quote.dp > 0 ) ? '+' : "-"
      const changePercentage = Math.abs(quote.dp.toFixed(2))
      return `( ${changeDirection}${changePercentage}% )` 
  }

  const linkTo = `/company/${ticker}`

  return (
    <Link to={linkTo} style={{ textDecoration: 'none' }}>
      <SlimCard color={Color}>
        <h3>{ticker}</h3>
        <div>
          <WatchlistGraph ticker={ticker} chartColor={Color}/>
        </div>
        <h4>
          <span>${quote ? quote.c.toFixed(2) : '0.0'} </span>
          <span >{quote ? quoteChangeHandler() : '0.0'}</span>
        </h4>
      </SlimCard>
    </Link>
  )
}