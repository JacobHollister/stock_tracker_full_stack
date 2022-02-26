import { useParams } from 'react-router-dom'

import CompanyGraph from '../components/CompanyGraph'
import CompanyNews from '../components/CompanyNews'
import CompanyInfo from '../components/CompanyInfo'
import { StyledHeading } from "../components/styles/Heading.styled"

function Company() {
    const {ticker} = useParams()

    return (
        <>
        <StyledHeading>
            <h1>
                {ticker.toUpperCase()}
            </h1>
        </StyledHeading>
        
        <CompanyGraph ticker={ticker}>

        </CompanyGraph>
        <CompanyInfo>

        </CompanyInfo>
        <CompanyNews ticker={ticker}>

        </CompanyNews>
        </>
    )
  }
  
  export default Company