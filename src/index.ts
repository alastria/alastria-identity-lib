export {
  sayHello,
  sayGoodbye,
  setProvider,
  setAccount,
  setContract,
  addSubjectPresentationRegistry
} from './alastria-id'

export {
  getTransactionGenerateAccessToken,
  getTransactionCreateAlastriaIdentity,
  getTransactionCreateIdentity,
  getTransactionDelegateCall,
  getTransactionCheckMessageData,

  getTransactionPayable,
  getTransactionForward,
  getTransactionIsRecover,

  getTransactionAddSubjectPresentation,
  getTransactionUpdateSubjectPresentation,
  getTransactionGetSubjectPresentationStatus,
  getTransactionGetSubjectPresentationList,
  getTransactionUpdateReceiverPresentation,
  getTransactionGetReceiverPresentationStatus,
  getTransactionGetPresentationStatus,

  getTransactionAddSubjectCredential,
  getTransactionDeleteSubjectCredential,
  getTransactionGetSubjectCredentialStatus,
  getTransactionUpdateCredentialStatus,
  getTransactionGetIssuerCredentialStatus,
  getTransactionGetCredentialStatus,

  getTransactionAddKey,
  getTransactionRevokePublicKey,
  getTransactionDeletePublicKey,
  getTransactionGetCurrentPublicKey,
  getTransactionGetPublicKeyStatus
} from './factory/transactions-factory'

export {UserIdentity} from './factory/transactionProcess'
