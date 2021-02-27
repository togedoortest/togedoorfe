import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()
const id2= localStorage.getItem("id");
  useEffect(() => {
    console.log('soket useEffct');
    const newSocket = io(
      'https://www.togedoortestgo.site/',{
        'path': '/graphql/socket/',
        // ' https://www.togedoortestgo.site/graphql/',{
          // https://www.togedoortestgo.site/graphql/
        //  https://www.togedoortestgo.site/graphql/
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      },
      query: { id2 } 
    }
      )
      console.log(id2);
    setSocket(newSocket)

    // return () => newSocket.close()
  }, [id])





  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
