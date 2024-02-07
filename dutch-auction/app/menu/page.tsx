import React from 'react';
import { ethers } from "ethers";
import Navbar from "../../components/Navbar";
import Auth from '../../components/Auth';

//  interface ExtendedWindow extends Window {
//      ethereum?: any;
//  }


//  const extendedWindow = window as ExtendedWindow;
//  const supplier = new ethers.providers.Web3Provider( extendedWindow.ethereum) 


export default function Page() {
        
    return (
        <>
          <Navbar /> 
         <div style={{ height: '100vh'}}>
             <Auth />
            </div> 
        </>
      );
}

