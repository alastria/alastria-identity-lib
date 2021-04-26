export const config = {
  alastriaIdentityManager: '0x948Cd4c7a26435b32C17e2Ea90C30cC7B3174EE5',
  alastriaCredentialRegistry: '0xbCeb94fe0D428Dbd35B91aa64fa11067EA6a0122',
  alastriaPresentationRegistry: '0xd2428F7023A059B3075564A1B2a0a8243E4aEb3B',
  alastriaPublicKeyRegistry: '0x4De1CEFb60B757316176F31659414a7f6376AEd0',
  basicTransaction: {
    to: '0x0000000000000000000000000000000000000000',
    data: '0x0',
    gasLimit: 0,
    gasPrice: 0
  },
  contractsAbi: {
    AdminUpgradeabilityProxy: {
      constructor: {
        inputs: [
          { internalType: 'address', name: '_logic', type: 'address' },
          { internalType: 'address', name: '_admin', type: 'address' },
          { internalType: 'bytes', name: '_data', type: 'bytes' }
        ],
        payable: true,
        stateMutability: 'payable',
        type: 'constructor'
      },
      AdminChanged: {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'previousAdmin',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newAdmin',
            type: 'address'
          }
        ],
        name: 'AdminChanged',
        type: 'event'
      },
      Upgraded: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementation',
            type: 'address'
          }
        ],
        name: 'Upgraded',
        type: 'event'
      },
      admin: {
        constant: false,
        inputs: [],
        name: 'admin',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      changeAdmin: {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'newAdmin', type: 'address' }
        ],
        name: 'changeAdmin',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      implementation: {
        constant: false,
        inputs: [],
        name: 'implementation',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      upgradeTo: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'newImplementation',
            type: 'address'
          }
        ],
        name: 'upgradeTo',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      upgradeToAndCall: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'newImplementation',
            type: 'address'
          },
          { internalType: 'bytes', name: 'data', type: 'bytes' }
        ],
        name: 'upgradeToAndCall',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
      }
    },
    AlastriaCredentialRegistry: {
      IssuerCredentialRevoked: {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'issuerCredentialHash',
            type: 'bytes32'
          },
          {
            indexed: false,
            internalType: 'enum AlastriaCredentialRegistry.Status',
            name: 'status',
            type: 'uint8'
          }
        ],
        name: 'IssuerCredentialRevoked',
        type: 'event'
      },
      SubjectCredentialDeleted: {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'subjectCredentialHash',
            type: 'bytes32'
          }
        ],
        name: 'SubjectCredentialDeleted',
        type: 'event'
      },
      issuerCredentialList: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'uint256', name: '', type: 'uint256' }
        ],
        name: 'issuerCredentialList',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      previousPublishedVersion: {
        constant: true,
        inputs: [],
        name: 'previousPublishedVersion',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      subjectCredentialList: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'uint256', name: '', type: 'uint256' }
        ],
        name: 'subjectCredentialList',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      subjectCredentialRegistry: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'bytes32', name: '', type: 'bytes32' }
        ],
        name: 'subjectCredentialRegistry',
        outputs: [
          { internalType: 'bool', name: 'exists', type: 'bool' },
          {
            internalType: 'enum AlastriaCredentialRegistry.Status',
            name: 'status',
            type: 'uint8'
          },
          { internalType: 'string', name: 'URI', type: 'string' }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      version: {
        constant: true,
        inputs: [],
        name: 'version',
        outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      initialize: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_previousPublishedVersion',
            type: 'address'
          }
        ],
        name: 'initialize',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      addSubjectCredential: {
        constant: false,
        inputs: [
          {
            internalType: 'bytes32',
            name: 'subjectCredentialHash',
            type: 'bytes32'
          },
          { internalType: 'string', name: 'URI', type: 'string' }
        ],
        name: 'addSubjectCredential',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      addIssuerCredential: {
        constant: false,
        inputs: [
          {
            internalType: 'bytes32',
            name: 'issuerCredentialHash',
            type: 'bytes32'
          }
        ],
        name: 'addIssuerCredential',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      deleteSubjectCredential: {
        constant: false,
        inputs: [
          {
            internalType: 'bytes32',
            name: 'subjectCredentialHash',
            type: 'bytes32'
          }
        ],
        name: 'deleteSubjectCredential',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      getSubjectCredentialStatus: {
        constant: true,
        inputs: [
          { internalType: 'address', name: 'subject', type: 'address' },
          {
            internalType: 'bytes32',
            name: 'subjectCredentialHash',
            type: 'bytes32'
          }
        ],
        name: 'getSubjectCredentialStatus',
        outputs: [
          { internalType: 'bool', name: 'exists', type: 'bool' },
          {
            internalType: 'enum AlastriaCredentialRegistry.Status',
            name: 'status',
            type: 'uint8'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      getSubjectCredentialList: {
        constant: true,
        inputs: [{ internalType: 'address', name: 'subject', type: 'address' }],
        name: 'getSubjectCredentialList',
        outputs: [
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'bytes32[]', name: '', type: 'bytes32[]' }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      updateCredentialStatus: {
        constant: false,
        inputs: [
          {
            internalType: 'bytes32',
            name: 'issuerCredentialHash',
            type: 'bytes32'
          },
          {
            internalType: 'enum AlastriaCredentialRegistry.Status',
            name: 'status',
            type: 'uint8'
          }
        ],
        name: 'updateCredentialStatus',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      getIssuerCredentialStatus: {
        constant: true,
        inputs: [
          { internalType: 'address', name: 'issuer', type: 'address' },
          {
            internalType: 'bytes32',
            name: 'issuerCredentialHash',
            type: 'bytes32'
          }
        ],
        name: 'getIssuerCredentialStatus',
        outputs: [
          { internalType: 'bool', name: 'exists', type: 'bool' },
          {
            internalType: 'enum AlastriaCredentialRegistry.Status',
            name: 'status',
            type: 'uint8'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      getCredentialStatus: {
        constant: true,
        inputs: [
          {
            internalType: 'enum AlastriaCredentialRegistry.Status',
            name: 'subjectStatus',
            type: 'uint8'
          },
          {
            internalType: 'enum AlastriaCredentialRegistry.Status',
            name: 'issuerStatus',
            type: 'uint8'
          }
        ],
        name: 'getCredentialStatus',
        outputs: [
          {
            internalType: 'enum AlastriaCredentialRegistry.Status',
            name: '',
            type: 'uint8'
          }
        ],
        payable: false,
        stateMutability: 'pure',
        type: 'function'
      }
    },
    AlastriaIdentityEntity: {
      constructor: {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
      },
      addEntity: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_addressEntity', type: 'address' },
          { internalType: 'string', name: '_name', type: 'string' },
          { internalType: 'string', name: '_cif', type: 'string' },
          { internalType: 'string', name: '_url_logo', type: 'string' },
          { internalType: 'string', name: '_url_createAID', type: 'string' },
          { internalType: 'string', name: '_url_AOA', type: 'string' },
          { internalType: 'bool', name: '_active', type: 'bool' }
        ],
        name: 'addEntity',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      setNameEntity: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_addressEntity', type: 'address' },
          { internalType: 'string', name: '_name', type: 'string' }
        ],
        name: 'setNameEntity',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      setCifEntity: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_addressEntity', type: 'address' },
          { internalType: 'string', name: '_cif', type: 'string' }
        ],
        name: 'setCifEntity',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      setUrlLogo: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_addressEntity', type: 'address' },
          { internalType: 'string', name: '_url_logo', type: 'string' }
        ],
        name: 'setUrlLogo',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      setUrlCreateAID: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_addressEntity', type: 'address' },
          { internalType: 'string', name: '_url_createAID', type: 'string' }
        ],
        name: 'setUrlCreateAID',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      setUrlAOA: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_addressEntity', type: 'address' },
          { internalType: 'string', name: '_url_AOA', type: 'string' }
        ],
        name: 'setUrlAOA',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      getEntity: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '_addressEntity', type: 'address' }
        ],
        name: 'getEntity',
        outputs: [
          { internalType: 'string', name: '_name', type: 'string' },
          { internalType: 'string', name: '_cif', type: 'string' },
          { internalType: 'string', name: '_url_logo', type: 'string' },
          { internalType: 'string', name: '_url_createAID', type: 'string' },
          { internalType: 'string', name: '_url_AOA', type: 'string' },
          { internalType: 'bool', name: '_active', type: 'bool' }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      entitiesList: {
        constant: true,
        inputs: [],
        name: 'entitiesList',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    },
    AlastriaIdentityIssuer: {
      addIdentityIssuer: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' },
          {
            internalType: 'enum Eidas.EidasLevel',
            name: '_level',
            type: 'uint8'
          }
        ],
        name: 'addIdentityIssuer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      updateIdentityIssuerEidasLevel: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' },
          {
            internalType: 'enum Eidas.EidasLevel',
            name: '_level',
            type: 'uint8'
          }
        ],
        name: 'updateIdentityIssuerEidasLevel',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      deleteIdentityIssuer: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' }
        ],
        name: 'deleteIdentityIssuer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      getEidasLevel: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' }
        ],
        name: 'getEidasLevel',
        outputs: [
          { internalType: 'enum Eidas.EidasLevel', name: '', type: 'uint8' }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      isIdentityIssuer: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' }
        ],
        name: 'isIdentityIssuer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    },
    AlastriaIdentityManager: {
      IdentityCreated: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'identity',
            type: 'address'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'creator',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'owner',
            type: 'address'
          }
        ],
        name: 'IdentityCreated',
        type: 'event'
      },
      IdentityRecovered: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'oldAccount',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newAccount',
            type: 'address'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'serviceProvider',
            type: 'address'
          }
        ],
        name: 'IdentityRecovered',
        type: 'event'
      },
      OperationWasNotSupported: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'string',
            name: 'method',
            type: 'string'
          }
        ],
        name: 'OperationWasNotSupported',
        type: 'event'
      },
      PreparedAlastriaID: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'signAddress',
            type: 'address'
          }
        ],
        name: 'PreparedAlastriaID',
        type: 'event'
      },
      addIdentityIssuer: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' },
          {
            internalType: 'enum Eidas.EidasLevel',
            name: '_level',
            type: 'uint8'
          }
        ],
        name: 'addIdentityIssuer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      addIdentityServiceProvider: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_identityServiceProvider',
            type: 'address'
          }
        ],
        name: 'addIdentityServiceProvider',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      alastriaCredentialRegistry: {
        constant: true,
        inputs: [],
        name: 'alastriaCredentialRegistry',
        outputs: [
          {
            internalType: 'contract AlastriaCredentialRegistry',
            name: '',
            type: 'address'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      alastriaPresentationRegistry: {
        constant: true,
        inputs: [],
        name: 'alastriaPresentationRegistry',
        outputs: [
          {
            internalType: 'contract AlastriaPresentationRegistry',
            name: '',
            type: 'address'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      alastriaPublicKeyRegistry: {
        constant: true,
        inputs: [],
        name: 'alastriaPublicKeyRegistry',
        outputs: [
          {
            internalType: 'contract AlastriaPublicKeyRegistry',
            name: '',
            type: 'address'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      deleteIdentityIssuer: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' }
        ],
        name: 'deleteIdentityIssuer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      deleteIdentityServiceProvider: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_identityServiceProvider',
            type: 'address'
          }
        ],
        name: 'deleteIdentityServiceProvider',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      getEidasLevel: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' }
        ],
        name: 'getEidasLevel',
        outputs: [
          { internalType: 'enum Eidas.EidasLevel', name: '', type: 'uint8' }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      identityKeys: {
        constant: true,
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'identityKeys',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      isIdentityIssuer: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' }
        ],
        name: 'isIdentityIssuer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      isIdentityServiceProvider: {
        constant: true,
        inputs: [
          {
            internalType: 'address',
            name: '_identityServiceProvider',
            type: 'address'
          }
        ],
        name: 'isIdentityServiceProvider',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      isOwner: {
        constant: true,
        inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
        name: 'isOwner',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      owner: {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      pendingIDs: {
        constant: true,
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'pendingIDs',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      transfer: {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' }
        ],
        name: 'transfer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      updateIdentityIssuerEidasLevel: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_identityIssuer', type: 'address' },
          {
            internalType: 'enum Eidas.EidasLevel',
            name: '_level',
            type: 'uint8'
          }
        ],
        name: 'updateIdentityIssuerEidasLevel',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      version: {
        constant: true,
        inputs: [],
        name: 'version',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      initialize: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_credentialRegistry',
            type: 'address'
          },
          {
            internalType: 'address',
            name: '_publicKeyRegistry',
            type: 'address'
          },
          {
            internalType: 'address',
            name: '_presentationRegistry',
            type: 'address'
          },
          {
            internalType: 'address',
            name: '_firstIdentityWallet',
            type: 'address'
          }
        ],
        name: 'initialize',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      prepareAlastriaID: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_signAddress', type: 'address' }
        ],
        name: 'prepareAlastriaID',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      createAlastriaIdentity: {
        constant: false,
        inputs: [
          { internalType: 'bytes', name: 'addPublicKeyCallData', type: 'bytes' }
        ],
        name: 'createAlastriaIdentity',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      delegateCall: {
        constant: false,
        inputs: [
          { internalType: 'address', name: '_destination', type: 'address' },
          { internalType: 'uint256', name: '_value', type: 'uint256' },
          { internalType: 'bytes', name: '_data', type: 'bytes' }
        ],
        name: 'delegateCall',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      recoverAccount: {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'accountLost', type: 'address' },
          { internalType: 'address', name: 'newAccount', type: 'address' }
        ],
        name: 'recoverAccount',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    },
    AlastriaIdentityServiceProvider: {
      addIdentityServiceProvider: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_identityServiceProvider',
            type: 'address'
          }
        ],
        name: 'addIdentityServiceProvider',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      deleteIdentityServiceProvider: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_identityServiceProvider',
            type: 'address'
          }
        ],
        name: 'deleteIdentityServiceProvider',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      isIdentityServiceProvider: {
        constant: true,
        inputs: [
          {
            internalType: 'address',
            name: '_identityServiceProvider',
            type: 'address'
          }
        ],
        name: 'isIdentityServiceProvider',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    },
    AlastriaPresentationRegistry: {
      PresentationUpdated: {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bytes32',
            name: 'hash',
            type: 'bytes32'
          },
          {
            indexed: false,
            internalType: 'enum AlastriaPresentationRegistry.Status',
            name: 'status',
            type: 'uint8'
          }
        ],
        name: 'PresentationUpdated',
        type: 'event'
      },
      previousPublishedVersion: {
        constant: true,
        inputs: [],
        name: 'previousPublishedVersion',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      subjectPresentationListRegistry: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'uint256', name: '', type: 'uint256' }
        ],
        name: 'subjectPresentationListRegistry',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      subjectPresentationRegistry: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'bytes32', name: '', type: 'bytes32' }
        ],
        name: 'subjectPresentationRegistry',
        outputs: [
          { internalType: 'bool', name: 'exists', type: 'bool' },
          {
            internalType: 'enum AlastriaPresentationRegistry.Status',
            name: 'status',
            type: 'uint8'
          },
          { internalType: 'string', name: 'URI', type: 'string' }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      version: {
        constant: true,
        inputs: [],
        name: 'version',
        outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      initialize: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_previousPublishedVersion',
            type: 'address'
          }
        ],
        name: 'initialize',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      addSubjectPresentation: {
        constant: false,
        inputs: [
          {
            internalType: 'bytes32',
            name: 'subjectPresentationHash',
            type: 'bytes32'
          },
          { internalType: 'string', name: 'URI', type: 'string' }
        ],
        name: 'addSubjectPresentation',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      updateSubjectPresentation: {
        constant: false,
        inputs: [
          {
            internalType: 'bytes32',
            name: 'subjectPresentationHash',
            type: 'bytes32'
          },
          {
            internalType: 'enum AlastriaPresentationRegistry.Status',
            name: 'status',
            type: 'uint8'
          }
        ],
        name: 'updateSubjectPresentation',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      getSubjectPresentationStatus: {
        constant: true,
        inputs: [
          { internalType: 'address', name: 'subject', type: 'address' },
          {
            internalType: 'bytes32',
            name: 'subjectPresentationHash',
            type: 'bytes32'
          }
        ],
        name: 'getSubjectPresentationStatus',
        outputs: [
          { internalType: 'bool', name: 'exists', type: 'bool' },
          {
            internalType: 'enum AlastriaPresentationRegistry.Status',
            name: 'status',
            type: 'uint8'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      getSubjectPresentationList: {
        constant: true,
        inputs: [{ internalType: 'address', name: 'subject', type: 'address' }],
        name: 'getSubjectPresentationList',
        outputs: [
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'bytes32[]', name: '', type: 'bytes32[]' }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      updateReceiverPresentation: {
        constant: false,
        inputs: [
          {
            internalType: 'bytes32',
            name: 'receiverPresentationHash',
            type: 'bytes32'
          },
          {
            internalType: 'enum AlastriaPresentationRegistry.Status',
            name: 'status',
            type: 'uint8'
          }
        ],
        name: 'updateReceiverPresentation',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      getReceiverPresentationStatus: {
        constant: true,
        inputs: [
          { internalType: 'address', name: 'receiver', type: 'address' },
          {
            internalType: 'bytes32',
            name: 'receiverPresentationHash',
            type: 'bytes32'
          }
        ],
        name: 'getReceiverPresentationStatus',
        outputs: [
          { internalType: 'bool', name: 'exists', type: 'bool' },
          {
            internalType: 'enum AlastriaPresentationRegistry.Status',
            name: 'status',
            type: 'uint8'
          }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      getPresentationStatus: {
        constant: true,
        inputs: [
          {
            internalType: 'enum AlastriaPresentationRegistry.Status',
            name: 'subjectStatus',
            type: 'uint8'
          },
          {
            internalType: 'enum AlastriaPresentationRegistry.Status',
            name: 'receiverStatus',
            type: 'uint8'
          }
        ],
        name: 'getPresentationStatus',
        outputs: [
          {
            internalType: 'enum AlastriaPresentationRegistry.Status',
            name: '',
            type: 'uint8'
          }
        ],
        payable: false,
        stateMutability: 'pure',
        type: 'function'
      }
    },
    AlastriaProxy: {
      Forwarded: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'destination',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          },
          { indexed: false, internalType: 'bytes', name: 'data', type: 'bytes' }
        ],
        name: 'Forwarded',
        type: 'event'
      },
      isOwner: {
        constant: true,
        inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
        name: 'isOwner',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      owner: {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      transfer: {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' }
        ],
        name: 'transfer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      forward: {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'destination', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
          { internalType: 'bytes', name: 'data', type: 'bytes' }
        ],
        name: 'forward',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    },
    AlastriaPublicKeyRegistry: {
      PublicKeyDeleted: {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'publicKey',
            type: 'string'
          }
        ],
        name: 'PublicKeyDeleted',
        type: 'event'
      },
      PublicKeyRevoked: {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'string',
            name: 'publicKey',
            type: 'string'
          }
        ],
        name: 'PublicKeyRevoked',
        type: 'event'
      },
      previousPublishedVersion: {
        constant: true,
        inputs: [],
        name: 'previousPublishedVersion',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      publicKeyList: {
        constant: true,
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'uint256', name: '', type: 'uint256' }
        ],
        name: 'publicKeyList',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      version: {
        constant: true,
        inputs: [],
        name: 'version',
        outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      initialize: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: '_previousPublishedVersion',
            type: 'address'
          }
        ],
        name: 'initialize',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      addKey: {
        constant: false,
        inputs: [{ internalType: 'string', name: 'publicKey', type: 'string' }],
        name: 'addKey',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      revokePublicKey: {
        constant: false,
        inputs: [{ internalType: 'string', name: 'publicKey', type: 'string' }],
        name: 'revokePublicKey',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      deletePublicKey: {
        constant: false,
        inputs: [{ internalType: 'string', name: 'publicKey', type: 'string' }],
        name: 'deletePublicKey',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      getCurrentPublicKey: {
        constant: true,
        inputs: [{ internalType: 'address', name: 'subject', type: 'address' }],
        name: 'getCurrentPublicKey',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      getPublicKeyStatus: {
        constant: true,
        inputs: [
          { internalType: 'address', name: 'subject', type: 'address' },
          { internalType: 'bytes32', name: 'publicKey', type: 'bytes32' }
        ],
        name: 'getPublicKeyStatus',
        outputs: [
          { internalType: 'bool', name: 'exists', type: 'bool' },
          {
            internalType: 'enum AlastriaPublicKeyRegistry.Status',
            name: 'status',
            type: 'uint8'
          },
          { internalType: 'uint256', name: 'startDate', type: 'uint256' },
          { internalType: 'uint256', name: 'endDate', type: 'uint256' }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      }
    },
    BaseAdminUpgradeabilityProxy: {
      AdminChanged: {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'previousAdmin',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newAdmin',
            type: 'address'
          }
        ],
        name: 'AdminChanged',
        type: 'event'
      },
      Upgraded: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementation',
            type: 'address'
          }
        ],
        name: 'Upgraded',
        type: 'event'
      },
      admin: {
        constant: false,
        inputs: [],
        name: 'admin',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      implementation: {
        constant: false,
        inputs: [],
        name: 'implementation',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      changeAdmin: {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'newAdmin', type: 'address' }
        ],
        name: 'changeAdmin',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      upgradeTo: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'newImplementation',
            type: 'address'
          }
        ],
        name: 'upgradeTo',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      upgradeToAndCall: {
        constant: false,
        inputs: [
          {
            internalType: 'address',
            name: 'newImplementation',
            type: 'address'
          },
          { internalType: 'bytes', name: 'data', type: 'bytes' }
        ],
        name: 'upgradeToAndCall',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
      }
    },
    BaseUpgradeabilityProxy: {
      Upgraded: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementation',
            type: 'address'
          }
        ],
        name: 'Upgraded',
        type: 'event'
      }
    },
    Context: {
      constructor: {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
      }
    },
    Eidas: {
      atLeastLow: {
        constant: true,
        inputs: [
          {
            internalType: 'enum Eidas.EidasLevel',
            name: '_eidasLevel',
            type: 'Eidas.EidasLevel'
          }
        ],
        name: 'atLeastLow',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'pure',
        type: 'function'
      },
      atLeast: {
        constant: true,
        inputs: [
          {
            internalType: 'enum Eidas.EidasLevel',
            name: '_eidasLevel',
            type: 'Eidas.EidasLevel'
          },
          {
            internalType: 'enum Eidas.EidasLevel',
            name: '_level',
            type: 'Eidas.EidasLevel'
          }
        ],
        name: 'atLeast',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'pure',
        type: 'function'
      }
    },
    Initializable: {},
    Migrations: {
      last_completed_migration: {
        constant: true,
        inputs: [],
        name: 'last_completed_migration',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      owner: {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      setCompleted: {
        constant: false,
        inputs: [
          { internalType: 'uint256', name: 'completed', type: 'uint256' }
        ],
        name: 'setCompleted',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    },
    OpenZeppelinUpgradesAddress: {},
    Ownable: {
      OwnershipTransferred: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address'
          }
        ],
        name: 'OwnershipTransferred',
        type: 'event'
      },
      initialize: {
        constant: false,
        inputs: [{ internalType: 'address', name: 'sender', type: 'address' }],
        name: 'initialize',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      owner: {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      isOwner: {
        constant: true,
        inputs: [],
        name: 'isOwner',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      renounceOwnership: {
        constant: false,
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      transferOwnership: {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' }
        ],
        name: 'transferOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    },
    Owned: {
      constructor: {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
      },
      owner: {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      isOwner: {
        constant: true,
        inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
        name: 'isOwner',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      transfer: {
        constant: false,
        inputs: [
          { internalType: 'address', name: 'newOwner', type: 'address' }
        ],
        name: 'transfer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    },
    Proxy: {},
    UpgradeabilityProxy: {
      constructor: {
        inputs: [
          { internalType: 'address', name: '_logic', type: 'address' },
          { internalType: 'bytes', name: '_data', type: 'bytes' }
        ],
        payable: true,
        stateMutability: 'payable',
        type: 'constructor'
      },
      Upgraded: {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementation',
            type: 'address'
          }
        ],
        name: 'Upgraded',
        type: 'event'
      }
    }
  },
  zeroValue:
    '00000000000000000000000000000000000000000000000000000000000000000000'
}
