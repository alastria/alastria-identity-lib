import * as fs from 'fs';
import * as path from 'path';

//TODO getting from GitHub URL repository
const contractsPath = '../../../../alastria-identity/contracts/abi/'; // supposing alastria-identity is cloned at the same level as alastria-identity-lib
var _contractsAbi = {};

//Process the abi dir for getting an object with all the abi functions
fs.readdirSync(path.join(__dirname, contractsPath)).forEach(file => {
    let abi = {};
    let abiFile = JSON.parse(fs.readFileSync(path.join(__dirname, `${contractsPath}/`, file), 'utf8'));
    abiFile.forEach(element => {
        if(element.type == 'constructor') {
            abi['constrcutor'] = element;
        } else {
            abi[element.name] = element;
        }
    });
    _contractsAbi[file.match(/sol_(.*)\.abi/)[1]] = abi;
});

// WARNING TODO getting from GitHub URL repository or update these address with your new ones!!
export const config = {
    alastriaIdentityManager: '0xe9dc6bce74e1ee0ccd7aa461c0c7c3ea0014aa4c',
    alastriaCredentialRegistry: '0x9f1b26710eff584f017507ad1a7424cc49f1b930',
    alastriaPresentationRegistry: '0x75d2d6505ce8f8c225d840da42dc33c8e8143501',
    alastriaPublicKeyRegistry: '0x16e99506009a9bdcbc8546bc629c3d52d8f8264f',
    basicTransaction: {
        from: '',
        to: '0x0000000000000000000000000000000000000000',
        data: '0x0',
        gasLimit: 0,
        gasPrice: 0,
        nonce: '0x0'
    },
    contractsAbi: _contractsAbi,
    zeroValue: '00000000000000000000000000000000000000000000000000000000000000000000'
}
