import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Comment from './Comment';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div`
`
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({theme})=> theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100px;
`
const Button = styled.button`

`;

function Comments({videoId}) {

  const {currentUser} = useSelector((state)=> state.user);

  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const fetchComments = async ()=> {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId])
  
  const handleComment = async (e) => {
    try {
      await axios.post('/comments',{desc, videoId})
    } catch (err) {}
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img}/>
        <Input value={desc} placeholder='Add a Comment...' onChange={(e)=> setDesc(e.target.value)}/>
        <Button onClick={handleComment}>Post</Button>
      </NewComment>
        {comments.map(comment=> (
          <Comment key={comment._id} comment={comment}/>
        ))}
    </Container>
  )
}

export default Comments
