import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getWatchList } from '../features/watchlist/watchlistSlice'

import Loader from '../components/Loader'

function Watchlist() {
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

  if(isLoading) return <Loader />

  return (
    <div>
      {watchlist}
    </div>
  )
}

export default Watchlist