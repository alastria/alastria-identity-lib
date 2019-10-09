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
    alastriaIdentityManager: '0x5ea489540c5a5d8cf95b48940d6f54afa48ee6f5',
    alastriaCredentialRegistry: '0xf52a1198aa78364a0921e374ad351e34b4550cb5',
    alastriaPresentationRegistry: '0x2b5343c56b0591c6aef15665a83c334afa368405',
    alastriaPublicKeyRegistry: '0x761831f1233b578ff5b7b374dcd7f2b353b18d2d',
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
