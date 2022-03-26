// Package imports
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { getWatchList } from '../features/watchlist/watchlistSlice'

// Components
import Loader from '../components/sharedComponents/Loader'
import WatchlistCard from '../components/watchlistPage/WatchlistCard'


export default function Watchlist() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { user } = useSelector((state) => state.auth)
  const { watchlist, isLoading, isError, isSuccess, message } = useSelector((state) => state.watchlist)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if (user) {
      dispatch(getWatchList())
    }
  }, [user, isError, message, isSuccess, dispatch])

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])

  const watchlistCompanys = watchlist.map((ticker, ind) => {
    return (
      <WatchlistCard ticker={ticker} key={ticker}/>
    )
  })

  if(isLoading) return <Loader />

  return (
    <div>
      {watchlistCompanys}
    </div>
  )
}