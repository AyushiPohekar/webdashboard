import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';



import ManuNavbar from './ManuNavbar';
import { API } from '../../global';


const ManuDetailsSentMsg = () => {
    const navigate=useNavigate()
    const auth1=localStorage.getItem("auth");
   const auth=JSON.parse(auth1)
    const { orderID } = useParams();
    console.log(orderID)
    const [details, setDetails] = useState({});
 
    const getDetails = async () => {
        const token=auth?.token;
         try {
          const { data } = await axios.get(`${API}api/manufacturer/details/sent/${orderID}`, {
            headers: {
              Authorization:token,
            },
          });
          console.log(data?.details)
       setDetails(data?.details)
         } catch (error) {
           console.log(error);
          
         }
       };
       useEffect(() => {
        getDetails();
      }, [orderID]);
  
   
  return (
    <div>
<ManuNavbar/>
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
<span className='content'>{details?.recipient?.username}</span>
</div>
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



</div>
    </div>
  )
}

export default ManuDetailsSentMsg