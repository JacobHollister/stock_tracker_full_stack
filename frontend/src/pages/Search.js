import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { StyledHeading } from '../components/styles/Heading.styled'
import { SearchInput, CompanyCard } from '../components/styles/Search.styled'
import { searchCompanies } from '../utils/Api'

import Loader from '../components/Loader'

function Search() {

  const [ searchQuery, setSearchQuery ] = useState('')
  const [ searchResults, setSearchResults] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    const delay = setTimeout(() => {
      if(searchQuery.length === 0) return
      fetchSearchQuery(searchQuery)
      // Send Axios request here
    }, 2000)

    return () => clearTimeout(delay)
  }, [searchQuery])

  function searchHandler(e) {
    setSearchQuery(e.target.value)
  }

  async function fetchSearchQuery(query) {
  setIsLoading(true)

  searchCompanies(query).then(
    (result) => {
      setSearchResults(result.data)
      setIsLoading(false)
    })
  }

  const results = searchResults.map((company, ind) => {
    const to = `/company/${company.symbol}`
    return (
      <Link style={{textDecoration: 'none', color: 'black'}} to={to} key={ind}>
        <CompanyCard >
          <h3>{company.description}</h3>
          <h4><i>Symbol</i> : {company.symbol}</h4>
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

export default Search