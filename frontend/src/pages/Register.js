import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import { FaRegUser } from 'react-icons/fa'
import Loader from '../components/Loader'
import { FormContainer, FormHeading, Form, QueryButton, FormButtonContainer } from '../components/styles/Form.styled'
import { ButtonLarge } from '../components/styles/UI.styled'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { name, email, password, passwordConfirm } = formData

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
    
    if (password !== passwordConfirm) {
      console.log("passwords do not match")
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <FormContainer>
      <FormHeading>
        <h1>
          <FaRegUser /> Register
        </h1>
        <p>Please create an account</p>
      </FormHeading>

      <Form>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
          />
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
          <input
            type='password'
            id='passwordConfirm'
            name='passwordConfirm'
            value={passwordConfirm}
            placeholder='Confirm password'
            onChange={onChange}
          />
          <FormButtonContainer>
            <ButtonLarge color={'success'} type='submit'>
              Submit
            </ButtonLarge>
            <QueryButton onClick={() => navigate('/login')}>
              Already have an account?
            </QueryButton>
          </FormButtonContainer>
        </form>
      </Form>
    </FormContainer>
  )
}

export default Register