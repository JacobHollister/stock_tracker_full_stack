import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400;1,500&display=swap');


    * {
        box-sizing: border-box;
        font-family: Roboto, Arial, Helvetica, sans-serif;
    }

`
export default GlobalStyles