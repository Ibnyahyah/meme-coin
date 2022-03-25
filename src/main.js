import { useContext } from "react";
import ConnectBtn from "./components/connected-btn";
import { ShortenAddress } from './utils/shorten'
import { Context } from "./context/context.js";
import TransferToken from "./components/transferToken";
import BurnAndMint from "./components/burnAndMint";

const Main = () => {
  const {
    tokenName,
    tokenSymbol,
    tokenTotalSupply,
    isTokenOwner,
    tokenOwnerAddress,
    yourWalletAddress,
    contractAddress,
    error,
  } = useContext(Context);
  return (
    <>
      <div className="container display-f align-center">
        <div className="card">
          <header className="font-3 font-md text-black mb-1">
            <h1>Meme Coin Project 💰</h1>
          </header>
          <p className="text-center text-red font-3">{error}</p>
          <div>
              <p className="font-3">Coin: {tokenName} {"  "}Ticker: {tokenSymbol}  {"  "}Total Supply: {tokenTotalSupply}</p>
            <TransferToken />
          </div>
            {isTokenOwner && (
              <div className="mt-3">
                <h2 className="text-center mb-1">Admin Panel</h2>
                <BurnAndMint/>
              </div>
            )}
          <div>
            <p className="font-3 font-md mt-2">Contract Address: {contractAddress}</p>
            <p className="font-3 font-md mt-1">Token Owner Address: {tokenOwnerAddress}</p>
            <p className="font-3 font-md mt-1 mb-1">Your Wallet Address: {yourWalletAddress}</p>
          </div>
          <ConnectBtn />
        </div>
      </div>
    </>
  );
};
export default Main;
