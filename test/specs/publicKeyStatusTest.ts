import 'mocha'
import { expect } from 'chai'
import * as demo from '../../src/txFactory/transactionFactory'

const web3 = require('web3')
const sinon = require('sinon')

describe('validate public key in several situations with dates', function () {
    before(() => {
        sinon.stub(demo.transactionFactory.publicKeyRegistry, 'getPublicKeyStatusDecodedAsJSON')
            .callsFake(function fakeFn() {
                return {
                "exists": false,
                "status": 0,
                "startDate": 0,
                "endDate": 0
                }
            });
    });

    it('should return false if the public key is not found', () => {
        const fakePublicKey = "0x00000000000000000000000000000000";
        const date = 1587815151740;
        const fakeSubject = "0x00000000000000000000000000000000";
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(web3, fakeSubject, fakePublicKey, date)).to.be.false;
    })
});