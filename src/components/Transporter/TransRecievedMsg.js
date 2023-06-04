import React, { useContext, useEffect, useState } from 'react'
import "../Manufacturer/Manufacturer.css";
import axios from 'axios';
import { API } from '../../global';

import { useNavigate } from 'react-router-dom';
import TransReplyForm from './TransReplyForm';
import { TransSearchContext } from '../../Context/TransSearchContext';


const TransRecievedMsg = () => {
  const { transsearchQuery } = useContext(TransSearchContext);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const navigate=useNavigate()
 const auth1=localStorage.getItem("auth");
const auth=JSON.parse(auth1)
console.log(auth)

 const [recivedmessages, setRecievedMessages] = useState();
 console.log(recivedmessages)
 //console.log(recivedmessages.messages[0]);
 //get All products

 const getAllRecievedMessages = async () => {
  const token=auth.token;
   try {
    const { data } = await axios.get(`${API}api/transporter/getAllmessageRecievedbyTransporter`, {
      headers: {
        Authorization:token,
      },
    });
    setRecievedMessages(data?.messages)
   
   } catch (error) {
     console.log(error);
    
   }
 };
 useEffect(() => {
  getAllRecievedMessages();
}, []);

useEffect(() => {
  if (transsearchQuery) {
    const filtered = recivedmessages.filter((message) =>
      message?.orderID?.includes(transsearchQuery)
    );
    setFilteredMessages(filtered);
  } else {
    setFilteredMessages(recivedmessages);
  }
}, [transsearchQuery, recivedmessages]);



const length=recivedmessages?.length;

  return (
   <div className='MessageRecievedContainer m-2'>
    <div className='m-3'>
      <h1>Hello {auth.user.username}! </h1>
      <p>You have <strong>{length} messages</strong>  from manufacturers(click on orderID to see details)</p>
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
{filteredMessages?.map((item) => (
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