import 'mocha'
import { expect } from 'chai'
import * as demo from '../../src/txFactory/transactionFactory'

const web3 = require('web3')
const sinon = require('sinon')

describe('validate public key in several situations with dates', function () {
    it('should return false if the public key is not found', () => {
        sinon.stub(demo.transactionFactory.publicKeyRegistry, 'getPublicKeyStatusDecodedAsJSON')
            .callsFake(function fakeFn() {
                return {
                    "exists": false,
                    "status": 0,
                    "startDate": 0,
                    "endDate": 0
                }
            });
        const fakePublicKey = "0x00000000000000000000000000000000";
        const date = new Date('January 17, 1996 03:24:00').getTime();
        const fakeSubject = "0x00000000000000000000000000000000";
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(web3, fakeSubject, fakePublicKey, date)).to.be.false;

        sinon.restore();
    });

    it('should return true if the date sent by the user is between status dates', () => {
        sinon.stub(demo.transactionFactory.publicKeyRegistry, 'getPublicKeyStatusDecodedAsJSON')
            .callsFake(function fakeFn() {
                return {
                    "exists": true,
                    "status": 0,
                    "startDate": new Date('December 17, 1995 03:24:00').getTime(),
                    "endDate": new Date('December 17, 1996 03:24:00').getTime()
                }
            });
        const fakePublicKey = "0x00000000000000000000000000000000";
        const date = new Date('January 17, 1996 03:24:00').getTime();
        const fakeSubject = "0x00000000000000000000000000000000";
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(web3, fakeSubject, fakePublicKey, date)).to.be.true;

        sinon.restore();
    });
});