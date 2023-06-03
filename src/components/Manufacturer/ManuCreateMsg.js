import React, { useEffect, useState } from "react";
import ManuNavbar from "./ManuNavbar";
import { API } from "../../global";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManuCreateMsg = () => {
  const navigate=useNavigate()
  const [transporterslist, setTransportersList] = useState();
  const auth1 = localStorage.getItem("auth");
  const auth = JSON.parse(auth1);
  const [content, setContent] = useState("");
  const [address, setAddress] = useState(auth.user.address);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [recipient, setrecipient] = useState("");
  const [quantity, setquantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const res = await axios.post(`${API}/api/manufacturer/createmessage`, {
      content,
      address,
      to,
      from,
      recipient,
      quantity
    }, {
      headers: {
        Authorization:auth.token,
      },
    }
  );
   if(res.data.success){
    navigate("/manufacturer/sent")
   }
   else{
    console.log("some error occurred")
   }
  };

  const getAlltransporters = async () => {
    const token = auth.token;
    try {
      const { data } = await axios.get(
        `${API}/api/manufacturer/getAlltransporters`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTransportersList(data.transporters);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAlltransporters();
  }, []);
  return (
    <div>
      <ManuNavbar />
      <div>
        <div className="detailsContainer">
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
            <span className="title">Address:</span>
            <input type="text" value={address} className="content"></input>
          </div>
          <div className="detailsinnercontainer">
            <span className="title">From:</span>
            <input
              type="text"
              placeholder="Enter source place"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="content"
            ></input>
          </div>
          <div className="detailsinnercontainer">
            <span className="title">To:</span>
            <input
              type="text"
              placeholder="Enter destination place"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="content"
            ></input>
          </div>
          <div className="detailsinnercontainer">
            <span className="title">Quantity:</span>
            <select value={quantity} onChange={(e) => setquantity(e.target.value)}   className="content">
              <option value="">Select Quantity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="detailsinnercontainer">
            <span className="title">Transporter:</span>
            <select
              value={recipient}
              className="content"
              onChange={(e) => setrecipient(e.target.value)}
            >
              <option value="">Select Transporter</option>
              {transporterslist?.map((item) => {
                return <option value={item._id}>{item.username}</option>;
              })}
            </select>
          </div>
          <div className="detailsinnercontainer">
            <button onClick={handleSubmit} className="Pushbtn">Push</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManuCreateMsg;
