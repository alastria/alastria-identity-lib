//With web3 v1.0.0 the encode can be done with web3.eth.abi.encodeFunctionCall(jsonInterface,parameters)
//TODO: change encoding when v1.0.0 releases stable version
import { toHex, leftPad, rightPad } from "../../node_modules/web3-utils";

const basicTransaction = {
  from: '',
  to: '',
  data: '',
  gas: 0,
  nonce: ''
}
const getSubjectPresentationStatusFunctionHash = '0x5205080f';
const getSubjectPresentationListFunctionHash = '0xee47717f';
const getReceiverPresentationStatusFunctionHash = '0x9373014a';
const getPresentationStatusFunctionHash = '0x034f8408';

export function getSubjectPresentationStatus(subject, subjectPresentationHash) {
  let transaction = basicTransaction;
  transaction.data = `${getSubjectPresentationStatusFunctionHash}
  ${leftPad(subject.slice(2), 64)}
  ${rightPad(subjectPresentationHash.slice(2), 64)}`;
  transaction.gas = 600000;
  return transaction;
}

export function getSubjectPresentationList() {
  let transaction = basicTransaction;
  transaction.data = `${getSubjectPresentationListFunctionHash}`;
  transaction.gas = 600000;
  return transaction;
}

export function getReceiverPresentationStatus(receiver, receiverPresentationHash) {
  let transaction = basicTransaction;
  transaction.data = `${getReceiverPresentationStatusFunctionHash}
  ${leftPad(receiver.slice(2), 64)}
  ${rightPad(receiverPresentationHash.slice(32), 64)}`;
  transaction.gas = 600000;
  return transaction;
}

export function getPresentationStatus(subjectStatus, receiverStatus) {
  let transaction = basicTransaction;
  transaction.data = `${getPresentationStatusFunctionHash}
  ${leftPad(toHex(subjectStatus).slice(2), 64)}
  ${leftPad(toHex(receiverStatus).slice(2), 64)}`;
  transaction.gas = 600000;
  return transaction;
}
