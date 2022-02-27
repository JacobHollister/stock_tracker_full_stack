import { CompanyInfoContainer } from './styles/Company.styled'

function CompanyInfo() {
    return ( 
        <CompanyInfoContainer>
            <span>OVERVIEW</span>
            <span>open : </span>
            <span>high : </span>
            <span>low : </span>
            <span>52 week high : </span>
            <span>52 week low : </span>
        </CompanyInfoContainer>
     );
}

export default CompanyInfo;