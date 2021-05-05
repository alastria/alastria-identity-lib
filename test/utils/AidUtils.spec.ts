import 'mocha'
import { expect } from 'chai'
import { tokensFactory } from '../../src/tokenFactory/tokensFactory'
import { AIdUtils } from '../../src/utils/AIdUtils'

describe('AIdUtils parse DID token correctly', () => {
  const network = 'net'
  const proxyAddress = 'QmeeasCZ9jLbX...ueBJ7d7csxhb'
  const networkID = 'redT'
  let validDID

  before(() => {
    validDID = tokensFactory.tokens.createDID(network, proxyAddress, networkID)
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

    expect(parsedProxyAddres).equal(`0x${proxyAddress}`)
  })
})
