import { createContext, useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import abi from "../contracts/MemeCoin.json";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [inputValue, setInputValue] = useState({
    walletAddress: "",
    transferAmount: "",
    burnAmount: "",
    mintAmount: "",
  });
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenTotalSupply, setTokenTotalSupply] = useState(0);
  const [isTokenOwner, setIsTokenOwner] = useState(false);
  const [tokenOwnerAddress, setTokenOwnerAddress] = useState(null);
  const [yourWalletAddress, setYourWalletAddress] = useState(null);
  const [error, setError] = useState(null);

  const contractAddress = "0x4596e0EF7121EF339c949269f1060496abD685A8";
  const contractABI = abi.abi;

  const connectHandler = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setIsConnected(true);
        setYourWalletAddress(account);
        console.log(account, "connected to metamask");
      } else {
        setError("Please Install a Metamask Wallet to use the Bank");
        console.log("No metamask detected");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTokenInfo = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        let tokenName = await tokenContract.name();
        let tokenSymbol = await tokenContract.symbol();
        let tokenOwner = await tokenContract.owner();
        let tokenSupply = await tokenContract.totalSupply();
        tokenSupply = utils.formatEther(tokenSupply);

        setTokenName(`${tokenName}🦊`);
        setTokenSymbol(tokenSymbol);
        setTokenOwnerAddress(tokenOwner);
        setTokenTotalSupply(tokenSupply);

        if (account.toLowerCase() === tokenOwner.toLowerCase()) {
          setIsTokenOwner(true);
        }
      } else {
        setError("Please Install a Metamask Wallet to use the Bank");
        console.log("No metamask detected");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const transferToken = async (event) => {
    try {
      event.preventDefault();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const txn = await tokenContract.transfer(
          inputValue.walletAddress,
          utils.parseEther(inputValue.transferAmount)
        );
        console.log("Transfering token...");
        await txn.wait();
        console.log("Token Transfered...done", txn.hash);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const burnTokens = async (e) => {
    try {
      e.preventDefault();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const txn = await tokenContract.burn(
          utils.parseEther(inputValue.burnAmount)
        );
        console.log("Buring Token...");
        await txn.wait();
        console.log("Token Burn...done", txn.hash);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mintToken = async (e) => {
    try {
      e.preventDefault();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let tokenOwner = await tokenContract.owner();

        const txn = await tokenContract.mint(
          tokenOwner,
          utils.parseEther(inputValue.mintAmount)
        );
        console.log("Minting Token....");
        await txn.wait();
        console.log("Token Minted...done", txn.hash);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    connectHandler();
    getTokenInfo();
  }, []);

  const value = {
    connectHandler: connectHandler,
    connect: isConnected,
    error: error,
    tokenName: tokenName,
    tokenSymbol: tokenSymbol,
    tokenTotalSupply: tokenTotalSupply,
    isTokenOwner: isTokenOwner,
    tokenOwnerAddress: tokenOwnerAddress,
    yourWalletAddress: yourWalletAddress,
    handleInputChange: handleInputChange,
    contractAddress: contractAddress,
    mintToken: mintToken,
    burnTokens: burnTokens,
    transferToken: transferToken,
    inputValue: inputValue,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
