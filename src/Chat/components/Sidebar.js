import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import { useConversations } from '../contexts/ConversationsProvider'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
const { sendMessage, selectedConversation,conversations} = useConversations()
  const conversationsOpen = activeKey === CONVERSATIONS_KEY
  
  function closeModal() {
    setModalOpen(false)
  }
  console.log('conversations from side bar');
  console.log(conversations); 


  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>

      {/* { selectedConversation? (selectedConversation.messages.map((item,i)=>{
        console.log(item.sender);
        return (<h3 key={i}> {item.sender}</h3>)
      })):<h4>no</h4>
    }   */}
      
          
          {conversations[0] ?<Conversations />:'no conn'}
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
       

        
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button onClick={() => setModalOpen(true)} className="rounded-0">
          New {conversationsOpen ? 'Conversation' : 'Contact'}
        </Button>
      </Tab.Container>
    
      
      <Modal show={modalOpen} onHide={closeModal}>
       
        {conversationsOpen ?
          <NewConversationModal closeModal={closeModal} /> :
        <NewContactModal closeModal={closeModal} />
         
        }
       
      </Modal>
    </div>
  )
}
