const { assert } = require('chai');
const { default: Logger } = require('log-ng');
const { Bessel, factorial } = require('./Bessel');

const logger = new Logger('spec.js');

describe('Factorial', function(){
	it('should handle base cases', function(){
		assert.strictEqual(factorial(0), 1);
		assert.strictEqual(factorial(1), 1);
		assert.isNaN(factorial(-1));
		assert.throws(() => factorial(19));
	});

	it('should handle small input values', function(){
		assert.strictEqual(factorial(2), 2);
		assert.strictEqual(factorial(3), 6);
		assert.strictEqual(factorial(4), 24);
		assert.strictEqual(factorial(5), 120);
		assert.strictEqual(factorial(6), 720);
	});

	it('should handle large output values', function(){
		assert.strictEqual(factorial(17), 355687428096000);
		assert.strictEqual(factorial(18), 6402373705728000);
	});
});
describe('Bessel', function(){
	before(function(){
		Logger.setLogLevel('debug');
	});
	describe('First kind', function(){
		it('should correctly compute BJ_0', function(){
			const bessel = Bessel(0);
			assert.strictEqual(bessel.J(0), 1);
			assert.strictEqual(bessel.J(1), 0.7651976865579572);
			assert.strictEqual(bessel.J(2), 0.22389077914116032);
			assert.strictEqual(bessel.J(3), -0.2600519549020057);
			assert.strictEqual(bessel.J(4), -0.3971498098621513);
		});
		it('should correctly compute BJ_1', function(){
			const bessel = Bessel(1);
			assert.strictEqual(bessel.J(0), 0);
			assert.strictEqual(bessel.J(1), 0.4400505857450832);
			assert.strictEqual(bessel.J(2), 0.5767248077576261);
			assert.strictEqual(bessel.J(3), 0.3390589585265151);
			assert.strictEqual(bessel.J(4), -0.0660433280233066);
		});
		it('should allow adjusting precision', function(){
			Bessel.PRECISION = 1e-1;
			const bessel = Bessel(0);
			Bessel.PRECISION = 1e-10;
			assert.strictEqual(bessel.J(0), 1);
			assert.strictEqual(bessel.J(1), 0.765625);
			assert.strictEqual(bessel.J(2), 0.2222222222222222);
		});
		it('should allow adjusting iterations', function(){
			Bessel.ITERATIONS = 4;
			const bessel = Bessel(0);
			Bessel.ITERATIONS = 18;
			assert.strictEqual(bessel.J(1), 0.76519775390625);
		});
	});

	describe.skip('Second kind', function(){
		it('should correctly compute BY_0', function(){
			const bessel = Bessel(0);
			assert.throws(() => bessel.Y(0));
			assert.isNaN(bessel.Y(1));
			assert.strictEqual(bessel.Y(2), 1);
			// assert.strictEqual(bessel.Y(3), 2);
			// assert.strictEqual(bessel.Y(4), 3);
		});
		it('should correctly compute BY_1', function(){
			const bessel = Bessel(1);
			assert.throws(() => bessel.Y(0));
			assert.isNaN(bessel.Y(1));
			assert.strictEqual(bessel.Y(2), 1);
			assert.strictEqual(bessel.Y(3), 1);
			assert.strictEqual(bessel.Y(4), 1);
		});
	});
});
