import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/Global';
import { Container } from './components/styles/Container.styled'

import Header from "./components/sharedComponents/Header";
import Watchlist from './pages/Watchlist'
import Crypto from './pages/Crypto'
import Markets from './pages/Markets'
import Portfolio from './pages/Portfolio'
import AddTrade from './pages/AddTrade'
import EditTrade from './pages/EditTrade'
import Register from './pages/Register'
import Search from './pages/Search'
import Login from './pages/Login'
import Company from './pages/Company';
import CryptoCurrency from './pages/CryptoCurrency';
import ForgotPassword from './pages/ForgotPassword';

import Modal from './UI/Modal'


// testing in development
import axios from 'axios'
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:5000';
}

const lightTheme = {
  primary: 'black'
}

const darkTheme = {
  primary: 'white'
}

function App() {

  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    const themeQuery = window.matchMedia('(prefers-color-scheme: light)')
    themeQuery.onchange = () => console.log('changed')
    setCurrentTheme(themeQuery.matches ? 'light' : 'dark')
    themeQuery.addEventListener('change', ({matches}) => {
      setCurrentTheme(matches ? 'light' : 'dark')
    })

  }, [])

  return (
    <ThemeProvider theme = { currentTheme === 'light' ? lightTheme : darkTheme }>
      <>
        <Router>
          <GlobalStyles/>
          <Modal/>
          <Header/>
          <Container>
            <Routes>
              <Route path='/' element={ <Markets/> }/>
              <Route path='/watchlist' element={ <Watchlist/> }/>
              <Route path='/crypto' element={ <Crypto/> }/>
              <Route path='/crypto/:symbol' element={ <CryptoCurrency/> }/>
              <Route path='/portfolio' element={ <Portfolio/> }/>
              <Route path='/addtrade' element={ <AddTrade/> }/>
              <Route path='/addtrade/:ticker' element={ <AddTrade/> }/>
              <Route path='/edittrade/:trade_id' element={ <EditTrade/> }/>
              <Route path='/search' element={ <Search/> }/>
              <Route path='/login' element={ <Login/> }/>
              <Route path='/forgotpassword' element={ <ForgotPassword/> }/>
              <Route path='/register' element={ <Register/> }/>
              <Route path='/company/:ticker' element={ <Company/> }/>
              <Route path='/CryptoCurrency/:symbol' element={ <CryptoCurrency/> }/>
            </Routes>
          </Container>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
