import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import {
  useCollection,
  useDocumentDataOnce,
} from 'react-firebase-hooks/firestore';
import { db } from '../firebaseConfig';
import Message from './Message';

const Chat = () => {
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocumentDataOnce(
    roomId && db.collection('slack-room').doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection('slack-room')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  );
  const chatRef = useRef(null);
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [roomId, loading]);
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.name}</strong>
                <StarOutlineIcon />
              </h4>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {/* list out the messages */}
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            {/* scroll to the bottom by default */}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.name || ''}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 60px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  & > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 20px;
  }
  & > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  & > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  & > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
`;
const ChatMessages = styled.div``;
const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
