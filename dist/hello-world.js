"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = require("web3"); //Se comprueba que web3-lib esta en node-modules.
var web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("http://localhost:8545")); //"Web3.givenProvider" will be set in a Ethereum supported browser.
web3.eth.defaultAccount = web3.eth.accounts[0]; //Esta dirección predeterminada se usa como "from"propiedad predeterminada , si no "from"se especifica ninguna propiedad.
var ABI_PresentationRegistry = [];
var address_PresentationRegistry;
var presentationRegistry = new web3.eth.Contract(ABI_PresentationRegistry, address_PresentationRegistry); // Se instancia el objeto web3 con la direccion donde esta desplegado el contrato
function sayHello() {
    console.log('hi Alastria team!');
}
exports.sayHello = sayHello;
function sayGoodbye() {
    console.log('goodbye Alastria team!');
    //Alastria-PresentationRegistry
}
exports.sayGoodbye = sayGoodbye;
function addSubjectPresentationRegistry(subjectPresentationHash, URI, from) {
    presentationRegistry.methods.addSubjectPresentation(subjectPresentationHash, URI).send({ from: from });
    console.log('Se ha registrado la presentation ' + subjectPresentationHash);
}
exports.addSubjectPresentationRegistry = addSubjectPresentationRegistry;
/*
export function updateSubjectPresentation(){

}
export function getSubjectPresentationStatus(){

}
export function getSubjectPresentationList(){

}
export function updateReceiverPresentation(receiverPresentationHash, status){

}
export function getReceiverPresentationStatus(to, receiverPresentationHash){

}
export function getPresentationStatus(subjectStatus, receiverStatus){

}*/
//AlastriaCredentialRegistry
/*
export function addSubjectCredential(subjectCredentialHash, URI, from){
  console.log('Se ha añadido la credencial' + subjectCredentialHash);
}
export function deleteSubjectCredential(subjectCredentialHash, from){
  console.log('Se ha borrado la credencial' + subjectCredentialHash);
}
export function getSubjectCredentialStatus(from, subjectCredentialHash){

}

*/
