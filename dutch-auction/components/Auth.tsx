'use client'
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import DutchAuctionABI from './DutchAuctionABI.json';
const Auth: React.FC = () => {
    const [userAddress, setUserAddress] = useState<string>('');
    const [userBalance, setUserBalance] = useState<string>('');
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
<<<<<<< HEAD
    const [articles, setArticles] = useState<any[]>([]);
=======
    const [auctions, setAuctions] = useState<any[]>([]);
    const [auctionsRendered, setAuctionsRender] = useState<any[]>([]);

    const contractAddress = "0xB71dBd1Dca1d86419e216892A9d8706bF8b24b88";

>>>>>>> f2d998e... affichage du prix reel des articles
    const connectWallet = async () => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            try {
                // Demande de connexion au portefeuille MetaMask
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                setUserAddress(account);

                // Récupération du solde
                const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(ethProvider);
                const balance = await ethProvider.getBalance(account);
                setUserBalance(ethers.utils.formatEther(balance));

                // Récupération des informations du contrat et des articles
                await fetchContractData(ethProvider);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('MetaMask is not installed');
        }
    };

    const fetchContractData = async (ethProvider: ethers.providers.Web3Provider) => {
        //const contractAddress = "0xcAED01340361323987200C8E74bcBD1a70E19986";
<<<<<<< HEAD
        const contractAddress = "0xd13AeeEee9414544409d33B2ACC2A5Ff97deBB04";
        console.log(contractAddress);
        const contract = new ethers.Contract(contractAddress, DutchAuctionABI, ethProvider);

=======
        console.log(contractAddress);
        const contract = new ethers.Contract(contractAddress, DutchAuctionABI, ethProvider);
>>>>>>> f2d998e... affichage du prix reel des articles
        try {
            // Récupérer les données des articles
            const numArticles = await contract.getArticlesCount(); 
            const fetchedArticles = [];

            for (let i = 0; i < numArticles; i++) {
                const article = await contract.articles(i);
                fetchedArticles.push(article);
            }

            setArticles(fetchedArticles);
        } catch (error) {
            console.error(error);
        }
    };

<<<<<<< HEAD
    const renderArticles = () => {
        return articles.map((article, index) => (
            
            <div key={index}>
                <p>Name: {article.name}</p>
                <p>Current Price: {ethers.utils.formatEther(article.currentPrice)} ETH</p>
                <p>Winning Bidder: {article.winningBidder}</p>
                <p>Closed: {article.closed ? 'Yes' : 'No'}</p>
            </div>
        ));
=======
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

    const renderAuctions = async () => {
        let obj =  auctions.map( async (auction, index) => {
            let articles = auction.articles.filter( (a:any) => a.name );
            
            let auctionsArticles = articles.map( async (a:any, index:any) => {
                let price:any = a.currentPrice;
                
                let buildArt = (a:any, price:any) => (
                    
                    <div key={index} style={{border:'1px solid black', padding:'20px', margin: '20px',width:'fit-content', cursor:'pointer'}}>
                        <div>
                            {a.name} {( auction.idxArticle.toNumber() == index ) ? '(Current)' : ''}
                        </div>
                        <div>
                            Prix: {ethers.utils.formatEther(price)} eth
                        </div>
                    </div>
                );

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
>>>>>>> f2d998e... affichage du prix reel des articles
    };

    useEffect(() => {
        const interval = setInterval(() => {
            renderAuctions().then( au => {
                setAuctionsRender(au);
            })
        }, 1000);

        return () => clearInterval(interval);
    }, [ auctionsRendered ])

    return (
        <div>
            <button onClick={connectWallet}>Connect MetaMask</button>
            {userAddress && (
                <div>
                    <p>Address: {userAddress}</p>
                    <p>Balance: {userBalance} ETH</p>
<<<<<<< HEAD
                    <h3>Articles:</h3>
                    {renderArticles()}
=======
                    </div>
                    <div style={{ width: '100%', background:'#cdcdcd', marginTop:'50px'}}>
                        <h1 style={{textAlign:'center'}}>Encheres en cours</h1>
                        <div>
                            {auctionsRendered}
                        </div>
                    </div>
>>>>>>> f2d998e... affichage du prix reel des articles
                </div>
            )}
        </div>
    );
};

export default Auth;
