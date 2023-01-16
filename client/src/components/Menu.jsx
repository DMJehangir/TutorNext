import React from 'react';
import styled from 'styled-components';
import TutorNext from '../img/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import WebIcon from '@mui/icons-material/Web';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LanguageIcon from '@mui/icons-material/Language';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import FeedIcon from '@mui/icons-material/Feed';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1.5;
  background-color: ${({theme}) => theme.bgMenu};
  height: 100vh;
  color: ${({theme}) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Img = styled.img`
    height: 25px;
`;

const Item = styled.div`
    display: flex;
    align-items:center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px 0px;
    &: hover{
      background-color: ${({theme})=> theme.soft}
    }
`;

const Hr = styled.hr`
    margin: 15px opx;
    border: 0.5px solid ${({theme}) => theme.soft};
`;

const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #aaaaaa;
    margin-top: 10px;
    margin-bottom: 10px;
`;

function Menu({darkMode, setDarkMode}) {

  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Link to='/' style={{textDecoration: "none", color: "inherit"}}>
        <Logo>
            <Img src={TutorNext}/>
            TutorNext
        </Logo>
        <Item><HomeIcon/>Home</Item></Link>
        <Link to="trends" style={{textDecoration: "none", color: "inherit"}}>
        <Item><WhatshotIcon/>Trending</Item></Link>
        <Link to="subscriptions" style={{textDecoration: "none", color: "inherit"}}>
        <Item><CastForEducationIcon/>By Teachers</Item></Link>
        <Hr/>
        <Title>Best of TutorNext</Title>
        <Item onClick={()=> navigate(`/search?q=development`)}><WebIcon/>Development</Item>
        <Item onClick={()=> navigate(`/search?q=trading`)}><CurrencyExchangeIcon/>Trading</Item>
        <Item onClick={()=> navigate(`/search?q=language`)}><LanguageIcon/>Languages</Item>
        <Item onClick={()=> navigate(`/search?q=designing`)}><DesignServicesIcon/>Designing</Item>
        <Item onClick={()=> navigate(`/search?q=news`)}><FeedIcon/>News</Item>
        <Item onClick={()=> navigate(`/search?q=live`)}><LiveTvIcon/>Live</Item>
        <Hr/>
        <Item onClick={()=> setDarkMode(!darkMode)}><DarkModeIcon/>{darkMode? "Light": "Dark"} Mode</Item>
      </Wrapper>
    </Container>
  )
}

export default Menu;