import { AddressUtils } from './AddressUtils'

export class PublicKeyUtils {
  /**
   * function hasUncompressedFormatPrefix(publicKey)
   * @param publicKey Hexadecimal public key
   * @returns Determine if the address has the 04 prefix
   */
   public static hasUncompressedFormatPrefix(publicKey) {
    const prefix = publicKey.substring(0, 2)
    if (prefix === '04') {
      return true
    }
    return false
  }

  /**
   * function getUncompressedPublicKey(publicKey)
   * @param publicKey Hexadecimal public key
   * @returns Return the public key with the 04 prefix
   */
  public static getUncompressedFormatPublicKey(publicKey) {
    let hex = publicKey
    if(this.hasUncompressedFormatPrefix(publicKey)){
      hex = publicKey.substring(2, publicKey.length)
    }
    
    return `04${AddressUtils.getAddressWithoutHexPrefix(hex)}`
  }
}
