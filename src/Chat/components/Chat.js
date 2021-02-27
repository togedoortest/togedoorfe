import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import { withRouter } from 'react-router-dom';
import Header from '../../components/headers/Header';

function Chat({ match: { params }}) {
  // const [id, setId] = useLocalStorage('id')
  // const { serviceName } = params;
  const id= localStorage.getItem("id");
  console.log('par');
  console.log(params);
  const dashboard = (
    <SocketProvider id={id}>
      <Header />
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    // id ? dashboard : <Login onIdSubmit={setId} />
    id ? dashboard : <Login onIdSubmit={id} />
  )
}

export default withRouter(Chat);

 
