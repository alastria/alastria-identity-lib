import Web3 from 'web3';//Se comprueba que web3-lib esta en node-modules.
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));//"Web3.givenProvider" will be set in a Ethereum supported browser.
web3.eth.defaultAccount = web3.eth.accounts[0];//Esta dirección predeterminada se usa como "from"propiedad predeterminada , si no "from"se especifica ninguna propiedad.

var ABI_PresentationRegistry = [];
var address_PresentationRegistry;
var presentationRegistry = new web3.eth.Contract(ABI_PresentationRegistry, address_PresentationRegistry);// Se instancia el objeto web3 con la direccion donde esta desplegado el contrato

export function sayHello() {
  console.log('hi Alastria team!');
}
export function sayGoodbye() {
  console.log('goodbye Alastria team!');

//Alastria-PresentationRegistry
}
export function addSubjectPresentationRegistry(subjectPresentationHash, URI, from){
  presentationRegistry.methods.addSubjectPresentation(subjectPresentationHash, URI).send({from: from});
  console.log('Se ha registrado la presentation ' + subjectPresentationHash);
}

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
