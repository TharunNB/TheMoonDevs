import { useBurnPage } from "./hooks/hooks";

const BurnPageStyled = styled.div``;

const BurnPage = () => {
  const {
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
    burnTxHash,
    onChangeBurnAmount,
    executeBurn,
    refetchTransactions,
  } = useBurnPage();

  return (
    <div>
      <DashboardLayoutStyled className="burnpage">
        <div className="top_conatiner burnpage" style={{ alignItems: "flex-start" }}>
          <BurnButtonBar
            burnAmount={burnAmount}
            onChangeBurnAmount={onChangeBurnAmount}
            executeBurn={executeBurn}
            txProgress={txProgress}
            txButton={txButton}
            burnTxHash={burnTxHash}
          />
          <BurnStats
            statsSupplies={supplies}
            tokenAddress={fetchAddressForChain(
              suppliesChain?.id,
              isOldToken ? "oldToken" : "newToken"
            )}
            walletChain={walletChain}
            allSupplies={allSupplies}
          />
        </div>
      </DashboardLayoutStyled>
      <TransactionTableStyled>
        <div className="header">
          <p className="header_label">Burn Transactions</p>
        </div>
        <BurnTxTable data={burnTransactions} priceUSD={coinData?.current_price?.usd} />
      </TransactionTableStyled>
      <ChainSelector
        title={"Switch Token Chain"}
        openChainSelector={openChainSelector}
        setOpenChainSelector={setOpenChainSelector}
        chains={receiveChains}
        selectedChain={suppliesChain}
        setSelectedChain={setSuppliesChain}
      />
      <AppToast
        position={{ vertical: "bottom", horizontal: "center" }}
        message={toastMsg}
        severity={toastSev}
      />
    </div>
  );
};

export default BurnPage;