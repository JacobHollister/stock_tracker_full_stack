// Package imports
import { useState } from 'react'

// Redux imports
import { useSelector } from 'react-redux'

// Components
import Loader from '../components/sharedComponents/Loader'

// Styled Components
import { 
    FormContainer, 
    FormHeading, 
    Form, 
    FormButtonContainer } from '../components/styles/Form.styled'
import { ButtonLarge  } from '../components/styles/UI.styled'

// Assets / Icons
import { FiLogIn } from 'react-icons/fi'


export default function ForgotPassword() {
    
    const [formData, setFormData] = useState({
        email: '',
    })

    const {email} = formData
    
    //const navigate = useNavigate()
    //const dispatch = useDispatch()
    
    const { isLoading } = useSelector((state) => state.auth)
    //const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!email) return console.log("no email")

        // dispatch() <== create dispatch
    }

    if(isLoading) {
        return <Loader/>
    }

    return (
        <FormContainer>
            <FormHeading>
                <h1>
                    <FiLogIn /> Password reset
                </h1>
                <p>Please enter email to recieve password reset instructions</p>
            </FormHeading>

            <Form>
                <form onSubmit={onSubmit}>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange}
                        />
                    <FormButtonContainer>
                        <ButtonLarge color={'success'} type='submit'>
                            Reset Password
                        </ButtonLarge >
                    </FormButtonContainer>
                </form>
            </Form>
        </FormContainer>
    )
}