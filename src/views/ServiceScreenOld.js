import React, { useState, useEffect } from "react";
import Header from "../components/headers/Header";
import "../css/serviceScreen.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Image, Container, Row, Col, Card, Button, Nav } from "react-bootstrap";

import Checkout from "../components/Checkout";
import store from "../store";
//import * as emailjs from 'emailjs-com'
//import { Mailer } from 'nodemailer-react'

const userProfile = store.getState();

const ServiceScreen = ({ match: { params },history }) => {
  const[flag,setflag]=useState(false)
  const { serviceName } = params;
  
  console.log(params);
  const [user, setUser] = useState();
  const [myService, setMyService] = useState();
  const authenticatedUser = store.getState().auth.user;
  console.log('userrr');
  if(authenticatedUser){  console.log(authenticatedUser.email);}

  
  useEffect(() => {
    async function fetchData() {
      //   const response = await axios.get(
    //    // `http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services/name/${serviceName}`
    //     `http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services/${serviceName}`
    //   );
    //   console.log(response.data);
    //   setMyService(response.data);
    //   console.log('serves');
    //   console.log(response.data);
    
////// my code
// axios.get(`http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services/name/${serviceName}`)
// .then((res) => {
  axios.get(`http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services/${serviceName}`)
 .then((res) => {
   //key=res.data[0].Key
//  console.log(res.data[0]);
//setCountry(res.data[0].Country.LocalizedName)
const TempoMyService=res.data

console.log('serv');
console.log(TempoMyService);
setMyService(TempoMyService);

const requestOne =  axios.get(`http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/users/${TempoMyService.userID}`);
//const requestTwo =  axios.get('https://dataservice.accuweather.com/forecasts/v1/daily/5day/'+key+'?apikey=3AGghPNIvajU2IaEQ4wo45rAGGS6TjYD');

//return axios.all([requestOne, requestTwo]);
return axios.all([requestOne]);
})

.then(axios.spread((...res) => {
  const responseOne = res[0]
  // const responseTwo = res[1]
  // validReq=true
  console.log('user one');
  console.log(responseOne);
  // Country: {ID: "IL", LocalizedName: "Israel"}
  ///settemperature(responseOne.data[0].Temperature.Metric.Value)
  //setWeatherText(responseOne.data[0].WeatherText)
  //setdateforecast(responseTwo.data.DailyForecasts)
  setUser(responseOne.data);
  
})).catch(errors => {
  
  // validReq=false
  // alert('Request Error!.\nThe possibility that it is due to the invalid country name!')
  console.log(errors);
})
//////end my code

}
fetchData();
}, []);

// useEffect(() => {
  //   console.log("before myService");
  //   async function fetchUser() {
    //     console.log("fech myService");
    //      if (myService) {
        
      
      //         const response = await axios.get(
  //           `http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/users/${myService.userID}`
  //         );
  //         console.log("myService");
  //         console.log(response);
  
  //         //console.log( myService.userID);
  //         setUser(response.data.firstname);
  //     }
  
  //   }
  //   fetchUser();
  // }, []);

  //send email
  
    
    const handelSubmit=(e)=>{
      e.preventDefault()
    const{FromServes,FromEmail,Title,Message} =e.target.elements 
    console.log(FromServes.value);
   
// you can wright html 
const messageSubject= 'From sarves name: '+ FromServes.value+'  From Email: '+FromEmail.value+' Message Subject: '+ Message.value
    const message={ProviderEmail:user.email,FromEmail:FromEmail.value,Title:Title.value,Message:messageSubject}
    axios
      .post("http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services/mailer", message)
      .then((response) => {
        console.log(response);
        alert('Email Sended ')
      })
      .catch((error) => {
        console.log(error);
      });
 

    console.log('  submitted ')
    }
    
    const DisplayAndHide=()=>{
      ///authenticatedUser
      var userEmail = localStorage.getItem("email");
    if(flag) return( <div>
  
      <form onSubmit={handelSubmit}>
                   <input  onChange={(e)=>{}} className='form-control' type='text' name='FromServes' value= {myService.name} ></input>
                                                                                                                                     {/* user.email */}
                   {/* <input  onChange={(e)=>{}} className='form-control' type='text' name='FromEmail' placeholder=' Name'defaultValue={'anas3506606@gmail.com'} ></input> */}
                   {/* <input style={{display:'none'}} onChange={(e)=>{}} className='form-control' type='text' name='FromEmail' placeholder=' Name'value={userProfile.email} ></input> */}
                  {(authenticatedUser)? <input style={{}} onChange={(e)=>{}} className='form-control' type='text' name='FromEmail' placeholder=' Name'value={userEmail} ></input>:<h4>no Email</h4>}
                   <input  onChange={(e)=>{}} className='form-control' type='text' name='Title' placeholder=' Name'defaultValue={'Title'} ></input>
                   <input  onChange={(e)=>{}} className='form-control' type='text' name='Message' placeholder=' Name'defaultValue={'Subject'} ></input>
                
                  
    <button type='submit' className='btn btn-primary' onClick={() => {}}>Submit</button>
        </form>
      
      </div>)
   }
    //end send email
    
    
    const HandelConnect=()=>{
      
  }
  
  
  

  return (
    <div>
      <Header />
      <Container>
        {myService ? (
          <Row>
            <Col style={{ paddingLeft: "0px" }}>
              <div className="serviceScreen-details">
                <h3 style={{ width: "26em", fontWeight: "650" }}>
                  {myService.name}
                </h3>
                {user ? (
                  <p style={{ color: "#6c757d", paddingLeft: "1em" }}>
                    {user.firstname} 
                  </p>
                  
                ) : (
                <p>{user ? user.firstname : <p>noUser hjere </p>}</p>
                  
                 
                )}
                <Image
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: "360px",
                  }}
                  src={`http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/${myService.serviceImage}`}
                />
                <Card.Text style={{ paddingTop: "10px" }}>
                  Rating :{" "}
                  <span style={{ color: "#ffc107" }}>{myService.rating}</span>
                </Card.Text>
                {authenticatedUser &&
                authenticatedUser._id === myService.userID ? (
                  <Link
                    className="card-block stretched-link text-decoration-none"
                    to={{
                      //pathname: `/edit/${serviceName.split(" ").join("-")}`,
                      pathname: `/edit/${myService._id}`,
                     
                    }}
                  >
                    <Button style={{ float: "right" }}>Edit</Button>
                      </Link>
                 ) : (
                   <p>Cant edit this</p>
                   )} 

                <Card.Text>Price : {myService.price}$</Card.Text>
                <h4 style={{ margin: "20px 0" }}>About this Gig</h4>
                <p>{myService.description}</p>
              { user?( <h2>{ user.firstname}</h2>):(<h2>no user</h2>)}
              <br/>
              { user?( <h3>{ user.email}</h3>):(<h3>no Email</h3>)}

              
              </div>
            </Col>

            <Col
              style={{
                marginLeft: "30em",
                color: "#6c757d",
              }}
            >
              <Card>
                <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                      <Nav.Link
                        style={{
                          color: "#6c757d",
                        }}
                      >
                        Payment
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    Summary
                  </Card.Title>
                  <Card.Text>Total : {myService.price}$</Card.Text>
                  <hr></hr>
                  <Checkout product={myService} />
                  <div>



</div>
{(authenticatedUser &&
                authenticatedUser._id === myService.userID) ?(
<button className='btn btn-danger' onClick={() => {

  axios.delete(`http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services/${serviceName}`)
  .then((res) => {
     history.push('/')
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
  
                      }}>Delete</button>):<h4>can not Delete</h4>}
                </Card.Body>
            <button onClick={() =>{ setflag(!flag)}}>Send Email</button>
                 {DisplayAndHide()}
          
              </Card>
            </Col>
          </Row>
        ) : (
          <h1>Loading ....</h1>
          )}
      </Container>
    </div>
  );
};
ServiceScreen.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(ServiceScreen);
