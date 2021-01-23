import React, { useState, useEffect } from "react";
import Header from "../components/headers/Header";
import { Row, Breadcrumb, Container, Col } from "react-bootstrap";
import ServiceItem from "../components/ServiceItem";
import "../css/subCategoryScreen.css";
import axios from "axios";
import Spinner from "../components/spinner/Spinner";

const SubCategoryScreen = ({ match: { params } }) => {
  const { subcategoryName } = params;
  const [mySubCategory, setMySubCategory] = useState();
  const [services, setServices] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/subcategories/name/${subcategoryName}`
      );
      setMySubCategory(response.data);
    }
    fetchData();
  }, [subcategoryName]);

  useEffect(() => {
    async function fetchData() {
      if (mySubCategory) {
        const response = await axios.get(
          `http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services/getBySubCategory/${mySubCategory._id}`
        );
        setServices(response.data);
        console.log(response);
      }
    }
    fetchData();
  }, [mySubCategory]);

  console.log(mySubCategory);
  console.log(subcategoryName);
  return (
    <div className="subCategory-bg">
      <Header />
      {mySubCategory ? (
        <div>
          <Row>
            <Container style={{ maxWidth: "1375px" }}>
              <Breadcrumb>
                <Breadcrumb.Item active>{params.categoryName}</Breadcrumb.Item>

                <Breadcrumb.Item active href="">
                  {params.subcategoryName}
                </Breadcrumb.Item>
              </Breadcrumb>
              <h2>{mySubCategory.name}</h2>
              <p style={{ color: "black" }}>{mySubCategory.description}</p>
            </Container>
          </Row>
          <Row>
            {" "}
            {/* <Container
              className="d-inline-flex p-2 col-example"
              style={{
                maxWidth: "1400px",
                marginLeft: "1.5%",
              }}
            > */}
              {services ? (
                services.map((service, index) => (
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
                ))
              ) : (
                <h1></h1>
              )}
            {/* </Container> */}
          </Row>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default SubCategoryScreen;
