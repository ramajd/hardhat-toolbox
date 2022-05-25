# Hardhat Project tips

Notes about working with [Hardhat](https://hardhat.org/) projects.

## Sub projects
- [CustomToken](./CustomToken/): a simple project to define a CustomToken and deploy on test-net

## Hardhat Notes

### Create new project
in order to create new project,  first initiate a new `npm` project:
```bash
$ mkdir my-project && cd my-project
$ npm init -y
```

then, install `hardhat` and create `hardhat.config.js`

```bash
$ npm install --save-dev hardhat

$ npx hardhat
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.9.6

? What do you want to do? … 
    Create a basic sample project
    Create an advanced sample project
    Create an advanced sample project that uses TypeScript
▸ Create an empty hardhat.config.js
    Quit

$ tree
my-project
├── contracts
│   └── Contract.sol
├── deployments
│   └── deploy.js
├── hardhat.config.js
├── node_modules
│   └── ...
├── package.json
├── package-lock.json
└── test
    └── contract.js   
```

### Compile contract

```bash
$ npx hardhat compile
```

### Run tests

```bash
$ npx hardhat test
```

### Deploy contract

```bash
$ npx hardhat run deployments/deploy.js --network [network-name]
```

### Verify on Etherscan

- install dependencies
   ```bash
   $ npm install --save-dev @nomiclabs/hardhat-etherscan
   ```

- update `hardhat.config.js`
   ```js
   module.exports = {
     solidity: "0.8.8",
     ...
     etherscan: {
       apiKey: etherscanKey,
     },
   };
   ```

- verify contract
   ```bash
   $ npx hardhat verify --network [network-name] [contract-address] [initial parameters]
   ```


## References:
- https://betterprogramming.pub/the-complete-hands-on-hardhat-tutorial-9e23728fc8a4