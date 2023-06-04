import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../global';
import ManuNavbar from './ManuNavbar';



const ManuDetailsRecMsg = () => {
    const navigate=useNavigate()
    const auth1=localStorage.getItem("auth");
   const auth=JSON.parse(auth1)
    const { orderID } = useParams();
  
    const [details, setDetails] = useState({});
    console.log(details)
    const getDetails = async () => {
        const token=auth?.token;
         try {
          const { data } = await axios.get(`${API}/api/manufacturer/details/recieved/${orderID}`, {
            headers: {
              Authorization:token,
            },
          });
       setDetails(data?.details)
       //console.log(data?.details)
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
<span className='content'>{details?.sender?.username}</span>
</div>
{/* <div className='detailsinnercontainer'>
<span className='title'>Transporter Name:</span>
<span className='content'>{details.recipient.username}</span>
</div> */}


<div className='detailsinnercontainer'>
<span className='title'>Price:</span>
<span className='content'>{details.price}</span>
</div>

</div>

    </div>
  )
}

export default ManuDetailsRecMsg