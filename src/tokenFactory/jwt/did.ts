import { Network, NetworkID } from '../../../typings'

export function createDID(
  network: Network, // TODO: Is this correct?
  proxyAddress: string,
  networkID: NetworkID // TODO: Is this correct?
) {
  return `did:ala:${network}:${networkID}:${proxyAddress}`
}
