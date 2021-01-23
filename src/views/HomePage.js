import React, { useEffect, useState } from "react";
import Header from "../components/headers/Header";
import { Container, Row } from "react-bootstrap";
import ServiceItem from "../components/ServiceItem";
import axios from "axios";
import Pagination from "../components/Pagination";
import CarouselBanner from "../components/headers/CarouselBanner";
import Footer from "../components/Footer";
import "../css/homepage.css";

const HomeScreen = (props) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  
  const[flag,setflag]=useState(false)
  const DisplayAndHide=()=>{
  if(flag) return( <div>My Component</div>)
  }
  
  useEffect(() => {
    async function fetchData() {
      try {
        
        setIsLoading(true);
        //http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services
        // https://togedoor.herokuapp.com/services
        const response = await axios.get("http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/services");
        setServices(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, []);

  const [userName, setUserName] = useState ()

  // debugger
  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await axios.get(`http://togedoorserver-env.eba-666nat8c.us-west-2.elasticbeanstalk.com/users/${props.userName}`);
  //       setUserName(response.data);
  //     }
  //     fetchData();
  //   }, [userName]);
  

 

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = services.slice(indexOfFirstPost, indexOfLastPost);
 //const currentPosts = services.slice(3,10);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return isLoading ? (
    <Header />
  ) : (
    <div className="home-page">
      <Header />
      <CarouselBanner />
     
        <Row className="row-service col-lg">
          {currentPosts.map((service, index) => (
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

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={services.length}
          paginate={paginate}
        />
    

{/* <button onClick={() =>{ setflag(!flag)}}>Show/Hide</button>
     {DisplayAndHide()} */}

      <Footer />
    </div>
  );
};

export default HomeScreen;
