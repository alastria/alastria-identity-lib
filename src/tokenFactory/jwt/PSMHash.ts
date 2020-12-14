export function PSMHash(web3, jwt, did) {
  const json = jwt.concat(did)
  return web3.utils.sha3(json) // Same as -> web3.utils.keccak256(json)
}
