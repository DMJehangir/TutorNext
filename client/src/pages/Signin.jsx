import React, { useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginStart, loginFailure } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({theme})=> theme.text};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({theme})=> theme.bgMenu};
    border: 2px solid ${({theme})=> theme.soft};
    padding: 20px 50px;
    gap: 10px;
`;

const Title = styled.h1`
    font-size: 24px;
    `;
    
const SubTitle = styled.h2`
    font-size: 20px;
    font-weight: 300;
`;

const Input = styled.input`
    border: 1px solid ${({theme})=> theme.soft};
    border-radius: 3px;
    padding: 10px;
    width: 85%;
    background-color: transparent;
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({theme})=> theme.soft};
    color: ${({theme})=> theme.textSoft};
`;

const More = styled.div`
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    color: ${({theme})=> theme.textSoft};
`;

const Links = styled.div`
    margin-left: 50px;
`;

const Link = styled.span`
    margin-left: 30px;
`;

function Signin() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const disPatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        disPatch(loginStart());
        try {
            const res = await axios.post("/auth/signin", {name, password})
            disPatch(loginSuccess(res.data))
            window.location = "/";
        } catch (err) {
            alert('Incorrect Name / Password');
            disPatch(loginFailure());
        }
    };

    const signInWithGoogle = async () => {
        disPatch(loginStart());
        signInWithPopup(auth, provider).then((result) => {
            axios.post('/auth/google',{
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL
            }).then((res)=>{
                disPatch(loginSuccess(res.data));
                window.location = '/';
            })
        })
        .catch((error)=>{disPatch(loginFailure())});
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        disPatch(loginStart());
        try {
            const res = await axios.post("/auth/signup", {name, email, password})
            disPatch(loginSuccess(res.data))
            window.location = "/";
        } catch (err) {
            disPatch(loginFailure());
        }
    };

  return (
    <Container>
        <Wrapper>
            <Title>Sign In</Title>
            <SubTitle>to become a Tutor at TutorNext</SubTitle>
            <Input placeholder='Username' onChange={e=> setName(e.target.value)}/>
            <Input placeholder='Password' type='password' onChange={e=> setPassword(e.target.value)}/>
            <Button onClick={handleLogin}>Sign In</Button>
            <Title>or</Title>
            <Button onClick={signInWithGoogle}>SignIn With Google</Button>
            <Title>or</Title>
            <Input placeholder='Username' onChange={e=> setName(e.target.value)}/>
            <Input placeholder='Email' onChange={e=> setEmail(e.target.value)}/>
            <Input type='password' placeholder='Password' onChange={e=> setPassword(e.target.value)}/>
            <Button onClick={handleSignup}>Sign Up</Button>
        </Wrapper>
        <More>
            English(USA)
            <Links>
                <Link>Help</Link>
                <Link>Privacy</Link>
                <Link>Terms</Link>
            </Links>
        </More>
    </Container>
  )
}

export default Signin