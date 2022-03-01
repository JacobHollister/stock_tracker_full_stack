import { CompanyInfoDetail, InfoLabel, CompanyInfoContainer } from './styles/Company.styled'

function CompanyInfo({quote, companyInfo}) {
    return ( 
        <CompanyInfoContainer>
            <h1>Overview</h1>
            <div>
                <CompanyInfoDetail>
                    <InfoLabel>Open :</InfoLabel>
                    <span>${quote ? quote.o.toFixed(2) : '0.0'}</span>
                </CompanyInfoDetail>
                <CompanyInfoDetail>
                    <InfoLabel>High :</InfoLabel>
                    <span>${quote ? quote.h.toFixed(2) : '0.0'}</span>
                </CompanyInfoDetail>
                <CompanyInfoDetail>
                    <InfoLabel>Low :</InfoLabel>
                    <span>${quote ? quote.l.toFixed(2) : '0.0'}</span>
                </CompanyInfoDetail>
                <CompanyInfoDetail>
                    <InfoLabel>52 Week High :</InfoLabel>
                    <span>${companyInfo ? companyInfo.yearHigh.toFixed(2) : '0.0'}</span>
                </CompanyInfoDetail>
                <CompanyInfoDetail>
                    <InfoLabel>52 Week Low :</InfoLabel>
                    <span>${companyInfo ? companyInfo.yearLow.toFixed(2) : '0.0'}</span>
                </CompanyInfoDetail>
                <CompanyInfoDetail>
                    <InfoLabel>Market Cap. :</InfoLabel>
                    <span>${companyInfo && companyInfo.marketCapitalization ? (companyInfo.marketCapitalization/ 1000).toFixed(2)  : '0.0'}B</span>
                </CompanyInfoDetail>
                <CompanyInfoDetail>
                    <InfoLabel>P/E Ratio :</InfoLabel>
                    <span>{companyInfo && companyInfo.peRatio ? companyInfo.peRatio.toFixed(2) : '0.0'}</span>
                </CompanyInfoDetail>
            </div>
        </CompanyInfoContainer>
    );
}

export default CompanyInfo;