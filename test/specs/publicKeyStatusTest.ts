import 'mocha'
import { expect } from 'chai'
import * as demo from '../../src/txFactory/transactionFactory'

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
        console.log(demo.transactionFactory.publicKeyRegistry.getPublicKeyStatusDecodedAsJSON(1,1,1));
        expect(demo.transactionFactory.publicKeyRegistry.isPublicKeyValidForDate(1, 1, 1, 1)).to.be.false;
    })
});