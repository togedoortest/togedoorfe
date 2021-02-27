import React, { useState } from "react";
import "../css/registerScreen.css";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { registerUser } from "../redux/auth/thunks";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import { FaFacebook, FaFacebookF } from "react-icons/fa";
import RegisterRight from "../uploads/register-right.jpg";
// // or
// import { GoogleLogin } from 'react-google-login';

import RegistrationScreen from "../uploads/registrationScreen.jpg";

const RegisterScreen = ({ registerUser, isAuthenticated }) => {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    password: "",
    password2: "",
    picture:"https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  });

  const { firstname, lastname, address, email, password, password2 ,picture} = formData;

  // const responseSuccessGoogle = (response) => {
  //   console.log(response);
  //   // axios({
  //   //   method: "POST",
  //   //   url: " https://www.togedoortestgo.site/graphql/users/signup",
  //   //   data: { tokenId: response.tokenId }
  //   // }).then(response => {
  //   //   console.log(response)
  //   // }) 
  //   ////// connect to DB {Emad}
  // }

  // const responseErrorGoogle = (response) => {

  // }

  // const responseFacebook = (response) => {
  //   console.log(response);
  // }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    if (password !== password2) {
    } else {
      registerUser({ firstname, lastname, email, address, password ,picture});
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-window">
          <Link to="/" id="register-brand">
          <img 
           id="img-Logo"
           height="50"
          src="https://static.wixstatic.com/media/8d6fde_4ca895424eaf43f6a56e6bdeef5f2d14~mv2.png/v1/crop/x_0,y_0,w_664,h_211/fill/w_245,h_71,al_c,q_85,usm_0.66_1.00_0.01/TogeDOOR_edited.webp"  />
          </Link>
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="firstname"
              ref={register({ required: true, minLength: 2 })}
              type="text"
              onChange={onChange}
              placeholder="First Name"
              autoComplete="off"
              
            />
            {errors.firstname && errors.firstname.type === "required" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                This is required
              </p>
            )}
            {errors.firstname && errors.firstname.type === "minLength" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                Min length of 2
              </p>
            )}

            <input
              name="lastname"
              type="text"
              onChange={onChange}
              ref={register({ required: true, minLength: 2 })}
              placeholder="Last Name"
              autoComplete="off"
            />
            {errors.lastname && errors.lastname.type === "required" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                This is required
              </p>
            )}
            {errors.lastname && errors.lastname.type === "minLength" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                Min length of 2
              </p>
            )}

            <input
              name="email"
              type="email"
              onChange={onChange}
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
              })}
              placeholder="Email"
              autoComplete="off"
            />
            {errors.email && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "43%",
                }}
              >
                Invalid email address
              </p>
            )}

            <input
              name="address"
              type="text"
              onChange={onChange}
              ref={register({ required: true, minLength: 2 })}
              placeholder="Address"
              autoComplete="off"
            />

            {errors.address && errors.address.type === "required" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                This is required
              </p>
            )}
            {errors.address && errors.address.type === "minLength" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                Min length of 8
              </p>
            )}

            <input
              name="password"
              onChange={onChange}
              type="password"
              ref={register({
                required: true,
                minLength: 8,
              })}
              placeholder="Password"
              autoComplete="off"
            />

            {errors.password && errors.password.type === "required" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                This is required
              </p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                Min length of 8
              </p>
            )}

            <input
              name="password2"
              onChange={onChange}
              type="password"
              ref={register({ required: true, minLength: 8 })}
              placeholder="Confirm Password"
            />

            {errors.password2 && errors.password2.type === "required" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                This is required
              </p>
            )}
            {errors.password2 && errors.password2.type === "minLength" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                Min length of 8
              </p>
            )}

            {password !== password2 && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "41%",
                }}
              >
                Password doesnt match
              </p>
            )}
            <Button formNoValidate="true" type="submit" className="register-button">
              Register Now!
            </Button>

          </form>
        </div>
        <div className="register-content" style={{
            backgroundImage: `url(${RegisterRight})`,
          }}>
          <div className="register-headline-content" >
            <h1 id="register-content-title" style={{color:"white"}}>
              Let's find you the perfect digital job
            </h1>
            <p className="register-content-text"  style={{color:"white"}}>
              Create your Digital Profile to start seeing suggested jobs based
              on your skills. Your profile is private and you use it to apply
              for jobs with one click.
            </p>
          </div>
          <p className="register-content-text"  style={{color:"white"}} >Already got an account ?</p>
          <Button
            href="#/login"
            formNoValidate="true"
            type="submit"
            className="content-login-button"
          >
           <span  style={{color:"black"}}> Login Now! </span>
          </Button>
          {/* <div>
            <GoogleLogin
              clientId="64968895577-kgjuicnn7kdtc1jfq69at0t1nijj3f92.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              icon="fa-facebook-square"
              cookiePolicy={'single_host_origin'}
            />
          </div><br/>
          <div  >
            <FacebookLogin
           style ={{
            fontSize: "12px",
           }}
              icon="fa-facebook"
              appId="394386971840074"
              autoLoad={true}
              cssClass="kep-login-facebook metro"
              fields="name,email,picture"
              callback={responseFacebook}
              />
          </div> */}
        </div>
      </div>
    </div>
  );
};
RegisterScreen.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});



export default connect(mapStateToProps, { registerUser })(RegisterScreen);
