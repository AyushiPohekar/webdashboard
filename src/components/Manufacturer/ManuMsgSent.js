import React, { useEffect, useState } from 'react'
import ManuNavbar from './ManuNavbar'
import axios from 'axios';
import { API } from '../../global';
import "./Manufacturer.css"
import { useNavigate } from 'react-router-dom';

const ManuMsgSent = () => {
  const navigate=useNavigate()
    const auth1=localStorage.getItem("auth");
const auth=JSON.parse(auth1)

 const [sentmessages, setSentMessages] = useState();

 //console.log(recivedmessages.messages[0]);
 //get All products

 const getAllSentMessages = async () => {
  const token=auth.token;
   try {
    const { data } = await axios.get(`${API}/api/manufacturer/getAllmessageSentbyManufacturer`, {
      headers: {
        Authorization:token,
      },
    });
 setSentMessages(data)
   } catch (error) {
     console.log(error);
    
   }
 };
 useEffect(() => {
  getAllSentMessages();
}, []);
  return (
    <div>
        <ManuNavbar/>
        <div>
        {/* <div>
  {sentmessages?.messages?.map((item) => (
    <div key={item._id}>
      <div>Order ID: {item.orderID}</div>
      <div>From: {item.from}</div>
      <div>To: {item.to}</div>
      <div>Transporter: {item.recipient.username}</div>
      <div>Quantity: {item.quantity}</div>
      
    </div>
  ))}
</div> */}
<div className='mt-3'>
<div class="container text-center titleContainer">
  <div class="row maprow">
    <div class="col ">
      OrderId
    </div>
    <div class="col ">
     TransporterName
    </div>
    <div class="col">
     From
    </div>
    <div class="col">
     To
    </div>
    <div class="col">
    Quantity
    </div>
  </div>
</div>

</div>

<div className='container text-center'>
{sentmessages?.messages?.map((item) => (
    <div class="row maprow">
    <div class="col"  onClick={()=>navigate(`/manufacturer/sent/${item.orderID}`)} style={{cursor:"pointer"}}>
    {item.orderID}
    </div>
    <div class="col">
    {item.recipient.username}
    </div>
    <div class="col">
    {item.from}
    </div>
    <div class="col">
    {item.to}
    </div>
    <div class="col">
    {item.quantity}
    </div>
   
    <hr className='mt-2'/>
  </div>
  
  ))}
</div>
        </div>
    </div>
  )
}

export default ManuMsgSent