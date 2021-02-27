import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../css/serviceItem.css";
import { Link } from "react-router-dom";

import axios from "axios";

const ServiceItem = (props) => {


  // const [service, setService] = useState({
  //   _id: props._id,
  //   description: props.description,
  //   name: props.name,
  //   price: props.price,
  //   rating: props.rating,
  //   serviceImage: props.serviceImage,
  //   userID: props.userID
  // });
  
 
  return (
    <Card
      className="serviceItem-card"
      style={{
        width: "18rem",
        marginLeft: "4em",
        marginBottom: "2em",
        paddingBottom: "0em",
      }}
    >
      <Link
        className="card-block stretched-link text-decoration-none"
        to={{
          // pathname: `/service/${service.name.split(" ").join("-")}`,
         // pathname: `/service/${service._id}`,
         pathname: `/service/${props._id}`,
        }}
      >
       
        <Card.Body
          className="serviceItem-cardBody"
          style={{ padding: "0.3em" }}
        >
           <div className="test">
          <Card.Img src={` https://www.togedoortestgo.site/graphql/${props.serviceImage}`}/>
          <Card.Title style={{ height: "48px", marginTop: "10px" }} >
          <span  style={{
         color: "black",
         fontWeight: "800",
         marginBottom: "0.11em",
       }} > Gig Name: </span>
            {props.name}
          </Card.Title>
          <Card.Text
            style={{
              paddingTop: "0.3em",
              height: "50px",
              whiteSpace: "nowrap",
              width: "100%",
              overflow: "hidden",
              OTextOverflow: "ellipsis",
              textOverflow: "ellipsis",
              marginBottom: "0px",
            }}
          > 
           <span  style={{
              color: "black",
              fontWeight: "800",
              marginBottom: "0.11em",
            }} > Discription: </span>
           {props.description}
          </Card.Text>
          <Card.Text
            style={{
              paddingTop: "0.3em",
              height: "50px",
              whiteSpace: "nowrap",
              width: "100%",
              overflow: "hidden",
              OTextOverflow: "ellipsis",
              textOverflow: "ellipsis",
              marginBottom: "0px",
            }}
          > 
           <span  style={{
              color: "black",
              fontWeight: "800",
              marginBottom: "0.11em",
            }} > User Name: </span>
         {props.firstname}
          </Card.Text>
          </div>
          <div className="row rating-price">
          <Card.Text
            style={{
              color: "#ffbf00",
              fontWeight: "800",
              marginBottom: "0.11em",
            }}
          >
         <span  style={{
              color: "black",
              fontWeight: "800",
              marginBottom: "0.11em",
            }} > Rating: </span> {props.rating}
          </Card.Text>
          <Card.Text className="price" > <span  style={{
              color: "black",
              fontWeight: "800",
              marginBottom: "0.11em",
            }} > Price: </span> {props.price}$</Card.Text>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ServiceItem;
