import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { FormContainer, FormHeading, Form, QueryButton } from '../components/styles/Form.styled'
import { SuccessButton } from '../components/styles/Company.styled'
import { FiLogIn } from 'react-icons/fi'


function ForgotPassword() {
    
    const [formData, setFormData] = useState({
        email: '',
    })

    const {email} = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    
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
                    <div>
                        <SuccessButton type='submit'>
                            Reset Password
                        </SuccessButton>
                    </div>
                </form>
            </Form>
        </FormContainer>
    )
}
    
export default ForgotPassword
