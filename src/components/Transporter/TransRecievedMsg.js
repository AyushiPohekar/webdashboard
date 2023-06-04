import React, { useEffect, useState } from 'react'
import "../Manufacturer/Manufacturer.css";
import axios from 'axios';
import { API } from '../../global';

import { useNavigate } from 'react-router-dom';
import TransReplyForm from './TransReplyForm';


const TransRecievedMsg = () => {
  const navigate=useNavigate()
 const auth1=localStorage.getItem("auth");
const auth=JSON.parse(auth1)
console.log(auth)

 const [recivedmessages, setRecievedMessages] = useState();
 console.log(recivedmessages?.messages)
 //console.log(recivedmessages.messages[0]);
 //get All products

 const getAllRecievedMessages = async () => {
  const token=auth.token;
   try {
    const { data } = await axios.get(`${API}/api/transporter/getAllmessageRecievedbyTransporter`, {
      headers: {
        Authorization:token,
      },
    });
    setRecievedMessages(data)
   
   } catch (error) {
     console.log(error);
    
   }
 };
 useEffect(() => {
  getAllRecievedMessages();
}, []);



const length=recivedmessages?.messages?.length;

  return (
   <div className='MessageRecievedContainer m-2'>
    <div>
      <h1>Hello {auth.user.username}! </h1>
      <p>You have <strong>{length}</strong> messages from manufacturers(click on order Id to see details)</p>
      </div>
      <div className='ordersrecieved'>
      <div class="container text-center titleContainer">
  <div class="row maprow">
    <div class="col">
      OrderId
    </div>
    <div class="col">
     ManufacturerName
    </div>
    {/* <div class="col">
     Button
    </div> */}
  
  </div>
</div>
      {/* <div>
  {recivedmessages?.messages?.map((item) => (
    <div key={item._id}>
      <div onClick={()=>navigate(`/manufacturer/${item.orderID}`)}>Order ID: {item.orderID}</div>
      <div>Sender: {item.sender.username}</div>
      <div>Price: {item.price}</div>
    </div>
  ))}
</div> */}
<div className='container text-center'>
{recivedmessages?.messages?.map((item) => (
    <div class="row maprow">
    <div class="col"  onClick={()=>navigate(`/transporter/recieved/${item.orderID}`)} style={{cursor:"pointer"}}>
    {item.orderID}
    </div>
    <div class="col">
    {item?.sender?.username}
    </div>
    {/* <div class="col">
   <button onClick={()=>navigate(`/transporter/reply/${item.orderID}`)}>Reply</button>
    </div> */}
    
    <hr className='mt-2'/>
  </div>
  
  ))}
</div>
      </div>
   </div>
  )
}

export default TransRecievedMsg