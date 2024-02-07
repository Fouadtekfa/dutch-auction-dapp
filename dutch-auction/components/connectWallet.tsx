import { ethers } from 'ethers';

export const connectWallet = async ( setUserAddress:Function, setProvider:Function ) => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        try {
            // Demande de connexion au portefeuille MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            setUserAddress(account);

            // Récupération du solde
            const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(ethProvider);
            //const balance = await ethProvider.getBalance(account);
            //setUserBalance(ethers.utils.formatEther(balance));
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('MetaMask is not installed');
    }
};

