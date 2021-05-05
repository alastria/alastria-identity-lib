export class AIdUtils {
  /**
   * function getNetwork(did)
   * @param did Alastria ID
   * @returns Network part of the did
   */
  public static getNetwork(did) {
    return did.split(':')[2]
  }

  /**
   * function getNetworkId(did)
   * @param did Alastria ID
   * @returns NetworkId part of the did
   */
  public static getNetworkId(did) {
    return did.split(':')[3]
  }

  /**
   * function getProxyAddress(did)
   * @param did Alastria ID
   * @returns ProxyAddress part of the did
   */
  public static getProxyAddress(did) {
    return `0x${did.split(':')[4]}`
  }
}
