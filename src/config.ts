import * as fs from 'fs';
import * as path from 'path';
const contractsPath = '../abi'; // TODO coger url de abis de alastria-identity
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

export const config = {
    alastriaIdentityManager: '0xf18bd0f5a4f3944f3074453ce2015e8af12ed196',
    alastriaCredentialRegistry: '0xE4f91b47399Dc2560025Aafb4fFA7Cd5C483330e',
    alastriaPresentationRegistry: '0x8e78E1BfBdcD1564309d86d4925fCF533a6dcBC8',
    alastriaPublicKeyRegistry: '0x0b337E2aC98a9725615dE042E950dD8C8b66b0fA',
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
