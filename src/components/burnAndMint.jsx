import { useContext } from "react";
import { Context } from "../context/context";

const BurnAndMint = ()=>{
    const {burnTokens, inputValue, handleInputChange, tokenSymbol, mintToken} = useContext(Context)
    return(
        <>
            <div>
                  <form>
                    <input
                      type="text"
                      onChange={handleInputChange}
                      name="mintAmount"
                      placeholder={`0.000 ${tokenSymbol}`}
                      value={inputValue.mintAmount}
                    />
                    <button className="btn-grey" onClick={mintToken}>
                      MINT TOKENS
                    </button>
                  </form>
                  <form className="mt-1">
                    <input
                      type="text"
                      onChange={handleInputChange}
                      name="burnAmount"
                      placeholder={`0.000 ${tokenSymbol}`}
                      value={inputValue.burnAmount}
                    />
                    <button className="btn-grey" onClick={burnTokens}>
                      BURN TOKENS
                    </button>
                  </form>
                </div>
        </>
    )
}
export default BurnAndMint;