import Web3 from 'web3';//Se comprueba que web3-lib esta en node-modules.

var ABI_PresentationRegistry = [{"constant": true,"inputs": [	{"name": "subjectStatus","type": "uint8"	},	{"name": "receiverStatus","type": "uint8"	}],"name": "getPresentationStatus","outputs": [	{"name": "","type": "uint8"	}],"payable": false,"stateMutability": "pure","type": "function"	},	{"constant": false,"inputs": [	{"name": "receiverPresentationHash","type": "bytes32"	},	{"name": "status","type": "uint8"	}],"name": "updateReceiverPresentation","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"	},	{"constant": false,"inputs": [	{"name": "subjectPresentationHash","type": "bytes32"	},	{"name": "URI","type": "string"	}],"name": "addSubjectPresentation","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"	},	{"constant": true,"inputs": [	{"name": "subject","type": "address"	},	{"name": "subjectPresentationHash","type": "bytes32"	}],"name": "getSubjectPresentationStatus","outputs": [	{"name": "exists","type": "bool"	},	{"name": "status","type": "uint8"	}],"payable": false,"stateMutability": "view","type": "function"	},	{"constant": true,"inputs": [],"name": "version","outputs": [	{"name": "","type": "int256"	}],"payable": false,"stateMutability": "view","type": "function"	},	{"constant": true,"inputs": [],"name": "previousPublishedVersion","outputs": [	{"name": "","type": "address"	}],"payable": false,"stateMutability": "view","type": "function"	},	{"constant": true,"inputs": [	{"name": "receiver","type": "address"	},	{"name": "receiverPresentationHash","type": "bytes32"	}],"name": "getReceiverPresentationStatus","outputs": [	{"name": "exists","type": "bool"	},	{"name": "status","type": "uint8"	}],"payable": false,"stateMutability": "view","type": "function"	},	{"constant": false,"inputs": [	{"name": "subjectPresentationHash","type": "bytes32"	},	{"name": "status","type": "uint8"	}],"name": "updateSubjectPresentation","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"	},	{"constant": true,"inputs": [],"name": "getSubjectPresentationList","outputs": [	{"name": "","type": "uint256"	},	{"name": "","type": "bytes32[]"	}],"payable": false,"stateMutability": "view","type": "function"	},	{"inputs": [	{"name": "_previousPublishedVersion","type": "address"	}],"payable": false,"stateMutability": "nonpayable","type": "constructor"	},	{"anonymous": false,"inputs": [	{"indexed": false,"name": "hash","type": "bytes32"	},	{"indexed": false,"name": "status","type": "uint8"	}],"name": "PresentationUpdated","type": "event"	}];

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

var presentationRegistry = new web3.eth.Contract(ABI_PresentationRegistry, "0x8e78E1BfBdcD1564309d86d4925fCF533a6dcBC8");

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
export function updateSubjectPresentationRegistry(subjectPresentationHash, status, from){
  presentationRegistry.methods.updateSubjectPresentation(subjectPresentationHash, status).send({from: from});
  var event = presentationRegistry.PresentationUpdated({}, from:, to:)
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
