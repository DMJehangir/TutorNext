import React, { useState } from 'react';
import styled from 'styled-components';
import Upload from './Upload';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({theme})=> theme.bgNav};
  height: 55px;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;
const Search = styled.div`
  width: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1.5px solid #ccc;
  border-radius: 3px;
  color: ${({theme})=> theme.text};
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%;
`;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({theme})=> theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

function NavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("");

  const {currentUser} = useSelector(state=> state.user);
  const disPatch = useDispatch()

  const handleLogout = async (e) => {
    e.preventDefault();
    alert('Do you want to Logout?')
    disPatch(logout())
};

  return (
    <>
      <Container>
        <Wrapper>
          <Search><Input placeholder='Search' onChange={e=> setQ(e.target.value)}/>
            <SearchOutlinedIcon cursor='pointer' onClick={()=> navigate(`/search?q=${q}`)}/></Search>
          {currentUser ? (
            <User>
            <VideoCallOutlinedIcon onClick={()=> setOpen(true)}/>
            <Avatar src={currentUser.img}/>
            {currentUser.name}
            <LogoutIcon onClick={handleLogout}/>
          </User> ):(<Link to="signin" style={{textDecoration: "none"}}>
          <Button><AccountCircleOutlinedIcon/>SIGN IN</Button>
          </Link>)}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen}/>}
    </>
  )
}

export default NavBar
