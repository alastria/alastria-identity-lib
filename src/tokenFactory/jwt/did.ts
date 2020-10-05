import { Network, NetworkID } from '../../../typings'

// Creates a string which is DID and returns it
/**
 * @param network {Network} - network type
 * @param proxyAddress {string} - It is a hexadecimal value with out the 0x at the beginning. It is 40 character long
 * @param networkID {NetworkID} - Network identifier
 *
 * @returns {string} The DID if proxyAddress is well-formed
 */
export function createDID(
  network: Network,
  proxyAddress: string,
  networkID: NetworkID
) {
  const regexToValidateHex = /^[0-9a-fA-F]+$/
  return regexToValidateHex.test(proxyAddress) && proxyAddress.length === 40
    ? `did:ala:${network}:${networkID}:${proxyAddress}`
    : undefined
}
