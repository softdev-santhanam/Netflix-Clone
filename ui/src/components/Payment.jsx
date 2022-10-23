import React from 'react';
import styled from "styled-components";
import { useEffect } from 'react';
import { FaPaypal, } from "react-icons/fa";
import displayRazorPay from "../utils/PaymentGateway";



const Payment = () => {

// Loading script dynamically
    const loadScript =(src) => {
        return new Promise((resolve) => {
            // creating new script element dynamically with use of create element
            const script = document.createElement('script')
            // manipulate the source parameter of it
            script.src = src

            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                resolve(false)
            }
            // lastly we need to add the script inside the body
            document.body.appendChild(script)
        })
    }

    useEffect(() => {
      loadScript('https://checkout.razorpay.com/v1/checkout.js')
    //   basically it just adding the script to the html on public folder
    })
    

  return (
    <Container>
        <pre className='price'>Plans  ₹199 - 480p   <button onClick={displayRazorPay} className='price-button'><FaPaypal/></button></pre>
        <pre className='price'>Plans  ₹399 - 720p   <button onClick={displayRazorPay} className='price-button'><FaPaypal/></button></pre>
        <pre className='price'>Plans  ₹799 - 1080p  <button onClick={displayRazorPay} className='price-button'><FaPaypal/></button></pre>
        <pre className='price'>Plans  ₹999 - 4k+HDR <button onClick={displayRazorPay} className='price-button'><FaPaypal/></button></pre>
    </Container>
  )
}

const Container = styled.div`
.price {
margin-bottom: 10px;
}
`;

export default Payment; 