import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/Global';
import Header from "./components/Header";

const theme = {


}

function App() {
  return (
    <ThemeProvider theme = { theme }>
      <>
        <GlobalStyles/>
        <Header/>



      </>
    </ThemeProvider>
  );
}

export default App;
