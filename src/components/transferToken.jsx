import { useContext } from "react";
import { Context } from "../context/context";

const TransferToken = () => {
  const { transferToken, inputValue, handleInputChange, tokenSymbol } =
    useContext(Context);
  return (
    <>
      <form>
        <input
          type="text"
          name="walletAddress"
          placeholder="Wallet Address"
          onChange={handleInputChange}
          value={inputValue.walletAddress}
        />
        <input
          type="text"
          name="transferAmount"
          placeholder={`0.000 ${tokenSymbol}`}
          onChange={handleInputChange}
          value={inputValue.transferAmount}
        />
        <button onClick={transferToken}>TRANSFER TOKEN</button>
      </form>
    </>
  );
};
export default TransferToken;
