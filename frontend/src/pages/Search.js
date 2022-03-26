// Package imports
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Redux imports
import { useSelector } from 'react-redux'

// Helper functions
import { searchCompanies } from '../utils/Api'

// Components
import Loader from '../components/sharedComponents/Loader'

// Styled Components
import { StyledHeading } from '../components/styles/Heading.styled'
import { SearchInput, CompanyCard } from '../components/styles/Search.styled'


export default function Search() {
  const navigate = useNavigate()

  const [ searchQuery, setSearchQuery ] = useState('')
  const [ searchResults, setSearchResults] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    let isMounted = true

    const delay = setTimeout(() => {
      if(searchQuery.length === 0) return
      setIsLoading(true)

      searchCompanies(searchQuery).then(
        (result) => {
          if(!isMounted) return
          setSearchResults(result.data)
          setIsLoading(false)
        })

    }, 2000)

    return () => {
      clearTimeout(delay)
      isMounted = false
    }
  }, [searchQuery])

  function searchHandler(e) {
    setSearchQuery(e.target.value)
  }

  const results = searchResults.map((company, ind) => {
    const to = `/company/${company.symbol}`
    return (
      <Link style={{textDecoration: 'none', color: 'black'}} to={to} key={ind}>
        <CompanyCard >
          <h3>{company.description}</h3>
          <h4><span><i>Symbol</i> :</span> <span> {company.symbol}</span></h4>
        </CompanyCard>
      </Link>
    )
  })

  return (
      <>
        <SearchInput>
          <input placeholder={'Search'} value={searchQuery} onChange={(e) => searchHandler(e)}></input>
          <span></span>
        </SearchInput>
        {(searchResults.length > 0) ? 
        <StyledHeading>
          <h1>
            SEARCH RESULTS
          </h1>
        </StyledHeading>
        : null}
        {isLoading ? <Loader/> : results}
      </>
  )
}