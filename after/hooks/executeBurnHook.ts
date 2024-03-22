import { useState } from 'react';

export const useExecuteBurn = (isWalletConnected, openConnectModal, burnAmount, showToast, ToastSeverity, ethersSigner, setTxButton, setTxProgress, refetchTransactions, fetchSupplies, suppliesChain, isOldToken, fetchAddressForChain, oftAbi) => {
  const [burnTxHash, setBurnTxHash] = useState<string | null>(null);

  const executeBurn = async () => {
    if (!isWalletConnected) {
      openConnectModal();
    }
    if (burnAmount === "") {
      console.log("Enter amount to migrate");
      showToast("Enter amount to migrate", ToastSeverity.warning);
      return;
    }
    const tokenAddress = fetchAddressForChain(suppliesChain?.id, isOldToken ? "oldToken" : "newToken");
    const oftTokenContract = new Contract(tokenAddress, oftAbi, ethersSigner);
    let amount = parseEther(burnAmount);
    setTxButton(BurnTxProgress.burning);
    setTxProgress(true);
    try {
      const burnTx = await oftTokenContract.burn(amount);
      setBurnTxHash(burnTx.hash);
      console.log(burnTx, burnTx.hash);
      await burnTx.wait();
      setTxButton(BurnTxProgress.default);
      setTxProgress(false);
      refetchTransactions();
      fetchSupplies();
    } catch (err) {
      console.log(err);
      setTxButton(BurnTxProgress.default);
      setTxProgress(false);
      showToast("Burn Failed!", ToastSeverity.error);
      return;
    }
  };

  return {
    executeBurn,
    burnTxHash
  };
};