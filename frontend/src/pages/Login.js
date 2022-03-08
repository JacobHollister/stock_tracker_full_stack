import { useState, useEffect } from 'react'
import { FiLogIn } from 'react-icons/fi'

import { FormContainer, FormHeading, Form, QueryButton } from '../components/styles/Form.styled'
import { SuccessButton } from '../components/styles/Company.styled'

function Login() {
 const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {

  }

  return (
    <FormContainer>
      <FormHeading>
        <h1>
          <FiLogIn /> Login
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
          <div>
            <SuccessButton type='submit'>
              Login
            </SuccessButton>
            <QueryButton>
              Forgot your password?
            </QueryButton>
          </div>
        </form>
      </Form>
    </FormContainer>
  )
}

export default Login