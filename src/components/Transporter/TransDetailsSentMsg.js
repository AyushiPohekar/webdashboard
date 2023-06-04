import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


import { API } from '../../global';
import TransNavbar from './TransNavbar';

const TransDetailsSentMsg = () => {
    const navigate=useNavigate()
    const auth1=localStorage.getItem("auth");
   const auth=JSON.parse(auth1)
    const { orderID } = useParams();
    console.log(orderID)
    const [details, setDetails] = useState({});
 
    const getDetails = async () => {
        const token=auth?.token;
         try {
          const { data } = await axios.get(`${API}api/transporter/details/sent/${orderID}`, {
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
<span className='content'>{details?.recipient?.username}</span>
</div>


{/* <div className='detailsinnercontainer'>
<span className='title'>Price:</span>
<span className='content'>{details?.price}</span>
</div> */}

</div>
    </div>
  )
}

export default TransDetailsSentMsg