import { useState, useEffect, ChangeEvent } from 'react';
import { useRefetchTransactions } from './refetchTransactionsHook'; 
import { useExecuteBurn } from './executeBurnHook';


export const useBurnPage = () => {
  const {
    walletAddress,
    isWalletConnected,
    walletBalance,
    isBalanceError,
    openChainModal,
    walletChain,
    chains,
    openConnectModal,
  } = useWallet();
  const { openChainSelector, setOpenChainSelector, openChainSelectorModal } = useChainSelector();
  const { chains: receiveChains } = useWallet();
  const { supplies, allSupplies, setSuppliesChain, suppliesChain, fetchSupplies } = useAppSupplies(true);
  const { toastMsg, toastSev, showToast } = useAppToast();
  const ethersSigner = useEthersSigner({
    chainId: walletChain?.id ?? chainEnum.mainnet,
  });
  const [burnAmount, setBurnAmount] = useState("");
  const [txButton, setTxButton] = useState<BurnTxProgress>(BurnTxProgress.default);
  const [txProgress, setTxProgress] = useState<boolean>(false);
  const [burnTxHash, setBurnTxHash] = useState<string | null>(null);

  useEffect(() => {
    CoinGeckoApi.fetchCoinData()
      .then((data: any) => {
        setCoinData(data?.market_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!walletChain) return;
    refetchTransactions(); // Call refetchTransactions hook
  }, [walletChain, isOldToken]);

  const onChangeBurnAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setBurnAmount("");
    if (isNaN(parseFloat(e.target.value))) return;
    setBurnAmount(e.target.value);
  };

  const { executeBurn } = useExecuteBurn(
    isWalletConnected,
    openConnectModal,
    burnAmount,
    showToast,
    ToastSeverity,
    ethersSigner,
    setTxButton,
    setTxProgress,
    refetchTransactions,
    fetchSupplies,
    suppliesChain,
    isOldToken,
    fetchAddressForChain,
    oftAbi
  ); // Using executeBurn hook

  const { refetchTransactions } = useRefetchTransactions(
    walletChain,
    isOldToken,
    setBurnTransactions,
    fetchAllTxPromises,
    isChainTestnet,
    fetchSupplies
  ); // Using refetchTransactions hook

  return {
    walletAddress,
    isWalletConnected,
    walletBalance,
    isBalanceError,
    openChainModal,
    walletChain,
    chains,
    openConnectModal,
    openChainSelector,
    setOpenChainSelector,
    openChainSelectorModal,
    receiveChains,
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    fetchSupplies,
    burnTransactions,
    isOldToken,
    burnAmount,
    toastMsg,
    toastSev,
    showToast,
    ethersSigner,
    txButton,
    txProgress,
    approveTxHash,
    burnTxHash,
    onChangeBurnAmount,
    executeBurn,
    refetchTransactions,
  };
};
