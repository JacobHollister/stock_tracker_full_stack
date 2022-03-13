import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPortfolio } from '../features/portfolio/portfolioSlice'

import Loader from '../components/Loader'

function Portfolio() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { trades, isLoading, isError, isSuccess, message  } = useSelector((state) => state.portfolio)

  useEffect(() => {
    if(!user){
      navigate('/login')
    } else {
      dispatch(getPortfolio())
    }
  }, [user, navigate, dispatch])

  if(isLoading || !isSuccess) return <Loader/>

  const portfolio = trades.map((trade, ind) => {
    return (
      <div key={ind}>
        <span>{trade.ticker}{trade.quantity}{trade.purchase_price}{trade.purchase_date}</span>
      </div>
    )
  })


  return (
    <div>{portfolio}</div>
  )
}

export default Portfolio