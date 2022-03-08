import { useState, useEffect } from 'react'
import { FaRegUser } from 'react-icons/fa'

import { FormContainer, FormHeading, Form, QueryButton } from '../components/styles/Form.styled'
import { SuccessButton } from '../components/styles/Company.styled'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { name, email, password, passwordConfirm } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("Submit")
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
          <div>
            <SuccessButton type='submit'>
              Submit
            </SuccessButton>
            <QueryButton>
              Already have an account?
            </QueryButton>
          </div>
        </form>
      </Form>
    </FormContainer>
  )
}

export default Register