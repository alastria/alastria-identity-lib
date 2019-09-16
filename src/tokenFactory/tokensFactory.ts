//import { default as _ } from 'jsontokens'
const _: any = require('jsontokens');
export const tokensFactory = {
  presentation: {
    'decodeJWT': decodeJWT,
    'signJWT': signJWT,
    'verifyJWT': verifyJWT,
    'createAlastriaSession': createAlastriaSession,
    'createAlastriaToken': createAlastriaToken,
    'createCredential': createCredential,
    'createPresentation': createPresentation,
    //'createPresentationRequest': createPresentationRequest
    'PSMHash': PSMHash
  }
}


// Used by Service Provider or Subject Wallet
export function decodeJWT(jwt) {
  var tokenData = null
  if(jwt){
    tokenData = _.decodeToken(jwt)
  }
  return tokenData
}

function signJWT(jwt, rawPrivateKey) {
  return new _.TokenSigner('ES256K', rawPrivateKey).sign(jwt);
}

function verifyJWT(jwt, rawPublicKey) {
  return new _.TokenVerifier('ES256K', rawPublicKey).verify(jwt);
}

function createAlastriaSession(context, iss, pku, verifiedAT, iat, exp?: string, nbf?: string, jti?: string) {
  const jwt = {
    "@context": context,
    "iss": iss,
    "pku": pku,
    "iat": iat,
    "exp": exp,
    "nbf": nbf,
    "data": verifiedAT,
    "jti": jti
  }
  return jwt
}

function createAlastriaToken(didIssuer, providerURL, callbackURL, alastriaNetId, tokenBroadcastDate, tokenExpTime, nbf?: string, jti?: string) {
  const jwt = {
    "iss": didIssuer,
    "gwu": providerURL,
    "cbu": callbackURL,
    "iat": tokenBroadcastDate,
    "ani": alastriaNetId,
    "nbf": nbf,
    "exp": tokenExpTime,
    "jti": jti
  }
  return jwt
}

/*let jwt = {
  "@context": context,
  "levelOfAssurance": levelOfAssurance,
  credentialKey: credentialValue //TODO que ponga el nombre del parametro
}*/

// It builds a JWT with credential info
export function createCredential(kid, didIssuer, didSubject, context, credentialSubject, timeExp?: number, timeNbf?: number, jti?: number) {
     const jwt = {
    "header": {
      "typ": "JWT",
      "alg": "ES256K",
      "kid": kid
    },
    "payload": {
      "jti": jti,
      "iss": didIssuer,
      "sub": didSubject,
      "iat": timeNbf, // ?? Como se calcula
      "exp": timeExp,
      "nbf": timeNbf,
      "vc":{
    	"@context": [context,"JWT"],
        "type": ["VerifiableCredential", "AlastriaExampleCredential"],
        "credentialSubject":credentialSubject
    	   }
      }
   }
  return jwt
}


/**
* This function creates a presentation with the jwt format
* @param didIssuer "iss". This is the issuer did
* @param didSubject "sub". This is de subject didIssuer
* @param credentials This is an array that contains some credentials taht follows the "createCredential" format
* @param timeExp (optional) "exp". This parameter shows, in miliseconds, how much time will the token be valid. This number will be calculated from the "iat"
* @param timeNbf (optional) "nbf". This parameter shows, in miliseconds, when the token starts to be valid.
* @param jti (optional) Unique token identifier
*/
function createPresentation(didIssuer, didSubject, credentials, timeExp?: number, timeNbf?: number, jti?: number) {
  const jwt = {
    "header": {
      "typ": "JWT",
      "alg": "ES256K"
    },
    "Payload": {
      "@context": "https://w3id.org/credentials/v1",
      "jti": jti,
      "iss": didIssuer,
      "sub": didSubject,
      "iat": timeNbf, // ?? Como se calcula
      "exp": timeExp,
      "nbf": timeNbf,
      "credentials": credentials // TODO que ponga el contenido de cada credencial
    }
  }
  return jwt
}

function PSMHash(web3, jwt, did){
	let json = jwt.concat(did);
	return web3.utils.sha3(json); // ALIAS -> web3.utils.keccak256(json) 

}
/*function createPresentationRequest(issuerDID, subjectDID, objects, tokenValidTime, setUpTokenTime, tokenId) {
  return jsonObject
}*/
