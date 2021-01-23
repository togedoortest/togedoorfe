import React, { Fragment, useState } from "react";
import "../css/loginScreen.css";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../redux/auth/thunks";
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'



import Student1 from "../uploads/student1.jpg";
const LoginScreen = ({ login, isAuthenticated }) => {
  const { register, handleSubmit, errors } = useForm();
  const [isAuthenticatedGoogle, setisAuthenticatedGoogle] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const responseFacebook = (response) => {
    console.log(response);
  }

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    login(email, password);
  };

  //google..

  const responseGoogle = (response) => { ApiGoogle(response) }


  function ApiGoogle(response) {

    //loginGoogle("fgd")
    axios.post('http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services/googlelogin', { tokenId: response.tokenId }).then((res) => {
      console.log('res token :');
      setisAuthenticatedGoogle(true)
      console.log(res);
      let token = res.data
      //const setAuthToken = (token) => {
      if (token) {
        console.log('set token email');
        console.log(response.profileObj.email);
        var x = localStorage.getItem("token");
        //loginGoogle(token)
        //api.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("token", token);
        localStorage.setItem("email", response.profileObj.email);
        window.location.reload(false);

      } else {
        //delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        console.log("deleted token");
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }




  //end google


  // const responseSuccessGoogle = (response)=>{
  //   console.log(response);
  // }

  // const responseErrorGoogle = (response)=>{

  // }

  if (isAuthenticatedGoogle) {
    return <Redirect to="/" />;
  }
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-content"  style={{
            backgroundImage: `url(https://static.wixstatic.com/media/8d6fde_5cc22198bf2d41878bb7f727fababd1d~mv2.jpg/v1/fill/w_1899,h_678,al_c,q_85,usm_0.66_1.00_0.01/8d6fde_5cc22198bf2d41878bb7f727fababd1d~mv2.webp)`,
           
          }}>
            <Link to="/" id="login-brand">
            <img
              id="img-Logo"
              height="50"
              src="https://static.wixstatic.com/media/8d6fde_4ca895424eaf43f6a56e6bdeef5f2d14~mv2.png/v1/crop/x_0,y_0,w_664,h_211/fill/w_245,h_71,al_c,q_85,usm_0.66_1.00_0.01/TogeDOOR_edited.webp" />
          </Link>
          <h1 id="content-title" >How It Works?</h1>
          <div className="headline-content" >
            <h3 id="titel-gigs">Your Gigs Journey</h3>
            <div className="gigs-container container">
              <div className="row row-gig">
            <div className="col-x-6 gig-provider">
              <p className="gig-provider-title">Gig Provider</p> 
              <p className="gigs-works">1.  Register</p> 
              <p className="gigs-works">2.  Post gigs</p> 
              <p className="gigs-works">3.  Approve Submitters</p> 
            </div>
            <div  className="col-x-6 gig-submitter">
              <p className="gig-submitter-title" >Gig Submitter</p>  
              <p className="gigs-works">1.  Register</p> 
              <p className="gigs-works">2.  Review gigs</p> 
              <p className="gigs-works">3.  Apply for gigs</p> 
            
            </div>
            </div>
            </div>
            {/* <h1 id="content-title">Get exclusive jobs to Atlantis</h1>
            <p>
              We are in the proccess of developing our online platform, where
              we aim to make the concept as user-friendly as possible. We
              therefore send out jobs continuously, focusing on the good
              customer contact.
              </p> */}
          </div>
        </div>
        <div className="login-window" >
          <div className="create-profile-div">
            <Link to="/register">Don't have an account ?</Link>
            <Button href="/register" id="create-button">
              Create Profile
              </Button>
          </div>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
              name="password"
              type="password"
              onChange={onChange}
              ref={register({ required: true, minLength: 8 })}
              placeholder="Password"
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
            <Button formNoValidate="true" type="submit" className="login-button">
              Log in
              </Button>
            <div>
              {/* <GoogleLogin
                clientId="64968895577-kgjuicnn7kdtc1jfq69at0t1nijj3f92.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
              /> */}
              <GoogleLogin
                className="google-btn"
                clientId="584638914485-2tdlq9omj9crtfevmucsj5d0rq6v90nt.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}

              />


            </div><br />
            <div className="facebook-login-btn ">
              <FacebookLogin
                cssClass="kep-login-facebook metro"
                appId="394386971840074"
                autoLoad={true}
                fields="name,email,picture"
                icon="fa-facebook-square"
                callback={responseFacebook} />
            </div>
            <Link id="forget-Password">Forgot Password ?</Link>
          </form>
        </div>
      </div>
      </div>
    </Fragment >
  );
};

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginScreen);
