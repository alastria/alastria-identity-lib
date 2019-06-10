//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
import { toHex, leftPad } from "../../node_modules/web3-utils";

const alastriaIdentityManager = '0xf18bd0f5a4f3944f3074453ce2015e8af12ed196';
const basicTransaction = {
    from: '',
    to: alastriaIdentityManager,
    data: '',
    gas: 0,
    nonce: ''
}
const zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';
const delegateCallSignature = '597b2e9b';
const delegateCallInvoke = (registryAddress) => { return `${delegateCallSignature}000000000000000000000000${registryAddress.slice(2, 40)}${zeroValue}` }

export function generateAccessToken(){
    return {};
  }
  
  export function createAlastriaIdentity(){
    return {};
  }
  
  export function createIdentity(publicKey){
    let transaction = basicTransaction;
    transaction.data = `0x6d69d99a
    0000000000000000000000000000000000000000000000000000000000000020
    ${leftPad(publicKey.length,64)}
    60e6cfd87fdf96e9f8749d267319088775ad1cc245e5cd9fa0d6567426788a3e
    a10e675e00000000000000000000000000000000000000000000000000000000`;
    transaction.gas = 200000;
    return transaction;
  }
  
/**
 * 
 * @param registryAddress
 * @param presentationHash should have 32 bytes
 */
const addSubjectPresentationSignature = '4e3a5de5';
const addSubjectPresentationCost = 200000;
export function addSubjectCredential(registryAddress, presentationHash, uri) {
    let transaction = basicTransaction;
    transaction.data =
        `0x${delegateCallInvoke(registryAddress)}${addSubjectPresentationSignature}${presentationHash}
    0000000000000000000000000000000000000000000000000000000000000040
    ${leftPad(uri.length, 64)}${toHex(uri)}`;
    transaction.gas = addSubjectPresentationCost;
    return transaction;
}