import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import axios from "axios";
import store from "../../store";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../css/carousel.css";

import First from "../../uploads/ben-white.jpg";
import Second from "../../uploads/neonbrand.jpg";
import Third from "../../uploads/alesia-kazantceva.jpg";
import Fourth from "../../uploads/emile-perron.jpg";

const CarouselBanner = (props) => {
  const user = store.getState().auth.user;
  if(user){localStorage.setItem("email", user.email);}
  
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div style={{ marginLeft: "1em", marginBottom: "3em"}}>
      <Row>
        <Col
          lg={2}
          sm={4}
          md={4}
          xs={4}
          style={{
            background:" linear-gradient(to bottom, #0c010a, #5c525c )" ,
            textAlign: "center",
            paddingTop: "3em",
            paddingBottom: "1em",
            color:"white"
          }}
        >
         
          {user ? (
            <div>
            <p style={{ fontSize: "1.5em" }}>Hi {user.firstname} </p> 
            <p>Get offers from sellers</p>
            <p>for your project</p>
            <Button className="btnJoinus" variant="info" href="#/create">
            Post a Gig
          </Button>
            </div>
          ) : (
            <div>
            <p style={{ fontSize: "1.5em" }}>Hi there</p>
            <p>Get offers from sellers</p>
            <p>for your new project please</p>
            <Button variant="info" className="btnJoinus" href="#/register">
            Join us
            </Button>
            </div>
          )}
        </Col>
        <Col lg={10} sm={8} md={8} xs={8} className="img-homepage">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img height="300" src={First} alt="Influencer" />
              <Carousel.Caption className="homepage_carousel_text">
                <h3>Grow your influencer channel</h3>
                <p>Handpicked services to help you maximize your earnings.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
          <img height="300" alt="Brand" src="https://static.wixstatic.com/media/8d6fde_5cc22198bf2d41878bb7f727fababd1d~mv2.jpg/v1/fill/w_1899,h_678,al_c,q_85,usm_0.66_1.00_0.01/8d6fde_5cc22198bf2d41878bb7f727fababd1d~mv2.webp "/>
              {/* <img height="300" src={Second} alt="Brand" /> */}
              <Carousel.Caption className="homepage_carousel_text">
                <h3>Connect ambitious Students</h3>
                 <p>with Their future careers</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img height="300" src={Third} alt="Gaming" />
              <Carousel.Caption className="homepage_carousel_text">
                <h3>Atlantis's gaming store</h3>
                <p>Design,development,animation and more.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img height="300" src={Fourth} alt="Learn" />
              <Carousel.Caption className="homepage_carousel_text">
                <h3>Learn something new today</h3>
                <p>
                  Online professional courses, led by the world's leading
                  experts.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

CarouselBanner.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(CarouselBanner);
