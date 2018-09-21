import nem from 'nem-sdk';

/**
 * The QNS registry contract.
 */

const ACCOUNT_PRIVATE_KEY = {
	"RESOLVER": process.env.RESOLVER_PRIVATE_KEY,
	"REGISTRY": process.env.REGISTRY_PRIVATE_KEY
}
const endpoint = nem.model.objects.create("endpoint")(process.env.NIS_HOST, process.env.NIS_PORT);

class TRANSACTION {
	async createMosaic(sender, domain, mosaicDefinition, descrption) {
		const common = nem.model.objects.create("common")(process.env.PASSWORD, ACCOUNT_PRIVATE_KEY[sender]);
		let tx = nem.model.objects.get("mosaicDefinitionTransaction");
		// Define the mosaic
		tx.mosaicName = domain;//mosaic name must be only lowercase
		tx.namespaceParent = mosaicDefinition.namespaceParent;
		tx.mosaicDescription = descrption;
		tx.properties = mosaicDefinition.properties;
		// Prepare the transaction object
		const transactionEntity = nem.model.transactions.prepare("mosaicDefinitionTransaction")(common, tx, nem.model.network.data.testnet.id);

		// Serialize transaction and announce
		const {code, transactionHash} = await nem.model.transactions.send(common, transactionEntity, endpoint);
		if(code == 1){
			return transactionHash.data;
		}else{
			return false;
		}
	}

	async transfer(sender, receiver, amount, message){
		const common = nem.model.objects.create("common")(process.env.PASSWORD, ACCOUNT_PRIVATE_KEY[sender]);
		// Create an un-prepared transfer transaction object (recipientAddr, amount, message)
		const transferTransaction = nem.model.objects.create("transferTransaction")(receiver, amount, message);
	
		// Prepare the transfer transaction object
		const transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.testnet.id);
		
		// Serialize transfer transaction and announce
		const {code, transactionHash} = await nem.model.transactions.send(common, transactionEntity, endpoint);
		if(code == 1){
			return transactionHash.data;
		}else{
			return false;
		}
	}

	async transferMosaic(namespace, mosaicName, receiver, amount, mosaicDefinition, message){
		// Create variable to store our mosaic definitions, needed to calculate fees properly (already contains xem definition)
		let mosaicDefinitionMetaDataPair = nem.model.objects.get("mosaicDefinitionMetaDataPair");
		// Create an un-prepared mosaic transfer transaction object (use same object as transfer tansaction)
		const transferTransaction = nem.model.objects.create("transferTransaction")(receiver, 1, message);
		// Create another mosaic attachment
		const mosaicAttachment = nem.model.objects.create("mosaicAttachment")(namespace, mosaicName, amount); // 1: the micro unit of mosaic
		// Push attachment into transaction mosaics
		console.log(mosaicAttachment);
		transferTransaction.mosaics.push(mosaicAttachment);

		// Get full name of mosaic to use as object key
		const fullMosaicName  = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);
		
		// Set eur mosaic definition into mosaicDefinitionMetaDataPair
		mosaicDefinitionMetaDataPair[fullMosaicName] = {};
		mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = {
			id: { namespaceId: namespace, name: mosaicName },
			properties: mosaicDefinition.properties
		};

		//NEM-SDK has bug, we must set current mosaic quantity of account manually
		const {data} = await nem.com.requests.account.mosaics.owned(endpoint, "TCMHFQXVKHJNBJ2M5KJ57YSHY7OMK3V36HAE53G7")
		const {quantity} = data.filter((data) => {
			return (`${data.mosaicId.namespaceId}:${data.mosaicId.name}` == fullMosaicName);
			
		})[0];
		mosaicDefinitionMetaDataPair[fullMosaicName].supply = quantity;

		// Prepare the transfer transaction object
		const transactionEntity = nem.model.transactions.prepare("mosaicTransferTransaction")(common, transferTransaction, mosaicDefinitionMetaDataPair, nem.model.network.data.testnet.id);
		
		// Serialize transfer transaction and announce
		const response = await nem.model.transactions.send(common, transactionEntity, endpoint);
		const {code, transactionHash} = response;
		console.log(response);
		if(code == 1){
			return transactionHash.data;
		}else{
			return false;
		}
	}

}
module.exports = new TRANSACTION();

