import React, { useEffect, useCallback, useState } from 'react';
import { KeplrAddChainButton } from 'add-keplr-button';
import Button from 'react-bootstrap/Button';
import '../App.css';
import { nilChainInfo } from '../common/nilChainInfo';
import TextScramble from './TextScramble';
declare const window: any;


const App: React.FC = () => {
  const textList = [
    "Digital identity.",
    "TradFi.",
    "DAOs.",
    "Custody.",
    "Quantum-secure messaging.",
    "Digital safekeeping.",
    "Private DeFi.",
    "Personalized AI."
  ];
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  //const scrambledText = useTextScramble(textList,200);

  const waitForKeplr = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const checkKeplr = () => {
        if (window.keplr) {
          resolve();
        } else {
          setTimeout(checkKeplr, 100); // Check every 500ms
        }
      };
      checkKeplr();
    });
  }, []);

  const fetchBalance = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      await waitForKeplr();
      await window.keplr.enable(nilChainInfo.chainId);
      const offlineSigner = window.keplr.getOfflineSigner(nilChainInfo.chainId);
      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;
      const response = await fetch(`${nilChainInfo.rest}/cosmos/bank/v1beta1/balances/${address}`);
      const data = await response.json();

      const nilBalance = data.balances.find((b: any) => b.denom === 'unil');
      if (nilBalance) {
        setBalance(`${Number(nilBalance.amount) / 10 ** 6} NIL`);
      } else {
        setBalance("0 NIL");
      }
    } catch (error) {
      setError("Failed to fetch balance. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [waitForKeplr]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <div className='container'>
      <div>
      <h1>Nilchain Testnet</h1>
      <div>
      <h2 className='text-scamble'>unlocks</h2>
      <TextScramble texts={textList} scrambleSpeed={200} displayTime={1000000} />
      </div>
     
      
      <div className="">
      <KeplrAddChainButton  chainInfo={nilChainInfo} buttonText="Add NilChain to Keplr" />
      </div>
      <div className='button'>
        <Button onClick={fetchBalance} disabled={isLoading} variant="light">
        {isLoading ? 'Fetching...' : 'Refresh Balance'}
        </Button>
      </div>
      
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <p>NIL Balance: {isLoading ? "Loading..." : balance !== null ? balance : "Fetching balance..."}</p>
      )}
    </div>
    </div>
   
  );
};
export default App;
