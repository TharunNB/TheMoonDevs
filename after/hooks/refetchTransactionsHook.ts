import { useEffect } from 'react';
import { ChainScanner } from './chainScanner'; 
// Assuming this file contains utility functions for scanning chains

export const useRefetchTransactions = (walletChain, isOldToken, setBurnTransactions, fetchAllTxPromises, isChainTestnet, fetchSupplies) => {
  useEffect(() => {
    let isSubscribed = true;
    Promise.all(ChainScanner.fetchAllTxPromises(isChainTestnet(walletChain?.id)))
      .then((results: any) => {
        if (isSubscribed) {
          let res = results.flat();
          res = ChainScanner.sortOnlyBurnTransactions(res);
          res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
          setBurnTransactions(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSubscribed = false;
    };
  }, [walletChain, isOldToken]);
};