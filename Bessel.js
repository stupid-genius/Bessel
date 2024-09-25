// export function factorial(n){
// 	if(n<0){
// 		return NaN;
// 	}

// 	if(factorial.cache[n] === undefined){
// 		factorial.cache[n] = n * factorial(n - 1);
// 	}
// 	return factorial.cache[n];
// }
// export function factorial(n){
// 	if(n<0){
// 		return NaN;
// 	}
// 	if(n>18){
// 		throw new Error('Exceeds MAX_SAFE_INTEGER');
// 	}

// 	const maxCache = Object.keys(factorial.cache).length-1;
// 	if(maxCache < n){
// 		let result = factorial.cache[maxCache];
// 		for(let i=maxCache+1; i<=n; ++i){
// 			result *= i;
// 			factorial.cache[i] = result;
// 		}
// 	}
// 	return factorial.cache[n];
// }
// Object.defineProperty(factorial, 'cache', {
// 	value: {
// 		0: 1,
// 		1: 1
// 	}
// });
const factorialPreComputed = Object.freeze({
	0: 1,
	1: 1,
	2: 2,
	3: 6,
	4: 24,
	5: 120,
	6: 720,
	7: 5040,
	8: 40320,
	9: 362880,
	10: 3628800,
	11: 39916800,
	12: 479001600,
	13: 6227020800,
	14: 87178291200,
	15: 1307674368000,
	16: 20922789888000,
	17: 355687428096000,
	18: 6402373705728000
});
export function factorial(n){
	if(n<0){
		return NaN;
	}
	return factorialPreComputed[n] ?? (() => {throw new Error('Exceeds MAX_SAFE_INTEGER');})();
}

export function Bessel(order){
	if(!new.target){
		return new Bessel(...arguments);
	}

	const precision = Bessel.PRECISION;
	const maxIterations = Bessel.ITERATIONS;
	Object.defineProperties(this, {
		J: {
			value: function(x){
				let sum = 0;
				let term;
				let k = 0;

				do{
					term = Math.pow(-1, k) * Math.pow(x / 2, order + 2 * k) / (factorial(k) * factorial(order + k));
					sum += term;
					// k++;
				}while(Math.abs(term) > precision && ++k <= maxIterations);

				return sum;
			}
		},
		Y: {
			value: function(x){
				return 'not implemented';
				// if(x === 0){
				// 	throw new Error("Y(x) is undefined for x = 0");
				// }

				// const Jn = this.J(x);
				// // console.log(Jn);
				// const JnegN = new Bessel(-order).J(x);
				// // console.log(JnegN);

				// const r = (JnegN - Math.cos(order * Math.PI) * Jn) / Math.sin(order * Math.PI);
				// console.log(r);
				// return r;
			}
		}
	});
}
Object.defineProperties(Bessel, {
	PRECISION: {
		writable: true,
		value: 1e-10
	},
	ITERATIONS: {
		writable: true,
		value: 18
	}
});
