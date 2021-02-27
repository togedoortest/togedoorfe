import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { useConversations } from '../contexts/ConversationsProvider';

// import React from 'react'

// export default function OpenConversation() {
//   return (
//     <div>
// OpenConversation
//     </div>
//   )
// }
//    function Device(props) 
//  // props.match.params.id
// export default withRouter(Device)

 function OpenConversation({match}) {
  const [text, setText] = useState('')
  const[flag,setflag]=useState(false)
              
              


  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation ,conversations} = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      // selectedConversation.recipients.map(r => r.id),
    [match.params.id],
      text
    )
    setText('')
  }
 console.log('OpenConversation ' );
 console.log(conversations);
if(conversations[0])(console.log(conversations[0].ConnectedUserID));


console.log('match.params.id');
console.log(match.params.id);
const getConversationById = ()=>{

  try {
    let ObjWithConversation = conversations.find( ({ConnectedUserID}) => ConnectedUserID == match.params.id);
     // let index = props.listExchange.findIndex(({nametype}) =>  nametype == tybeName);
   var  Messages= ObjWithConversation.Topic.map((topic,index)=>{
    
  return( <div
  //  ref={lastMessage ? setRef : null}
  // topic.substring(10)
   key={index}
   className={`my-1 d-flex flex-column ${topic.substring(0,8)=='@?FX56##' ? 'align-self-end align-items-end' : 'align-items-start'}`}
 >
   <div
     className={`rounded px-2 py-1 ${ topic.substring(0,8)=='@?FX56##' ? 'bg-primary text-white' : 'border'}`}>
     {topic.substring(0,8)=='@?FX56##' ? topic.substring(8,topic.length):topic}
   </div>
   <div className={`text-muted small ${topic.substring(0,8)=='@?FX56##' ? 'text-right' : ''}`}>
     {  topic.substring(0,8)=='@?FX56##' ? 'You' : 'Him'}
   </div>
 </div>
)

})

  } catch (error) {
    console.log(error);
  }
return  Messages ;
}

  
  return (
    <div className="d-flex flex-column flex-grow-1">
 
      <div className="flex-grow-1 overflow-auto">
      
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
      

 
       
  {
  // conversations[0]?(  <div style={{}}> {getConversationById().Topic.map((topic)=><h3>{topic}</h3> )} <br/></div>):'no'}
  conversations[0]?(getConversationById()):'no'}



          {/*
           {
             selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )

          })}
           */}


        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Append>
         
            
           
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
export default withRouter(OpenConversation)