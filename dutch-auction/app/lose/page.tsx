'use client'
import React, { useEffect, useState } from 'react';
import { Signer, ethers } from 'ethers';
import DutchAuctionABI from '../../components/DutchAuctionABI.json';
import { contractAddress } from '../../components/contractAddress';
import { connectWallet } from '../../components/connectWallet';
import Navbar from '../../components/Navbar';

const axios = require('axios');

const Win: React.FC = () => {
    const [userAddress, setUserAddress] = useState<string>('');
    const [userBalance, setUserBalance] = useState<string>('');
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [auctions, setAuctions] = useState<any[]>([]);
    const [auctionsRendered, setAuctionsRender] = useState<any[]|null>([]);


    const renderAuctions = async () => {
        if(provider) {
            const contract = new ethers.Contract(contractAddress, DutchAuctionABI, provider);
            let auct = await contract.getAuctions();
            let obj =  auct.map( async (auction:any, index:any) => {

                let articles = auction.articles.filter( (a:any) => a.name );
                let auctionsArticles = articles.map( async (a:any, index:any) => {
                    let signer = provider.getSigner();

                    let addresSigner = await signer.getAddress()
                    if (!a.closed || a.winningBidder == addresSigner) return (<></>);
    
                    return (
                        <div key={index} style={{border:'1px solid black', padding:'20px', margin: '20px',width:'fit-content', cursor:'pointer', background:'#e1dbe7'}}>
                            <div>
                                {a.name} {( auction.idxArticle.toNumber() == index ) ? '(Current)' : ''}
                            </div>
                            <div>
                                Acheté
                            </div>
                        </div>
                    );
                });
    
                return (
                    <div key={index} style={{ margin: '20px', background: 'white', padding:'20px', border:'1px solid black', borderRadius:'3%'}}>
                        <div>Enchere {auction.id.toString()}</div>
                        <div>
                            Articles <br/>
                            <div style={{ display: 'inline-flex'}}>
                                {auctionsArticles}
                            </div>
                        </div>
                    </div>
                )
            });
    
            return obj;
        }
        return [];
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if( !provider ) {
                connectWallet( setUserAddress, setProvider );
            } else {
                renderAuctions().then( au => {
                    setAuctionsRender(au);
                })
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [ auctionsRendered, provider ])

    return (
        <div style={{ paddingTop: '100px'}}>
            {userAddress && (
                <div>
                    <div>
                    </div>
                    <div style={{ width: '100%', background:'#cdcdcd', marginTop:'50px', padding:'20px'}}>
                        <h1 style={{textAlign:'center'}}> Encheres Perdus</h1>
                        <div>
                            {auctionsRendered}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Page() {
        
    return (
        <>
          <Navbar /> 
            <div style={{ height: '100vh'}}>
             <Win />
            </div> 
        </>
      );
}

