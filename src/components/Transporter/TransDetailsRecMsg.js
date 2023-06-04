import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


import { API } from '../../global';
import TransNavbar from './TransNavbar';

const TransDetailsRecMsg = () => {
    const navigate=useNavigate()
    const auth1=localStorage.getItem("auth");
   const auth=JSON.parse(auth1)
    const { orderId } = useParams();
    console.log(orderId)
    const [details, setDetails] = useState({});
    console.log(details)
    const getDetails = async () => {
        const token=auth?.token;
         try {
          const { data } = await axios.get(`${API}api/transporter/details/recieved/${orderId}`, {
            headers: {
              Authorization:token,
            },
          });
       setDetails(data?.details)
         } catch (error) {
           console.log(error);
          
         }
       };
       useEffect(() => {
        getDetails();
      }, [orderId]);
  
   
  return (
    <div>
<TransNavbar/>
<div className='detailsContainer'>
<div className='detailsinnercontainer'>
<span className='title'>OrderID:</span>
<span className='content'>{details?.orderID}</span>
</div>
<div className='detailsinnercontainer'>
<span className='title'>Message:</span>
<span className='content'>{details?.content}</span>
</div>
<div className='detailsinnercontainer'>
<span className='title'>Manufacturer Name:</span>
<span className='content'>{details?.sender?.username}</span>
</div>
{/* <div className='detailsinnercontainer'>
<span className='title'>Transporter Name:</span>
<span className='content'>{details.recipient.username}</span>
</div> */}
<div className='detailsinnercontainer'>
<span className='title'>To:</span>
<span className='content'>{details?.to}</span>
</div>
<div className='detailsinnercontainer'>
<span className='title'>From:</span>
<span className='content'>{details?.from}</span>
</div>
<div className='detailsinnercontainer'>
<span className='title'>Quantity:</span>
<span className='content'>{details?.quantity}</span>
</div>
{/* <div className='detailsinnercontainer'>
<span className='title'>Price:</span>
<span className='content'>{details.price}</span>
</div> */}

</div>
<button onClick={()=>navigate("/transporter/reply")} className='Pushbtn' style={{marginLeft:"50%", marginTop:"20px"}}>reply</button>
    </div>
  )
}

export default TransDetailsRecMsg