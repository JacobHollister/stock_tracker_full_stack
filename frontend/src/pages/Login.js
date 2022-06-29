// Package imports
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'

// Components
import Loader from '../components/sharedComponents/Loader'

// Styled Components
import { 
  FormContainer, FormHeading, 
  Form, 
  QueryButton, 
  FormButtonContainer 
} from '../components/styles/Form.styled'
import { ButtonLarge } from '../components/styles/UI.styled'

// Assets / Icons
import { FiLogIn } from 'react-icons/fi'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      console.log("no user or password")
    } else {
      const userData = {
        email,
        password
      }

      dispatch(login(userData))
    }
  }

  if(isLoading) {
    return <Loader/>
  }

  return (
    <FormContainer>
      <FormHeading>
        <h1>
          <FiLogIn /> Sign in
        </h1>
        <p>Please login to access application</p>
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
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
          <FormButtonContainer>
            <ButtonLarge color={'warning'} type='submit' onClick={() => {setFormData({email: 'sample@google.com', password: 'testing'})}}>
              Test User
            </ButtonLarge>
            <ButtonLarge color={'success'} type='submit'>
              Login
            </ButtonLarge>
            <QueryButton onClick={() => navigate('/forgotpassword')}>
              Forgot your password?
            </QueryButton>
          </FormButtonContainer>
        </form>
      </Form>
    </FormContainer>
  )
}