import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
    width: ${(props)=> props.type !== "sm" && "280px"};
    margin-bottom: ${(props)=> props.type === "sm"? "10px" : "25px"};
    cursor: pointer;
    display: ${(props)=> props.type === "sm" && "flex"};
    gap: 10px;
`;

const Image = styled.img`
    width: 100%;
    height: ${(props)=> props.type === "sm"? "120px" : "170px"};
    background-color: #999;
    border-radius: 8%;
    cursor: pointer;
    flex: 1;
`;

const Details = styled.div`
    display: flex;
    margin-top: ${(props)=> props.type !== "sm" && "5px"};
    gap: 10px;
    flex: 1;
`;

const ChannelImg = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props)=> props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({theme})=> theme.text};
`;

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({theme})=> theme.textSoft};
    margin: 3px 0px;
`;

const Info = styled.div`
    font-size: 13px;
    color: ${({theme})=> theme.textSoft};
`;

function Card({type, video}) {

  const [channel, setChannel ] = useState({});

  useEffect(() => {
   const fetchChannel = async ()=>{
     const res = await axios.get(`/users/find/${video.userId}`)
     setChannel(res.data)
   }
   fetchChannel();
  }, [video.userId])

  return (
    <Link to={`/video/${video._id}`} style={{textDecoration: "none"}}>
    <Container type={type}>
      <Image type={type}
              src={video.imgUrl}/>
      <Details type={type}>
        <ChannelImg type={type}
                    src={channel.img}/>
        <Texts>
          <Title>{video.title}</Title>
          <ChannelName>{channel.name}</ChannelName>
          <Info>{video.views} views • {format(video.createdAt)}</Info>
        </Texts>
      </Details>
    </Container>
    </Link>
  )
}

export default Card
