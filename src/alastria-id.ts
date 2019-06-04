import Web3 from 'web3';


var ABI_PRESENTATION_REGISTRY =
  [{"constant":true,"inputs":[{"name":"subjectStatus","type":"uint8"},{"name":"receiverStatus","type":"uint8"}],"name":"getPresentationStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"receiverPresentationHash","type":"bytes32"},{"name":"status","type":"uint8"}],"name":"updateReceiverPresentation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"subjectPresentationHash","type":"bytes32"},{"name":"URI","type":"string"}],"name":"addSubjectPresentation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"subject","type":"address"},{"name":"subjectPresentationHash","type":"bytes32"}],"name":"getSubjectPresentationStatus","outputs":[{"name":"exists","type":"bool"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"previousPublishedVersion","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"receiver","type":"address"},{"name":"receiverPresentationHash","type":"bytes32"}],"name":"getReceiverPresentationStatus","outputs":[{"name":"exists","type":"bool"},{"name":"status","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"subjectPresentationHash","type":"bytes32"},{"name":"status","type":"uint8"}],"name":"updateSubjectPresentation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSubjectPresentationList","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_previousPublishedVersion","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hash","type":"bytes32"},{"indexed":false,"name":"status","type":"uint8"}],"name":"PresentationUpdated","type":"event"}];
var ADDRESS_PRESENTATION_REGISTRY = "0x8e78E1BfBdcD1564309d86d4925fCF533a6dcBC8";

// Web3 and Smart Contracts instances
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
var presentationRegistry;
var ipconfig = false;
var accountconfig = false;

// Testing lib functions
export function sayHello(){
    console.log('hi Alastria team!');
}

export function sayGoodbye(){
    console.log('goodbye Alastria team!');
}

// Some functions to configure web3
export function setProvider(web3Instance){
  web3 = web3Instance;
  ipconfig = true;
}

export function setAccount(account){
  web3.eth.defaultAccount = account;
  ipconfig = true;
}

export function setContract(){
  if(ipconfig && accountconfig){
    presentationRegistry = new web3.eth.Contract(ABI_PRESENTATION_REGISTRY, ADDRESS_PRESENTATION_REGISTRY);
  }else{
    console.log("Please, use setProvider and setAccount first.")
  }
}

//Alastria-PresentationRegistry
export function addSubjectPresentationRegistry(subjectPresentationHash, URI) {
  if(ipconfig && accountconfig){
    presentationRegistry.methods.addSubjectPresentation(subjectPresentationHash, URI).send({ from: web3.eth.defaultAccount });
    console.log('Se ha registrado la presentation ' + subjectPresentationHash);
  }else{
    console.log("Please, use setProvider and setAccount first.")
  }
}


/*
export function updateSubjectPresentationRegistry(subjectPresentationHash, status, from){
  presentationRegistry.methods.updateSubjectPresentation(subjectPresentationHash, status).send({from: from});
  var result = presentationRegistry.setFinished.call(true,{from: web3.eth.accounts[0], gas:3000000}, function(err, res){ console.log(res) });
  presentationRegistry.updateSubjectPresentation.sendTransaction(address_to, subjectPresentationHash, {from: address_from, gas:200000},
    function (error,result){
      if (!error){
        var event = presentationRegistry.PresentationUpdated({},{fromBlock:'latest', toBlock:'latest'),
        function(error, result){
          if (!error){
            var msg = "OK! La empresa " + result.args._from + " ha emitido " + result.args._n + " tokens al empleado " + result.args._to;
            imprimir(msg);
          }else{
            console.log("Error" + error);
          }
        }
        });
      } else {
        console.error("Error" + error);
      }
  console.log('Se ha actualizado la presentation' + subjectPresentationHash);
}

export function getSubjectPresentationRegistryStatus(subject, subjectPresentationHash, from){
  presentationRegistry.methods.getSubjectPresentationStatus(subject, subjectPresentationHash).call({from: from});
  console.log('Se ha obtenido correctamente el estado de la presentation' + subjectPresentationHash + 'del sujeto' + subject);
}
export function getSubjectPresentationRegistryList(from){
  presentationRegistry.methods.getSubjectPresentationList().call({from: from});
}
export function updateReceiverPresentationRegistry(receiverPresentationHash, status,from){
  presentationRegistry.methods.updateReceiverPresentation(receiverPresentationHash, satus).send({from: from});
}
export function getReceiverPresentationRegistryStatus(from, receiverPresentationHash){
  presentationRegistry.methods.getReceiverPresentationStatus(receiverPresentationHash).call({from: from});
}
export function getPresentationRegistryStatus(subjectStatus, receiverStatus){
  presentationRegistry.methods.getPresentationStatus
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
