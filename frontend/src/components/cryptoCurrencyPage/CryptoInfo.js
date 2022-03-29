// Styled Components
import { 
    InfoDetail, 
    LabelContainer,
    InfoLabel, 
    CompanyInfoContainer 
} from '../styles/Company.styled'


export default function CryptoInfo({info}) {
    return ( 
        <CompanyInfoContainer>
            <h1>Overview</h1>
            <LabelContainer>
                <InfoDetail>
                    <InfoLabel>Day High :</InfoLabel>
                    <span>${info ? info.dayHigh : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Day Low :</InfoLabel>
                    <span>${info ? info.dayLow : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Market Cap :</InfoLabel>
                    <span>${info ? (info.marketCap / 1000000000).toFixed(2) : '0.0'}B</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Market Cap. Rank :</InfoLabel>
                    <span>{info ? info.rank  : '0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>All Time High :</InfoLabel>
                    <span>${info ? info.allTimeHigh : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Creation Date :</InfoLabel>
                    <span>{info ? info.creationDate : '____-__-__'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Website :</InfoLabel>
                    <span><a href={info ? info.website : null}>{info ? info.website : "__"}</a></span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Github :</InfoLabel>
                    <span><a href={info ? info.github : null}>link</a></span>
                </InfoDetail>
            </LabelContainer>
        </CompanyInfoContainer>
    );
}