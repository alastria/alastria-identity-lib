//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
import { toHex, leftPad } from "../../node_modules/web3-utils";

const basicTransaction = {
    from: '',
    to: '',
    data: '',
    gas: 0,
    nonce: ''
}
const delegateCallSignature = '597b2e9b';
const zeroValue = '00000000000000000000000000000000000000000000000000000000000000000000';
const delegateCallInvoke = (registryAddress) => { return `${delegateCallSignature}000000000000000000000000${registryAddress.slice(2, 40)}${zeroValue}` }

export function getTransactionAddSubjectPresentation(){
    return {};
  }
  
  export function getTransactionUpdateSubjectPresentation(){
    return {};
  }
  
  export function getTransactionGetSubjectPresentationStatus(){
    return {};
  }
  
  export function getTransactionGetSubjectPresentationList(){
    return {};
  }
  
  export function getTransactionUpdateReceiverPresentation(){
    return {};
  }
  
  export function getTransactionGetReceiverPresentationStatus(){
    return {};
  }
  
  export function getTransactionGetPresentationStatus(){
    return {};
  }