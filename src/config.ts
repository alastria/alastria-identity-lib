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
    alastriaIdentityManager: '0xac9f47ec1079be5428ad78a524f1b030d2fcb5e5',
    alastriaCredentialRegistry: '0xdb8c49891ff9524273f62a284745e2f36fa6984b',
    alastriaPresentationRegistry: '0x69756193fde1b63ced57497b21857db1ff46241c',
    alastriaPublicKeyRegistry: '0x48ed582db19474eb26610ddf8daf7e474c716cb8',
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
