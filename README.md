# A React component allows user to add the Nilchain to Keplr Wallet


## Overview

In this project, a react component is provided to intergrate with a npm package that allows developers are easily to customize any blockchain within Cosmos ecosystem and add to Keplr Wallet.
## Live Project
- Website: https://nillion-add-nilchain-to-keplr.vercel.app/
- Npm package: https://www.npmjs.com/package/add-keplr-button
## Features
- Adding Nillion chain to Keplr Wallet.
- Allowing developers to customize chain information easily.
- A friendly user interface with a configurable button to connect with Keplr Wallet.
- Handling the chain addition process with errors and feedbacks.
- Compatible with  the most popular browsers (Edge, Chrome, Firefox).

## Installation
Following these steps to install and run `add-keplr-button` package with your project.

**1. Installing the package via **npm** or **yarn****
   ```bash
   npm i add-keplr-button --save
   ```

**2. Import into your project**
   ```bash
   import { KeplrAddChainButton } from 'add-keplr-button' 
   ```
**3. Config the chainInfo**
- chainId: chainId in a form of {identifier}-{version} (ex. cosmoshub-4)
- chainName: the name of the chain that will be displayed on the wallet
- chainSymbolImageUrl: Image URL of the chain.
  - https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/{chain-identifier}/{file-name}.png
  - Please modify the chain-identifier and file-name from the link above and upload it.
- rpc: URL of RPC endpoint of the chain
- rest: URL of REST/API endpoint of the chain
- nodeProvider: provide the details of the RPC/REST node providers
  - name: name of the node provider
  - email: email address of the node provider (To help other users reach out when there is an issue with the nodes’ status)
  - website(optional): website address of the node provider
- walletUrlForStaking(optional): the URL where the users are directed when they click on Staking button of the Keplr Wallet
- bip44: BIP-44 coin type (118 highly recommended)
- bech32Config: prefix used at the beginning of the address
- currencies: the list of the supported currencies. If your chain uses replicated security, please place your main native token at the top of the currencies list.
- feeCurrencies: the list of the tokens that are accepted by the validators for fees
- stakeCurrency: the staking token of the chain. Remove this item if your chain does not support native staking (e.g. your chain uses replicated security) or does not have a staking token.
- coinGeckoId(optional): the active API ID for Keplr to get the price from CoinGecko
- features: any other features that are additionally supported by the chain
  - cosmwasm: supports CosmWasm smart contracts
  - secretwasm: supports WASM smart contracts of Secret Network
  - eth-address-gen: supports EVM account generation
  - eth-key-sign: supports EVM signatures
  - axelar-evm-bridge: supports EVM bridge provided by Axelar Network
  - osmosis-txfees: supports paying fees in other currencies on Osmosis

## Demo

Following these steps to run project:

#### 1. Clone the Repository

Clone this repository:

```bash
git clone https://github.com/tonytrandevv/add-Nilchain-to-Keplr.git
cd add-Nilchain-to-Keplr
```

#### 2. Install Dependencies

Install the necessary dependencies:

```bash
npm install
```

#### 3. Start the Development Server

Start the development server to run the demo:

```bash
npm run start
```

#### 4. Open the Web App
Open any kinds of browser and navigate to http://localhost:3000

#### 5. Interact with the Demo
- Click the "Add NilChain to Keplr" button to prompt Keplr to add the NilChain Testnet. In case your browser have not installed the Keplr Wallet, the website will notice you to install.
- After adding the chain, the app will fetch and show your NIL balance.


### Contribution
- Opened contributions for any issues are welcome!


### Contact
For any questions or support, please contact validachain@proton.me.
