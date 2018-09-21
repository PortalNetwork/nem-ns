const REGISTRY = require('../contracts/registry');
const RESOLVER = require('../contracts/resolver');
const SEARCH = require('../lib/search');
const transaction = require('../lib/transaction');
describe('Registry test', () => {
	it('Register new domain', async() => {
		const res = await REGISTRY.register('myowndomain2', 'TAFNNK3ZK73Y7U5GTTQAB32A2CWPG7XLKYPIEMBF');
		console.log(res);
		//await SEARCH.chkTransactionStatus();
	});
	// it('Set Address', async() => {
	// 	const res = await RESOLVER.setAddress(process.env.REGISTRY_ADDRESS, 'contract', process.env.REGISTRY_ADDRESS);
	// 	console.log(res);
	// 	//await SEARCH.chkTransactionStatus();
	// });
	// it('Lookup Address', async() => {
	// 	const res = await RESOLVER.addr("contract");
	// 	console.log(res);
	// 	//await SEARCH.chkTransactionStatus();
	// });
	// it('Register new domain', async() => {
	//   const res = await REGISTRY.register('contract', 'TAFNNK3ZK73Y7U5GTTQAB32A2CWPG7XLKYPIEMBF');
	//   console.log(res);
	//   //await SEARCH.chkTransactionStatus();
	// });
	// it('get Account Owned Mosaic', async() => {
	// 	const res = await SEARCH.getAccountOwnedMosaic('TCMHFQXVKHJNBJ2M5KJ57YSHY7OMK3V36HAE53G7');
	// 	console.log(res);
	// });
	// it('get Account Owned Mosaic Definition', async() => {
	// 	const res = await SEARCH.getMosaicDef('name.service', 'bns');
	// 	console.log(res);
	// });
	// it('get Account Owned Mosaic', async() => {
	// 	const res = await REGISTRY.transfer('bns', 'TAFNNK3ZK73Y7U5GTTQAB32A2CWPG7XLKYPIEMBF', 'TCMHFQXVKHJNBJ2M5KJ57YSHY7OMK3V36HAE53G7');
	// 	console.log(res);
	// });
	// it('Check tx status', async() => {
	// 	const res = await SEARCH.chkTransactionStatus('TAFNNK3ZK73Y7U5GTTQAB32A2CWPG7XLKYPIEMBF', 'TAFNNK3ZK73Y7U5GTTQAB32A2CWPG7XLKYPIEMBF');
	// 	console.log(res);
	// });
		
});