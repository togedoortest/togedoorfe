import React, { useContext, useEffect, useState } from "react";
import Router from "./Router";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./redux/auth/thunks";
import setAuthToken from "./redux/utils/setAuthToken";
// import { SocketProvider } from '../contexts/SocketProvider';
import axios from 'axios'
import io from 'socket.io-client'
import { SocketProvider } from "./Chat/contexts/SocketProvider";
// const SocketContext = React.createContext()

// export function useSocket() {
//   return useContext(SocketContext)
// }


const App = () => {
//   const [socket, setSocket] = useState()

  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

//   var Email = localStorage.getItem("email");
//   // var iduser='null'
//   useEffect(() => {
    
//     async function fetchData() {
//       const response = await axios.get(` https://www.togedoortestgo.site/graphql/users/email/${Email}`);
//       const id2=response.data._id
//       console.log('soket useEffct');
//       const newSocket = io(
//         ' https://www.togedoortestgo.site/graphql/',{
//         withCredentials: true,
//         extraHeaders: {
//           "my-custom-header": "abcd"
//         },
//         query: { id2 } 
//       }
//         )
//         console.log('id user');
//         console.log(id2);
//        setSocket(newSocket)
      
//       // return () => newSocket.close()
  
// }
  
//      fetchData();
//   }, [])

  return (
     <SocketProvider id={'di pro'}> 
    <Provider store={store}>
      <Router />
    </Provider>
    </SocketProvider> 
  );
};




export default App;
