import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import DutchAuctionABI from './DutchAuctionABI.json';
const Auth: React.FC = () => {
    const [userAddress, setUserAddress] = useState<string>('');
    const [userBalance, setUserBalance] = useState<string>('');
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [articles, setArticles] = useState<any[]>([]);
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
        const contractAddress = "0xd13AeeEee9414544409d33B2ACC2A5Ff97deBB04";
        console.log(contractAddress);
        const contract = new ethers.Contract(contractAddress, DutchAuctionABI, ethProvider);

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

    const renderArticles = () => {
        return articles.map((article, index) => (
            
            <div key={index}>
                <p>Name: {article.name}</p>
                <p>Current Price: {ethers.utils.formatEther(article.currentPrice)} ETH</p>
                <p>Winning Bidder: {article.winningBidder}</p>
                <p>Closed: {article.closed ? 'Yes' : 'No'}</p>
            </div>
        ));
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect MetaMask</button>
            {userAddress && (
                <div>
                    <p>Address: {userAddress}</p>
                    <p>Balance: {userBalance} ETH</p>
                    <h3>Articles:</h3>
                    {renderArticles()}
                </div>
            )}
        </div>
    );
};

export default Auth;
