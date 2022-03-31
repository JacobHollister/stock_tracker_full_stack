// Package imports
import ReactDom from 'react-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { getPortfolio } from '../features/portfolio/portfolioSlice'
import { 
    reset, 
    cancel_confirm, 
    deleteTrade, 
    addTrade, 
    updateTrade 
} from '../features/trades/tradesSlice'

// Components
import Loader from '../components/sharedComponents/Loader'

// Styled Components
import { ButtonLarge } from '../components/styles/UI.styled'
import { Overlay, ModalContainer } from './Modal.styled'


export default function Modal() {
    const navigate = useNavigate()

    function createWrapperAndAppendToBody(wrapperId) {
        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute("id", wrapperId);
        document.body.appendChild(wrapperElement);
        return wrapperElement;  
    }

    let element = document.getElementById('modal');

    if (!element) {
    element = createWrapperAndAppendToBody('modal');
    }

    const dispatch = useDispatch()

    const { modalOpen, modalType, trade, isLoading, isError, isSuccess, message } = useSelector((state) => state.trades)

    useEffect(() => {
    if(isError) {
        console.log(message)
    }
    if (isSuccess) {
        dispatch(reset())
        dispatch(getPortfolio())
        navigate('/portfolio')
    }


    }, [isError, isSuccess, message, dispatch, navigate])

    const confirmHandler = () => {
        switch(modalType) {
            case 'delete':
                dispatch(deleteTrade(trade._id))
            break;
            case 'update':
                dispatch(updateTrade(trade))
            break;
            case 'add':
                dispatch(addTrade(trade))
            break;
            default:
                console.log('no dispatch found')
        }
    }

    const ModalHeadingHandler = () => {
        switch(modalType) {
            case 'delete':
                return "Delete Trade"
            case 'update':
                return "Edit Trade"
            case 'add':
                return "Add Trade"
            default:
                console.log('no dispatch found')
        }
    }

    const buttonColourHandler = () => {
        switch(modalType) {
            case 'delete':
                return "danger"
            case 'update':
                return "warning"
            case 'add':
                return "success"
            default:
                console.log('no dispatch found')
        }
    }


    if (!modalOpen) return null

    return ReactDom.createPortal(
    <>
        <Overlay/>
        <ModalContainer>
        {isLoading ? (
            <Loader/>
        ) : (
            <>
            <h2>{ModalHeadingHandler()}</h2>
            { trade.ticker ? (
                <p><strong>Ticker : </strong>{trade.ticker}</p>
            ) : (
                <>
                    <p><strong>Currency : </strong>{trade.symbol.toUpperCase()}</p> 
                    <p><strong>Pairing Currency : </strong>{trade.pairingSymbol}</p> 
                </>
            )}
            <p><strong>Quantity : </strong>{trade.quantity}</p>
            <p><strong>Purhcase price : </strong>{trade.purchase_price}</p>
            <p><strong>Purchase date : </strong>{format(new Date(trade.purchase_date), 'do LLLL yyyy')}</p>
            <p>Are you sure you would like to {modalType} this trade?</p>
            <div>
                <ButtonLarge color={buttonColourHandler()} onClick={() => confirmHandler()}> confirm </ButtonLarge>
                <ButtonLarge onClick={() => dispatch(cancel_confirm())}> cancel </ButtonLarge>
            </div>
            </>
        )}
        </ModalContainer>
    </>,
    document.getElementById('modal')
    )
}