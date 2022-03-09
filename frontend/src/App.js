import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/Global';
import { Container } from './components/styles/Container.styled'

import Header from "./components/Header";
import Watchlist from './pages/Watchlist'
import Markets from './pages/Markets'
import Portfolio from './pages/Portfolio'
import Register from './pages/Register'
import Search from './pages/Search'
import Login from './pages/Login'
import Company from './pages/Company';
import ForgotPassword from './pages/ForgotPassword';

const theme = {

}

function App() {
  return (
    <ThemeProvider theme = { theme }>
      <>
        <Router>
          <GlobalStyles/>
          <Header/>
          <Container>
            <Routes>
              <Route path='/' element={ <Markets/> }/>
              <Route path='/watchlist' element={ <Watchlist/> }/>
              <Route path='/portfolio' element={ <Portfolio/> }/>
              <Route path='/search' element={ <Search/> }/>
              <Route path='/login' element={ <Login/> }/>
              <Route path='/forgotpassword' element={ <ForgotPassword/> }/>
              <Route path='/register' element={ <Register/> }/>
              <Route path='/company/:ticker' element={ <Company/> }/>
            </Routes>
          </Container>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
