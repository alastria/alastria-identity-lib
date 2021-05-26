export class AddressUtils {
  /**
   * function hasHexPrefix(address)
   * @param address Hexadecimal address
   * @returns Determine if the address has the 0x prefix
   */
  public static hasHexPrefix(address) {
    const prefix = address.substring(0, 2)
    if (prefix === '0x') {
      return true
    }
    return false
  }

  /**
   * function getAddressWithHexPrefix(address)
   * @param address Hexadecimal address
   * @returns Hexadecimal address with the 0x prefix
   */
  public static getAddressWithHexPrefix(address) {
    if (this.hasHexPrefix(address)) {
      return address
    }
    return `0x${address}`
  }

  /**
   * function getAddressWithoutHexPrefix(address)
   * @param address Hexadecimal address
   * @returns Hexadecimal address without the 0x prefix
   */
  public static getAddressWithoutHexPrefix(address) {
    if (!this.hasHexPrefix(address)) {
      return address
    }
    return address.substring(2, address.length)
  }
}
