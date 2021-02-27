import React, { useState, useEffect } from "react";
import Header from "../components/headers/Header";
import "../css/serviceScreen.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Image, Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import Checkout from "../components/Checkout";
import store from "../store";
//import * as emailjs from 'emailjs-com'
//import { Mailer } from 'nodemailer-react'

const userProfile = store.getState();

const ServiceScreen = ({ match: { params }, history }) => {
  const [flag, setflag] = useState(false)
  const { serviceName } = params;

  console.log(params);
  const [user, setUser] = useState();
  const [myService, setMyService] = useState();
  const authenticatedUser = store.getState().auth.user;
  console.log('userrr');
  if (authenticatedUser) { console.log(authenticatedUser.email); }


  useEffect(() => {
    async function fetchData() {
      //   const response = await axios.get(
      //    // ` https://www.togedoortestgo.site/graphql/services/name/${serviceName}`
      //     ` https://www.togedoortestgo.site/graphql/services/${serviceName}`
      //   );
      //   console.log(response.data);
      //   setMyService(response.data);
      //   console.log('serves');
      //   console.log(response.data);

      ////// my code
      // https://www.togedoortestgo.site/graphql/
      // https://www.togedoortestgo.site/graphql/
      // axios.get(` https://www.togedoortestgo.site/graphql/services/name/${serviceName}`)
      // .then((res) => {
      axios.get(` https://www.togedoortestgo.site/graphql/services/${serviceName}`)
        .then((res) => {
          //key=res.data[0].Key
          //  console.log(res.data[0]);
          //setCountry(res.data[0].Country.LocalizedName)
          const TempoMyService = res.data

          console.log('serv');
          console.log(TempoMyService);
          setMyService(TempoMyService);

          const requestOne = axios.get(` https://www.togedoortestgo.site/graphql/users/${TempoMyService.userID}`);
          //const requestTwo =  axios.get('https://dataservice.accuweather.com/forecasts/v1/daily/5day/'+key+'?apikey=3AGghPNIvajU2IaEQ4wo45rAGGS6TjYD');

          //return axios.all([requestOne, requestTwo]);
          return axios.all([requestOne]);
        })

        .then(axios.spread((...res) => {
          const responseOne = res[0]
          // const responseTwo = res[1]
          // validReq=true
          console.log('user one');
          console.log(responseOne.data._di);
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
  //           ` https://www.togedoortestgo.site/graphql/users/${myService.userID}`
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


  const handelSubmit = (e) => {
    e.preventDefault()
    const { FromServes, FromEmail, Title, Message } = e.target.elements
    console.log(FromServes.value);

    // you can wright html 
    const messageSubject = 'From sarves name: ' + FromServes.value + '  From Email: ' + FromEmail.value + ' Message Subject: ' + Message.value
    const message = { ProviderEmail: user.email, FromEmail: FromEmail.value, Title: Title.value, Message: messageSubject }
    axios
      .post(" https://www.togedoortestgo.site/graphql/sendemail/mailer", message)
      .then((response) => {
        console.log(response);
        alert('Email Sended ')
      })
      .catch((error) => {
        console.log(error);
      });


    console.log('  submitted ')
  }

  const DisplayAndHide = () => {
    ///authenticatedUser
    var userEmail = localStorage.getItem("email");
    if (flag) return (<div>

      <form onSubmit={handelSubmit}>
        <input onChange={(e) => { }} className='form-control' type='text' name='FromServes' value={myService.name} ></input>
        {/* user.email */}
        {/* <input  onChange={(e)=>{}} className='form-control' type='text' name='FromEmail' placeholder=' Name'defaultValue={'anas3506606@gmail.com'} ></input> */}
        {/* <input style={{display:'none'}} onChange={(e)=>{}} className='form-control' type='text' name='FromEmail' placeholder=' Name'value={userProfile.email} ></input> */}
        {(authenticatedUser) ? <input style={{}} onChange={(e) => { }} className='form-control' type='text' name='FromEmail' placeholder=' Name' value={userEmail} ></input> : <h4>no Email</h4>}
        <input onChange={(e) => { }} className='form-control' type='text' name='Title' placeholder=' Name' defaultValue={'Title'} ></input>
        <input onChange={(e) => { }} className='form-control' type='text' name='Message' placeholder=' Name' defaultValue={'Subject'} ></input>


        <button type='submit' className='btn btn-primary' onClick={() => { }}>Submit</button>
      </form>

    </div>)
  }
  //end send email


  const HandelConnect = () => {

  }

  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)


  return (
    <div className="serviceScreen-bg">
      <Header />
      <Container>
      
        {myService ? (
          <Row  >
            <Col className="col-8">
              <Card>
                <Card.Header>
                  <h3 style={{ fontWeight: "650", textAlign: "center", color: "#6c757d" }}>
                    {myService.name}
                  </h3>
                  <Row>
                    
                    <Col>
                    <span style={{  fontSize:"large" , color: "black" }}> Name: </span>  {user ? (<p style={{ display:"inline" , textAlign: "center", color: "black" , backgroundColor:"white"}}>{user.firstname}</p>) : (<h2>no user</h2>)}
                    </Col>
                    <Col>
                       <span style={{ fontSize:"large" , color: "black" }}> Email: </span> {user ? (<p style={{ display:"inline" , textAlign: "center", color: "black" , backgroundColor:"white" }}>{user.email}</p>) : (<h3>no Email</h3>)}
                    </Col>

                  </Row>
                </Card.Header>
                <Card.Body>
                <Image
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: "360px",
                  }}
                  src={` https://www.togedoortestgo.site/graphql/${myService.serviceImage}`}
                />
                <Card.Title>
                    <Row>
                      <Col>
                        <h4 style={{ margin: "20px 0" }}>About this Gig</h4>
                      </Col>
                      {authenticatedUser &&
                        authenticatedUser._id === myService.userID ? (
                          <Col style={{ marginTop: "18px"}}>
                            <Link
                              className="card-block stretched-link text-decoration-none"
                              to={{
                                //pathname: `/edit/${serviceName.split(" ").join("-")}`,
                                pathname: `/edit/${myService._id}`,

                              }}
                            >
                              <Button>Edit</Button>

                            </Link>
                          </Col>
                        ) : (
                          <Col>
                            {[...Array(5)].map((star, i) => {
                              const ratingValue = i + 1;
                              return (
                                <label style={{ marginTop: "20px" }}>
                                  <FaStar
                                    className="star"
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                    size={30} />
                                </label>
                              )
                            })}
                          </Col>
                        )}
                    </Row>

                    <p style={{
                      color: "#6c757d",
                    }} >{myService.description}</p>
                  </Card.Title>


                  <Row style={{ borderTop: "1px solid rgba(0,0,0,.125)" }}>
                    <Col>
                      <Card.Text style={{ paddingTop: "10px" }}>
                        Rating :{" "}
                        <span style={{ color: "#ffc107" }}>{myService.rating}</span>
                      </Card.Text>
                    </Col>
                    <Col >
                      <Card.Text style={{ paddingTop: "12px" }}>Price : {myService.price}$</Card.Text>
                    </Col>
                    {(authenticatedUser &&
                      authenticatedUser._id === myService.userID) ? (
                        <Col>
                          <FaTrashAlt size="20px" style={{ marginTop: "15px", cursor: "pointer" }} onClick={() => {

                             axios.delete(` https://www.togedoortestgo.site/graphql/services/${serviceName}`) 
                              .then((res) => {
                                history.push('/')
                                console.log(res);
                              }).catch((err) => {
                                console.log(err);
                              })

                          }}>Delete</FaTrashAlt>
                        </Col>) : <p></p>}
                        </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-4"
              style={{

                color: "#6c757d",
              }}
            >
              <Card style={{
                marginTop: "10em",
              }}>
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

                </Card.Body>
                <button onClick={() => { setflag(!flag) }}>Send Email</button>
                {DisplayAndHide()}
            {/* <button className='btn btn-dark' onClick={() => {}}>Conect Seller</button>  */}
            {user?<Link className='btn btn-dark' to={'/chat/'+ user._id }> Conect Seller </Link>:'on'}


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
