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
    alastriaIdentityManager: '0x70e7e63928b8f274f018160207d4275fd8ea5bbe',
    alastriaCredentialRegistry: '0x465EACeAc60c8FCc8988F6dAE17873D2EbF64588',
    alastriaPresentationRegistry: '0xf71A93f0D08728A99A44d73238427C26ce63ceC1',
    alastriaPublicKeyRegistry: '0xc9f8407C5bb0aBAF01fa7aa9e56533780c4eA590',
    basicTransaction: {
        to: '0x0000000000000000000000000000000000000000',
        data: '0x0',
        gasLimit: 0,
        gasPrice: 0,
        nonce: '0x0'
    },
    contractsAbi: _contractsAbi,
    zeroValue: '00000000000000000000000000000000000000000000000000000000000000000000'
}
