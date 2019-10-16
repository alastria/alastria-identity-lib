//import { default as _ } from 'jsontokens'
const _: any = require('jsontokens');
export const tokensFactory = {
  tokens: {
    'decodeJWT': decodeJWT,
    'signJWT': signJWT,
    'verifyJWT': verifyJWT,
    'createAlastriaSession': createAlastriaSession,
    'createAlastriaToken': createAlastriaToken,
    'createCredential': createCredential,
    'createPresentation': createPresentation,
    'createPresentationRequest': createPresentationRequest,
    'PSMHash': PSMHash,
    'createAIC': createAIC,
    'createDID': createDID
  }
}

function createDID(network, proxyAddress){
  // network -> "quor" / "fabr" 
  // no siempre es redT, hay que conseguirlo mediante el archivo config
  return "did:ala:" + network + ":redT:" + proxyAddress;
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

function createAlastriaSession(context, iss, pku, verifiedAT, exp?: string, nbf?: string, jti?: string) {
  const jwt = {
    "@context": context,
    "iss": iss,
    "pku": pku,
    "iat": Math.round(Date.now()/1000),
    "exp": exp,
    "nbf": nbf,
    "data": verifiedAT,
    "jti": jti
  }
  return jwt
}

function createAlastriaToken(didIssuer, providerURL, callbackURL, alastriaNetId, tokenExpTime, nbf?: string, jti?: string) {
  const jwt = {
    "iss": didIssuer,
    "gwu": providerURL,
    "cbu": callbackURL,
    "iat": Math.round(Date.now()/1000),
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
      "iat": Math.round(Date.now()/1000), // ?? Como se calcula
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
function createPresentation(kid, didIssuer, didSubject, context, credentials, procUrl, procHash, timeExp?: number, timeNbf?: number, jti?: String) {
  const jwt = {
    "header": {
        "alg": "ES256K",
        "typ": "JWT",
        "kid": kid
    },
    "payload": {
        "jti": jti,
        "iss": didIssuer,
        "aud": didSubject,
        "iat": Math.round(Date.now()/1000),
        "exp": timeExp,
        "nbf": timeNbf,
        "vp": {
          "@context": [context,"JWT"],
          "type": ["VerifiablePresentation"],
          "procUrl": procUrl,
          "procHash": procHash,
          "verifiableCredential": credentials
        }
    }
  }
  return jwt
}

function createPresentationRequest(kid, didIssuer, didSubject, context, credentials, procUrl, procHash, data, timeExp?: number, timeNbf?: number, jti?: String) {
  const jwt = {
    "header": {
        "alg": "ES256K",
        "typ": "JWT",
        "kid": kid
    },
    "payload": {
        "jti": jti,
        "iss": didIssuer,
        "iat": Math.round(Date.now()/1000),
        "exp": timeExp,
        "nbf": timeNbf,

        "pr": {
          "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "JWT"
          ],
          "type": ["VerifiablePresentationRequest"],
          "procUrl": procUrl,
      	  "procHash": procHash,
          "data": data
        }
      }
    }
  return jwt
}

function PSMHash(web3, jwt, did){
	let json = jwt.concat(did);
	return web3.utils.sha3(json); // ALIAS -> web3.utils.keccak256(json)

}

  /**
    * Create a JSON with the three params
    * @param createAlastriaTX
    * @param alastriaToken
    * @param publicKey
    */
  function createAIC(createAlastriaTX, alastriaToken, publicKey){
    const aic = {
        "createAlastriaTX":createAlastriaTX,
        "alastriaToken":alastriaToken,
        "publicKey":publicKey
    };
    return aic;
}
