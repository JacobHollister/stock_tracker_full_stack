// Helper functions
import { 
    portfolionIvestmentGainHandler,
    portfolfioInvestmentPercentHandler,
    portfolfioInvestmentColorHandler
} from '../../utils/PortfolioUtils'

// Styled Components
import {
    PortfolioOverviewContainer,
    PortfolioInfoLabel,
    PortfolioInfoDetail
} from '../styles/Portfolio.styled'
import { StyledHeading } from '../styles/Heading.styled'


export default function PortfolioOverview ({portfolioData}) {


    return (
        <>
            <StyledHeading>
                <h1>
                OVERVIEW
                </h1>
            </StyledHeading>
            <PortfolioOverviewContainer>
                <PortfolioInfoDetail>
                    <PortfolioInfoLabel>Open</PortfolioInfoLabel>
                    <span> : </span>
                    <span>${(portfolioData.closeStock || portfolioData.closeCrypto) ? (parseFloat(portfolioData.openCrypto) + parseFloat(portfolioData.openStock)).toFixed(2) : '0.0'}</span>
                </PortfolioInfoDetail>
                <PortfolioInfoDetail>
                    <PortfolioInfoLabel>Close</PortfolioInfoLabel>
                    <span> : </span>
                    <span>${(portfolioData.closeStock || portfolioData.closeCrypto) ? (parseFloat(portfolioData.closeCrypto) + parseFloat(portfolioData.closeStock)).toFixed(2) : '0.0'}</span>
                </PortfolioInfoDetail>
                <PortfolioInfoDetail>
                    <PortfolioInfoLabel>Total Gain / Loss</PortfolioInfoLabel>
                    <span> : </span>
                    <span style={{color: portfolfioInvestmentColorHandler(portfolioData)}}>{(portfolioData.investmentCost && (portfolioData.closeStock || portfolioData.closeCrypto)) ? portfolionIvestmentGainHandler(portfolioData) : '0.0'}</span>
                </PortfolioInfoDetail>
                <PortfolioInfoDetail >
                    <PortfolioInfoLabel>Total Gain / Loss %</PortfolioInfoLabel>
                    <span> : </span>
                    <span style={{color: portfolfioInvestmentColorHandler(portfolioData)}}>{(portfolioData.investmentCost && (portfolioData.closeStock || portfolioData.closeCrypto)) ? portfolfioInvestmentPercentHandler(portfolioData) : '0.0'}</span>
                </PortfolioInfoDetail>
                <PortfolioInfoDetail>
                    <PortfolioInfoLabel>Investment Cost</PortfolioInfoLabel>
                    <span> : </span>
                    <span>${portfolioData.investmentCost ? portfolioData.investmentCost : '0.0'}</span>
                </PortfolioInfoDetail>
            </PortfolioOverviewContainer>
        </>
    )

}