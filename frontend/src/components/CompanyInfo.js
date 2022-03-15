import { InfoDetail, InfoLabel, CompanyInfoContainer } from './styles/Company.styled'

function CompanyInfo({quote, companyInfo}) {
    return ( 
        <CompanyInfoContainer>
            <h1>Overview</h1>
            <div>
                <InfoDetail>
                    <InfoLabel>Open :</InfoLabel>
                    <span>${quote ? quote.o.toFixed(2) : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>High :</InfoLabel>
                    <span>${quote ? quote.h.toFixed(2) : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Low :</InfoLabel>
                    <span>${quote ? quote.l.toFixed(2) : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>52 Week High :</InfoLabel>
                    <span>${companyInfo ? companyInfo.yearHigh.toFixed(2) : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>52 Week Low :</InfoLabel>
                    <span>${companyInfo ? companyInfo.yearLow.toFixed(2) : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Market Cap. :</InfoLabel>
                    <span>${companyInfo && companyInfo.marketCapitalization ? (companyInfo.marketCapitalization/ 1000).toFixed(2)  : '0.0'}B</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>P/E Ratio :</InfoLabel>
                    <span>{companyInfo && companyInfo.peRatio ? companyInfo.peRatio.toFixed(2) : '0.0'}</span>
                </InfoDetail>
            </div>
        </CompanyInfoContainer>
    );
}

export default CompanyInfo;