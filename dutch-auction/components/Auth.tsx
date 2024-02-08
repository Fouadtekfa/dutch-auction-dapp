'use client'
import React, { FormEvent, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import DutchAuctionABI from './DutchAuctionABI.json';
import { contractAddress } from './contractAddress';
import { connectWallet } from './connectWallet';

const axios = require('axios');

const Auth: React.FC = () => {
    const [userAddress, setUserAddress] = useState<string>('');
    const [userBalance, setUserBalance] = useState<string>('');
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [auctions, setAuctions] = useState<any[]>([]);
    const [auctionsRendered, setAuctionsRender] = useState<any[]|null>([]);
    const [ articles, setArticles ] = useState<any[]>([]);

    const getPrice = async ( auction:any ) => {
        if( provider ) {
            const contract = new ethers.Contract(contractAddress, DutchAuctionABI, provider);
            const startTime = auction.startNow;
            const elapsedTime = Math.floor(new Date().getTime() / 1000) - startTime;
            
            let startingPrice = await contract.STARTING_PRICE();
            let priceDec = await contract.PRICE_DECREMENT();
            const currentPrice = startingPrice - ( priceDec * Math.floor(elapsedTime / 60));
            const reservePrice = await contract.RESERVE_PRICE();

            let res = Math.max(currentPrice, reservePrice) / (10 ** 18);
            return res;
        } else {
            return  ethers.utils.parseUnits('0', 'ether');
        }
    }

    const accheterArticle = async ( value:number, auction:any, articleId:any ) => {
        if( provider ) {
            const contract = new ethers.Contract(contractAddress, DutchAuctionABI, provider);
            const articleIndex = articleId;
            const bidAmount = ethers.utils.parseUnits(value.toString(), 'ether');
            try {
              if( provider ) {
                  const ganacheUrl = 'http://localhost:7545';
                  // Pour q'il prend en compte le temps ecoulé
                  await axios.post(ganacheUrl, { jsonrpc: '2.0', method: 'evm_increaseTime', params: [0], id: new Date().getTime() });
                  await axios.post(ganacheUrl, { jsonrpc: '2.0', method: 'evm_mine', id: 1, });
              }  
    
              let signer = provider.getSigner();
              // Envoyer transaction
              let signedTransaction = await signer.sendTransaction({ to: contract.address, value: bidAmount,
                    data: contract.interface.encodeFunctionData('placeBid', [ articleIndex, auction.id - 1 ]),
              } );
    
              await signedTransaction.wait();
              setAuctionsRender(null);
    
            } catch ( e:any ) {
                console.log( e );
            }
        }
      };

    const renderAuctions = async () => {
        if(provider) {
            const contract = new ethers.Contract(contractAddress, DutchAuctionABI, provider);
            let auct = await contract.getAuctions();
            let obj =  auct.map( async (auction:any, index:any) => {
                if (auction.closed) return (<></>);

                let articles = auction.articles.filter( (a:any) => a.name );
                let auctionsArticles = articles.map( async (a:any, index:any) => {
                    if (a.closed) return (<></>);

                    const handleSubmit = (e:any) => {
                        e.preventDefault();
                        let value = e.target.buy.value;
                        accheterArticle( value, auction, index );
                    }
    
                    let price:any = a.currentPrice;
                    
                    let buildArt = (a:any, price:any) => {
                    return (
                        <div key={index} style={{border:'1px solid black', padding:'20px', margin: '20px',width:'fit-content', cursor:'pointer'}}>
                            <div>
                                {a.name} {( auction.idxArticle.toNumber() == index ) ? '(Current)' : ''}
                            </div>
                            <div>
                                Prix: {ethers.utils.formatEther(price)} eth
                            </div>
    
                                {( auction.idxArticle.toNumber() == index ) ? 
                                    
                                    (
                                        <>
                                            <form onSubmit={handleSubmit}>
                                                <div style={{padding:'5px 10px', textAlign:'center'}}>
                                                    <input type="number" name="buy" step="0.1" min="0.2" style={{background:'white', border:'1px solid black', borderRadius: '10px', marginRight:'5px'}}/>
                                                </div>
                                                <button type='submit' style={{padding:'5px 10px', background:'#61d961', textAlign:'center'}}>
                                                    Acheter
                                                </button>
                                            </form>
                                        </>
                                    ):
                                    (<></>)
                                }
                        </div>
                    );
                            }
    
                    if( auction.idxArticle.toNumber() == index ) {
                        price = await getPrice(auction);
                        return buildArt( a, ethers.utils.parseUnits(price.toString(), 'ether'));
                    } else {
                        return buildArt( a, price );
                    }
                });
    
                return (
                    <div key={index} style={{ margin: '20px', background: 'white'}}>
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
            renderAuctions().then( au => {
                setAuctionsRender(au);
            })
        }, 1000);

        return () => clearInterval(interval);
    }, [ auctionsRendered ])

    const ajoutArticleEnchere = () => {
        let newArticles = [ ...articles ];
        newArticles.push(<div style={{margin:'10px'}} key={articles.length}><input type="text" name="article" style={{border: '1px solid gray', padding:'10px'}}/></div>);
        setArticles(newArticles);
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
     
        const formData = new FormData(event.currentTarget)
        
        // Recuperer les articles
        let sendArticles = formData.getAll('article');

        if( sendArticles.length > 0 ) {
            if( provider ) {
                let data = [ sendArticles ];
                try {
                    // Creer l'enchere
                    let signer = provider.getSigner();
                    const contract = new ethers.Contract(contractAddress, DutchAuctionABI, provider);
                    const signedTransaction = await signer.sendTransaction({
                          to: contract.address,
                          value: 0,
                          data: contract.interface.encodeFunctionData('newAuction', data ),
                    } );
        
                    await signedTransaction.wait();
                    setArticles([]);

                  } catch ( e:any ) {
                    console.log( e );
                  }
            }
        }
      }

    return (
        <div style={{ paddingTop: '100px'}}>
            <button onClick={() => {
                connectWallet( setUserAddress, setProvider );
            }
            }>Connect MetaMask</button>
            {userAddress && (
                <div>
                    <div>
                    <p>Address: {userAddress}</p>
                    <p>Balance: {userBalance} ETH</p>
                    </div>
                    <div style={{ display: 'inline-flex', background: 'black', width:'100%'}}>
                        <div style={{ width: '30%', background:'#cdcdcd', marginTop:'50px', padding:'20px', margin: '10px'}}>
                            <h2 style={{textAlign:'center'}}>Créer un enchère</h2>
                            <form onSubmit={onSubmit} style={{display: 'block'}}>
                                <div style={{display: 'inline-flex'}}>
                                    <div>
                                        <div style={{ background:'#cdcccc', margin: '10px auto', padding: '10px', width:'fit-content', borderRadius:'5px'}}>
                                            <div>
                                                <h5>Articles de l'enchère</h5>
                                            </div>
                                            { articles }
                                            <div style={{margin: '10px'}}>
                                                <button onClick={ajoutArticleEnchere} type="button" style={{background: '#70c570', padding: '10px', borderRadius: '10px', border: '1px solid black'}}>Ajouter</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginTop:'20px'}}>
                                    <button type="submit" style={{background: '#7EC9EB', padding: '10px', borderRadius: '10px', border: '1px solid black', margin:'10px'}}>Creer</button>
                                    <button type="button" onClick={() => {
                                        setArticles([]);
                                    }} style={{background: '#d77a7a', padding: '10px', borderRadius: '10px', border: '1px solid black', margin:'10px'}}>Annuler</button>
                                </div>

                            </form>
                        </div>
                        <div style={{ width: '100%', background:'#cdcdcd', marginTop:'50px', padding:'20px', margin: '10px'}}>
                            <h2 style={{textAlign:'center'}}>Encheres en cours</h2>
                            <div>
                                {auctionsRendered}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Auth;
