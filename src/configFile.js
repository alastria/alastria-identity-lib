#!/usr/bin/node
const fs = require('fs')
const path = require('path')

const contractsABIPath = '../alastriaID-hardhat-contracts/artifacts/contracts'
const _contractsAbi = {}
const abi = {}

// Process the abi dir for getting an object with all the abi functions
fs.readdirSync(path.join(__dirname, `${contractsABIPath}`)).forEach((folder) => {
  fs.readdirSync(path.join(__dirname, `${contractsABIPath}/${folder}`)).forEach((folderSol) => {
    fs.readdirSync(path.join(__dirname, `${contractsABIPath}/${folder}/${folderSol}`)).forEach((file) => {
      if(folderSol === 'upgradeability') {
        fs.readdirSync(path.join(__dirname, `${contractsABIPath}/${folder}/${folderSol}`)).forEach((folderUpgrade) => {
          fs.readdirSync(path.join(__dirname, `${contractsABIPath}/${folder}/${folderSol}/${folderUpgrade}`)).forEach((fileUpgrade) => {
            if (!fileUpgrade.endsWith('.dbg.json')) {
              const abiFile = JSON.parse(
                fs.readFileSync(path.join(__dirname, `${contractsABIPath}/${folder}/${folderSol}/${folderUpgrade}`, fileUpgrade), 'utf8')
              )
              abiFile.abi.forEach((element) => {
                if (element.type === 'constructor') {
                  abi.constructor = element
                } else {
                  if (element.name) {
                    abi[element.name] = element
                  }
                }
              })
              _contractsAbi[abiFile.contractName] = abi
            }
          })
        })
      } else {
        if (!file.endsWith('.dbg.json')) {
          const abiFile = JSON.parse(
            fs.readFileSync(path.join(__dirname, `${contractsABIPath}/${folder}/${folderSol}`, file), 'utf8')
          )
          abiFile.abi.forEach((element) => {
            if (element.type === 'constructor') {
              abi.constructor = element
            } else {
              if (element.name) {
                abi[element.name] = element
              }
            }
          })
          _contractsAbi[abiFile.contractName] = abi
        }
      }
    })
  })
})

const contractsAddressesPath = '../alastriaID-hardhat-contracts'
const contractsInfo = JSON.parse(
  fs.readFileSync(path.join(__dirname, `${contractsAddressesPath}`, 'addresses-t.json'), 'utf8')
)

const config = {
  alastriaIdentityManager: contractsInfo.AlastriaIdentityManager,
  alastriaCredentialRegistry: contractsInfo.AlastriaCredentialRegistry,
  alastriaPresentationRegistry: contractsInfo.AlastriaPresentationRegistry,
  alastriaPublicKeyRegistry: contractsInfo.AlastriaPublicKeyRegistry,
  alastriaNameService: contractsInfo.AlastriaNameService,
  basicTransaction: {
    to: '0x0000000000000000000000000000000000000000',
    data: '0x0',
    gasLimit: 0,
    gasPrice: 0
  },
  contractsAbi: _contractsAbi,
  zeroValue:
    '00000000000000000000000000000000000000000000000000000000000000000000'
}

function getConfig() {
  fs.writeFileSync(
    './src/config.ts',
    `export const config = ${JSON.stringify(config)}`
  )
}

getConfig()
