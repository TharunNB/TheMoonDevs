interface WalletData {
    walletAddress: string;
    isWalletConnected: boolean;
    walletBalance: number;
    isBalanceError: boolean;
    openChainModal: () => void;
    walletChain: string;
    chains: string[];
    openConnectModal: () => void;
  }
  
  export class WalletModel {
    private data: WalletData;
  
    constructor(data: WalletData) {
      this.data = data;
    }
  
    get walletAddress() {
      return this.data.walletAddress;
    }
  
    get isWalletConnected() {
      return this.data.isWalletConnected;
    }
  
    get walletBalance() {
      return this.data.walletBalance;
    }
  
    get isBalanceError() {
      return this.data.isBalanceError;
    }
  
    openChainModal() {
      this.data.openChainModal();
    }
  
    get walletChain() {
      return this.data.walletChain;
    }
  
    get chains() {
      return this.data.chains;
    }
  
    openConnectModal() {
      this.data.openConnectModal();
    }
  }