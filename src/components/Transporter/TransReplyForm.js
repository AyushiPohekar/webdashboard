import React, { useEffect, useState } from "react";

import { API } from "../../global";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TransNavbar from "./TransNavbar";

const TransReplyForm = () => {
  const navigate = useNavigate();
  const[details,setDetails]=useState()
  const [orderIDlist,setorderIDList] = useState();
  console.log(orderIDlist)
  const auth1 = localStorage.getItem("auth");
  const auth = JSON.parse(auth1);
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
 const [orderID,setorderID]=useState('');
 console.log(orderID)
  const [recipient, setrecipient] = useState("");

  const getDetails = async () => {
    const token=auth?.token;
     try {
      const { data } = await axios.get(`${API}/api/transporter/details/recieved/${orderID}`, {
        headers: {
          Authorization:token,
        },
      });
      console.log(data?.details?.sender?.username)
      setrecipient(data?.details?.sender?._id)
   //setDetails(data?.details)
     } catch (error) {
       console.log(error);
      
     }
   };
   useEffect(() => {
    getDetails();
  }, [orderID]);







  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `${API}/api/transporter/createmessage`,
      {
        content,
       price,
        orderID,
        recipient
       
      },
      {
        headers: {
          Authorization: auth.token,
        },
      }
    );
    if (res.data.success) {
      navigate("/transporter/sent");
    } else {
      console.log("some error occurred");
    }
  };

  const getAllorderIDs = async () => {
    const token = auth.token;
    try {
      const { data } = await axios.get(
        `${API}/api/transporter/getAllmessageRecievedbyTransporter`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setorderIDList(data?.messages)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllorderIDs();
  }, []);
  return (
    <div>
        <TransNavbar/>
        <div>
        <div className="detailsContainer">
        <div className="detailsinnercontainer">
            <span className="title">orderID:</span>
            <select
              value={orderID}
              className="content"
              onChange={(e) => setorderID(e.target.value)}
            >
              <option value="">Select orderID</option>
              {orderIDlist?.map((item) => {
                return <option value={item.orderID}>{item.orderID}</option>;
              })}
            </select>
          </div>
          <div className="detailsinnercontainer">
            <span className="title">Message:</span>
            <input
              type="text"
              placeholder="Enter Message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="content"
            ></input>
          </div>
          <div className="detailsinnercontainer">
            <span className="title">Price:</span>
            <input
              type="text"
              placeholder="Enter Message"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="content"
            ></input>
          </div>
           <div className="detailsinnercontainer">
            <span className="title">Manufacturer Name:</span>
            <input
              type="text"
              placeholder="Enter Message"
              value={recipient}
             
              className="content"
            ></input>
          </div> 
          
         
          
        
          
          <div className="detailsinnercontainer">
            <button onClick={handleSubmit} className="Pushbtn">Push</button>
          </div>
        </div>
        </div>
    </div>
  );
};

export default TransReplyForm;
