import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useConversations } from '../contexts/ConversationsProvider';

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()

  // useEffect(() => {
  //   async function fetchData() {
  //     const id= localStorage.getItem("id");
  //     try {
  //       const response = await axios.get(" https://www.togedoortestgo.site/graphql/users/"+conversation.ConnectedUserID);
  //       setConversationAndID(response.data.conversations)
  //       // console.log('response.conversations');
  //       // console.log(response.data.conversations);
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   }
  //   fetchData();
  // }, []);
  return (
    <ListGroup variant="flush">

{/* Conversations comp */}

      { 
      conversations[0]? (conversations.map((conversation, index) => (
   <Link to={'/chat/'+conversation.ConnectedUserID}>   
   
    <ListGroup.Item
          key={index}
          action
          
          
          // onClick={() => selectConversationIndex(index)}
          // active={conversation.selected}
        >
          {/* {conversation.recipients.map(r => r.name).join(', ')} */}
          {/* {conversation.map(r => r.ConnectedUserID )} */}
          {conversation.firstname}
        </ListGroup.Item></Link>
      ))):'no con'
      
      }

    </ListGroup>
  )
}
