import React from 'react'
import * as emailjs from 'emailjs-com'
//  
function SendEmail () {

      const [errorName, seterrorName] = useState('')
     const [errorID, setErrorID] = useState('')
     const [errorEmail, setErrorEmail] = useState('')
        const [errorPsW, setErrorPsW] = useState('')
         
 const validName=(name)=>{
 let validname=false
   
if(!(name.length<1)){
    seterrorName('')
        let re =  /[0-9]/g
  if(!re.test(name)&&name.length>=3){validname=true
    seterrorName('')
}else{
    seterrorName('input muss be string and at least 3 chars')
    validname=false}}else{seterrorName('name is required')}

         console.log('name'+ validname);
            
     return  validname
 }

 const validID=(numID)=>{
     let valid = false
     if(!(numID<1)){
        setErrorID('')
        valid = true
    if (numID.length == 9){
        for (let i=0; i<9; i++){
            if (!(numID.charAt(i)>='0' && numID.charAt(i)<='9')){
                setErrorID('ID must be 9 numbers')
                valid=false;
                break;
            }
        }
    }
    else{
        setErrorID('ID must be 9 numbers')
        valid=false;
    }
    
    
    
}else{ setErrorID('ID is required')
valid=false;}
console.log(valid)
return valid }

 const validEmail=(email)=> {
     let validEmail= false
if(!email.length<1){
                var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
               if(re.test(email))
                {setErrorEmail('')
               validEmail= true}
               else{setErrorEmail('email is invalid')
               validEmail= false}
           }
           else{setErrorEmail('Email is required')
           validEmail=false}
    console.log( 'email '+ validEmail);
return  validEmail }

const validPassword=(psw)=> {
let validPsw=false
if(!psw<1){
                var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    
                if(strongRegex.test(psw)) {
                    setErrorPsW('')
                    validPsw=true
                } else{validPsw=false
                    setErrorPsW('Password is invalid')}
         
         console.log( 'password '+ validPsw); 

    }else{validPsw=false
        setErrorPsW('Password is required')}
return validPsw  }
const handelSubmit=(e)=>{
    e.preventDefault()
  const{name,id,email,Password} =e.target.elements 
  validName(name.value)
  validID(id.value)
  validEmail(email.value)
  validPassword(Password.value)
  if(validName(name.value)&&validID(id.value)&&validEmail(email.value)&&validPassword(Password.value))
console.log('  submitted ')
}



    return (
        <div className='container' >

        <form onSubmit={handelSubmit}>
                 <input  onChange={(e)=>{validName(e.target.value)}} className='form-control' type='text' name='name' placeholder=' Name' maxLength='8' ></input>
                 <h3>{errorName}</h3>
                 <input onChange={(e)=>{validID(e.target.value)}} className='form-control' type='text' name='id' placeholder='  ID'maxLength='9' ></input>
                 <h3>{errorID}</h3>
                 <input onChange={(e)=>{validEmail(e.target.value)}} className='form-control' type='text' name='email' placeholder='  Email'></input>
                 <h3>{errorEmail}</h3>
                 <input onChange={(e)=>{validPassword(e.target.value)}} className='form-control' type='password' name='Password' placeholder=' Password'></input>
                 <h3>{errorPsW}</h3>
                
 <button type='submit' className='btn btn-primary' onClick={() => {}}>Submit</button>
      </form>
        </div>
        
    )
}
export default SendEmail