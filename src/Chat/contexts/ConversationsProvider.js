import axios from 'axios';
import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const [ConversationAndID, setConversationAndID] = useState([])


  const { contacts } = useContacts()
  const socket = useSocket()

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    // setConversations(prevConversations => {
    //   let madeChange = false
    //   const newMessage = { sender, text }
    //   const newConversations = prevConversations.map(conversation => {
    //     if (arrayEquality(conversation.recipients, recipients)) {
    //       madeChange = true
    //       return {
    //         ...conversation,
    //         messages: [...conversation.messages, newMessage]
    //       }
    //     }

    //     return conversation
    //   })

    //   if (madeChange) {
    //     return 
        
    //   } else {
    //     return [
    //       ...prevConversations,
    //       { recipients, messages: [newMessage] }
    //     ]
    //   }
    // })
    setConversationAndID(text)
    // console.log('text');
    // console.log(text);
  // }, [setConversations])
}, [])


  useEffect(() => {
    async function fetchData() {
      const id= localStorage.getItem("id");
      try {
        const response = await axios.get(" https://www.togedoortestgo.site/graphql/users/"+id);
        setConversationAndID(response.data.conversations)
        // console.log('response.conversations');
        // console.log(response.data.conversations);
        //  https://www.togedoortestgo.site/graphql/
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)
  
console.log('anas ggggg');
    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  function sendMessage(recipients, text) {
    socket.emit('send-message', { recipients, text })

    // addMessageToConversation({ recipients, text, sender: id })
  }

  // const formattedConversations = conversations.map((conversation, index) => {
  //   const recipients = conversation.recipients.map(recipient => {
  //     const contact = contacts.find(contact => {
  //       return contact.id === recipient
  //     })
  //     const name = (contact && contact.name) || recipient
  //     return { id: recipient, name }
  //   })

  //   const messages = conversation.messages.map(message => {
  //     const contact = contacts.find(contact => {
  //       return contact.id === message.sender
  //     })
  //     const name = (contact && contact.name) || message.sender
  //     const fromMe = id === message.sender
  //     return { ...message, senderName: name, fromMe }
  //   })
    
  //   const selected = index === selectedConversationIndex
  //   return { ...conversation, messages, recipients, selected }
  // })




  const value = {
    // conversations: formattedConversations,
    conversations: ConversationAndID,
    selectedConversation:'val test',
    // selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  }
  
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
// console.log(value);

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}