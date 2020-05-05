import 'mocha'
import * as demo from '../../src/txFactory/transactionFactory'

const web3 = require('web3')
const sinon = require('sinon')
var chai = require('chai')
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe('validate public key in several situations with dates', function () {
    it('should return error if the public key is not found', () => {
        sinon.stub(demo.transactionFactory.publicKeyRegistry, 'getPublicKeyStatusDecodedAsJSON')
            .resolves({
                    "exists": false,
                    "status": 0,
                    "startDate": 0,
                    "endDate": 0
                })

        const fakePublicKey = "0x00000000000000000000000000000000";
        const date = new Date('January 17, 1996 03:24:00').getTime();
        const fakeSubject = "0x00000000000000000000000000000000";
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(web3, fakeSubject, fakePublicKey, date)).to.eventually
        .be.rejectedWith("Public key does not exist")
        .and.be.an.instanceOf(Error);
        sinon.restore();
    });

    it('should return true if the date sent by the user is between status dates', () => {
        sinon.stub(demo.transactionFactory.publicKeyRegistry, 'getPublicKeyStatusDecodedAsJSON')
            .resolves({
                "exists": true,
                "status": 0,
                "startDate": new Date('December 17, 1995 03:24:00').getTime(),
                "endDate": new Date('December 17, 1996 03:24:00').getTime()
            })
        const fakePublicKey = "0x00000000000000000000000000000000";
        const date = new Date('January 17, 1996 03:24:00').getTime();
        const fakeSubject = "0x00000000000000000000000000000000";
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(web3, fakeSubject, fakePublicKey, date)).to.eventually.be.true;

        sinon.restore();
    });

    /*it('should return true if the date sent by the user is the same as the startDate of validity', () => {
        const startDate = new Date('December 17, 1995 03:24:00').getTime();
        sinon.stub(demo.transactionFactory.publicKeyRegistry, 'getPublicKeyStatusDecodedAsJSON')
            .callsFake(function fakeFn() {
                return {
                    "exists": true,
                    "status": 0,
                    "startDate": startDate,
                    "endDate": new Date('December 17, 1996 03:24:00').getTime()
                }
            });
        const fakePublicKey = "0x00000000000000000000000000000000";
        const fakeSubject = "0x00000000000000000000000000000000";
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(web3, fakeSubject, fakePublicKey, startDate)).to.be.true;

        sinon.restore();
    });

    it('should return true if the date sent by the user is the same as the endDate of validity', () => {
        const endDate = new Date('December 17, 1996 03:24:00').getTime();
        sinon.stub(demo.transactionFactory.publicKeyRegistry, 'getPublicKeyStatusDecodedAsJSON')
            .callsFake(function fakeFn() {
                return {
                    "exists": true,
                    "status": 0,
                    "startDate": new Date('December 17, 1995 03:24:00').getTime(),
                    "endDate": endDate
                }
            });
        const fakePublicKey = "0x00000000000000000000000000000000";
        const fakeSubject = "0x00000000000000000000000000000000";
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(web3, fakeSubject, fakePublicKey, endDate)).to.be.true;

        sinon.restore();
    });

    it('should return false if the date sent by the user is prior to validity', () => {
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
        const fakeSubject = "0x00000000000000000000000000000000";
        const priorDate = new Date('December 17, 1990 03:24:00').getTime();
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(web3, fakeSubject, fakePublicKey, priorDate)).to.be.false;

        sinon.restore();
    });

    it('should return false if the date sent by the user is after validity has passed', () => {
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
        const fakeSubject = "0x00000000000000000000000000000000";
        const passedDate = new Date('December 17, 2000 03:24:00').getTime();
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(web3, fakeSubject, fakePublicKey, passedDate)).to.be.false;

        sinon.restore();
    });*/
});