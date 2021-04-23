import { Button } from '@material-ui/core';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebaseConfig';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatInput = ({ chatRef, channelName, channelId }) => {
  const [user] = useAuthState(auth);
  const inputRef = useRef(null);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }
    db.collection('slack-room').doc(channelId).collection('messages').add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
    inputRef.current.value = '';
  };
  return (
    <ChatInputContainer>
      <form>
        <input ref={inputRef} placeholder={`Message #${channelName}`} />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  & > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  & > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    outline: none;
    padding: 20px;
    border-radius: 3px;
  }
  & > form > button {
    display: none;
  }
`;
