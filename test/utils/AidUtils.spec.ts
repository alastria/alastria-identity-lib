import 'mocha'
import { expect } from 'chai'
import { AIdUtils } from '../../src/utils/AIdUtils'
import { createDID } from '../../src/tokenFactory/jwt'
import { Network, NetworkID } from '../../typings'

describe('AIdUtils parse DID token correctly', () => {
  const network: Network = 'fabr'
  const proxyAddress = 'a5ef4c9cbf1aee00f475d9f52acfe751ae99c8d4'
  const networkID: NetworkID = 'testnet1'
  let validDID

  before(() => {
    validDID = createDID(network, proxyAddress, networkID)
  })

  it('should get network from valid DID correclty', function () {
    const parsedNetwork = AIdUtils.getNetwork(validDID)

    expect(parsedNetwork).equal(network)
  })

  it('should get network ID from valid DID correclty', function () {
    const parsedNetworkId = AIdUtils.getNetworkId(validDID)

    expect(parsedNetworkId).equal(networkID)
  })

  it('should get proxy address from valid DID correclty', function () {
    const parsedProxyAddres = AIdUtils.getProxyAddress(validDID)

    expect(parsedProxyAddres).equal(proxyAddress)
  })
})
