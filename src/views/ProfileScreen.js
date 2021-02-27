import React, { useState, useEffect } from "react";
import Header from "../components/headers/Header";
import { Form, Card, Button, Image, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ServiceItem from "../components/ServiceItem";
import "../css/profileScreen.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import store from "../store";
import Spinner from "../components/spinner/Spinner";



const ProfileScreen = ({history}) => {
  const [services, setServices] = useState();
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  // const user = store.getState().auth.user;
  const  [ user, setUser] = useState([]);
  const temp = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  // const [formData, setFormData] = useState({
  //   firstname: user.firstname,
  //   lastname: user.lastname,
  //   email: user.email,
  //   address: user.address,
  //   password: user.password,
  //   picture:null
  // });

  const authenticatedUser = store.getState().auth.user;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(` https://www.togedoortestgo.site/graphql/users/email/${localStorage.email}`);
      setUser(response.data);
    }
  
    fetchData();
  }, [user]);

  console.log("user : ", user);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(` https://www.togedoortestgo.site/graphql/services`);
      setServices(response.data);
    }

    fetchData();
  }, []);

  // const updatePicture = async e => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   axios.post(` https://www.togedoortestgo.site/graphql/users/${user._id}`,formData) 


  //   .then((response) => {
  //      console.log(response);
  //      history.push('/')
  //    })
  //    .catch((error) => {
  //      console.log(error);
  //    })}
 
  const onChangefile = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    //console.log(e.target.file[0]);
    // setformData2(formData)
  };

  const onSubmitFile = async e => {
    // debugger;
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append("user", JSON.stringify(user));
    // var config1 = {
    //   headers: { 
    //    'Content-Type': 'multipart/form-data'
    //   ,
    //    'Authorization':user.auth.token
    //     }}
    
    axios.patch(` https://www.togedoortestgo.site/graphql/users/uploadfile`, formData )

    
      .then((response) => {
        console.log(response);
        console.log(file);
        history.push('/profile')
        setFilename("")

      })
      .catch((error) => {
        console.log(error);
      })
  }



  return (
    <div className="profile-bg">
      <Header />
      {user ? (
        <Row>
          <Col style={{ paddingRight: 0 }}>
            <Card
              style={{
                width: "25rem",
                height: "29rem",
                margin: "1.5em 6em",
                textAlign: "center",
              }}
            >
              {(authenticatedUser &&
                       authenticatedUser.picture === temp) ? (
              <Image
                style={{
                  width: "40%",
                  objectFit: "cover",
                  height: "35%",
                  margin: "1em 7.7em",
                }}
                roundedCircle
                src={user.picture}
              /> ):(authenticatedUser &&
                authenticatedUser.userType === "Local User") ? (
                   <Image
                style={{
                  width: "40%",
                  objectFit: "cover",
                  height: "35%",
                  margin: "1em 7.7em",
                }}
                roundedCircle
                src={` https://www.togedoortestgo.site/graphql/${user.picture}`}
              />):( <Image
                style={{
                  width: "40%",
                  objectFit: "cover",
                  height: "35%",
                  margin: "1em 7.7em",
                }}
                roundedCircle
                src={user.picture}
              />)}
              <Card.Body>
                <Card.Title>
                  {user.firstname} {user.lastname}
                </Card.Title>
                <Card.Text>{user.email}</Card.Text>
                
                {(authenticatedUser &&
                      authenticatedUser.userType === "Local User") ? (
                        <Col >
                        <Form.Control 
                         nSubmit={onSubmitFile}
                        />
                         <input
          
                  type='file'
                  className='custom-file-input'
                  id='customFile'
                  onChange={onChangefile}
                />  
                <label className='custom-file-label' htmlFor='customFile' >
                 {filename}
                     </label>
                     <Button
                  style={{ border: "0.5px solid #ccc", width: "20em" ,marginBottom:"5px"}}
                  variant="gray"
                  onClick={onSubmitFile}
                >
                  Change Your Picture
                 
                </Button>
                      </Col>       
                 
                 ):(
                  <p></p>
                )}
                  <Button className="btnJoinus" variant="info" href="#/create">
                     Post a Gig
                  </Button>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "25rem",
                height: "25rem",
                margin: "1.5em 6em",
                marginRight: "0px",
                textAlign: "left",
              }}
            >
              <Card.Header as="h5">About</Card.Header>
              <Card.Body>
                <Card.Text>
                  I am {user.firstname} 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ paddingLeft: "0" ,marginTop:"25px"}} xs={4} md={7}>
            <Container>
              <Row>
                {services &&
                  user &&
                  services
                    .filter((service) => service.userID === user._id)
                    .map((service, index) => (
                      <ServiceItem
                        key={index}
                        _id={service._id}
                        name={service.name}
                        serviceImage={service.serviceImage}
                        description={service.description}
                        price={service.price}
                        rating={service.rating}
                        firstname={service.userName}
                      />
                    ))}
              </Row>
            </Container>
          </Col>
        </Row>
      ) : (
          <Spinner />
        )}
    </div>
  );
};

ProfileScreen.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(ProfileScreen);
