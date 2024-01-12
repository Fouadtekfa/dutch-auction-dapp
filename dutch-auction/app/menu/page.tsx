import { ethers } from "ethers";
import Navbar from "../../components/Navbar";

// interface ExtendedWindow extends Window {
//     ethereum?: any;
// }


// const extendedWindow = window as ExtendedWindow;
//Sconst supplier = new ethers.providers.Web3Provider( extendedWindow.ethereum) 


export default function Page() {
        
    return (

        <>
         
          <Navbar /> 
         <div style={{ height: '100vh'}}>
            
            </div> 
        </>
      );
}