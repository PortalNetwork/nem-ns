# How To Send Transaction

Here is the code snippet illustrates how to send txs through NEM-SDK

## Send transaction without mosaic

```javascript
import nem from 'nem-sdk';

async transfer(){
	// Create an NIS endpoint object
	const endpoint = nem.model.objects.create("endpoint")(process.env.NIS_HOST, process.env.NIS_PORT);
	// Create a common object holding key 
	const common = nem.model.objects.create("common")(process.env.PASSWORD, process.env.PRIVATE_KEY);
	// Create variable to store our mosaic definitions, needed to calculate fees properly (already contains xem definition)
	let mosaicDefinitionMetaDataPair = nem.model.objects.get("mosaicDefinitionMetaDataPair");
	// Create an un-prepared transfer transaction object (recipientAddr, amount, message)
	const transferTransaction = nem.model.objects.create("transferTransaction")("TAFNNK3ZK73Y7U5GTTQAB32A2CWPG7XLKYPIEMBF", 1, "send xem");

	// Prepare the transfer transaction object
	const transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.testnet.id);
	
	// Serialize transfer transaction and announce
	console.log(await nem.model.transactions.send(common, transactionEntity, endpoint));
}
```

## Send transaction with mosaic

```javascript
import nem from 'nem-sdk';

async transferMosaic(){
	// Create an NIS endpoint object
	const endpoint = nem.model.objects.create("endpoint")(process.env.NIS_HOST, process.env.NIS_PORT);
	// Create a common object holding key 
	const common = nem.model.objects.create("common")(process.env.PASSWORD, process.env.PRIVATE_KEY);
	// Create variable to store our mosaic definitions, needed to calculate fees properly (already contains xem definition)
	let mosaicDefinitionMetaDataPair = nem.model.objects.get("mosaicDefinitionMetaDataPair");
	// Create an un-prepared mosaic transfer transaction object (use same object as transfer tansaction)
	const transferTransaction = nem.model.objects.create("transferTransaction")("TAFNNK3ZK73Y7U5GTTQAB32A2CWPG7XLKYPIEMBF", 1, "send mosaic");
	// Create another mosaic attachment
	const mosaicAttachment = nem.model.objects.create("mosaicAttachment")("name.service", "bns", 1); // 1: the micro unit of mosaic
	// Push attachment into transaction mosaics
	transferTransaction.mosaics.push(mosaicAttachment);

	// Need mosaic definition of name.service:bns to calculate adequate fees, so we get it from network.
	// Otherwise you can simply take the mosaic definition from api manually (http://bob.nem.ninja/docs/#retrieving-mosaic-definitions) 
	// and put it into mosaicDefinitionMetaDataPair model (objects.js) next to nem:xem (be careful to respect object structure)
	const res = await nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId);
	// Look for the mosaic definition(s) we want in the request response (Could use ["eur", "usd"] to return eur and usd mosaicDefinitionMetaDataPairs)
	const neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, ["bns"]);
	// Get full name of mosaic to use as object key
	const fullMosaicName  = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);
	// Check if the mosaic was found
	if(undefined === neededDefinition[fullMosaicName]) return console.error("Mosaic not found !");

	// Set eur mosaic definition into mosaicDefinitionMetaDataPair
	mosaicDefinitionMetaDataPair[fullMosaicName] = {};
	mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = neededDefinition[fullMosaicName];

	//NEM-SDK has bug, we must set current mosaic quantity of account manually
	const {data} = await nem.com.requests.account.mosaics.owned(endpoint, "TCMHFQXVKHJNBJ2M5KJ57YSHY7OMK3V36HAE53G7")
	const {quantity} = data.filter((data) => {
		return (`${data.mosaicId.namespaceId}:${data.mosaicId.name}` == fullMosaicName);
		
	})[0];
	mosaicDefinitionMetaDataPair[fullMosaicName].supply = quantity;

	// Prepare the transfer transaction object
	const transactionEntity = nem.model.transactions.prepare("mosaicTransferTransaction")(common, transferTransaction, mosaicDefinitionMetaDataPair, nem.model.network.data.testnet.id);
	
	// Serialize transfer transaction and announce
	console.log(await nem.model.transactions.send(common, transactionEntity, endpoint));
}
```

## [Reference](https://github.com/QuantumMechanics/NEM-sdk#3---transactions)