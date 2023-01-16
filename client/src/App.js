import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu.jsx';
import NavBar from './components/NavBar.jsx';
import {darkTheme, lightTheme} from './utils/Theme.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Video from './pages/Video.jsx';
import Signin from './pages/Signin.jsx';
import Search from './pages/Search.jsx';
import "./App.css";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 6.5;
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true)
  let clr;
  if(darkMode === true){
    clr = "img"
  }else{
    clr = "img2"
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
     <Container>
        <BrowserRouter BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main className={clr}>
            <NavBar/>
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home type="random"/>}/>
                  <Route path='trends' element={<Home type="trend"/>}/>
                  <Route path='subscriptions' element={<Home type="sub"/>}/>
                  <Route path='search' element={<Search/>}/>
                  <Route path='signin' element={<Signin />}/>
                  <Route path='video'>
                    <Route path=':id' element={<Video />}/>
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
     </Container>
    </ThemeProvider>
  );
}

export default App;
