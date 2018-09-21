import nem from 'nem-sdk';
import search from './search';
import transaction from './transaction';
import {
	NIS_HOST,
	NIS_PORT,
	NAMESPACE,
	PASSWORD,
	REGISTRY_PRIVATE_KEY,
	RESOLVER_PRIVATE_KEY,
	REGISTRY_ADDRESS,
	RESOLVER_ADDRESS
} from '../constant/NNS';
import {DOMAIN_MOSAIC_DEFINITION} from '../constant/NNS';

export const isDomainRegistered = async (domain) => {
	// console.log(namespace);
	// const mosaicDefArr = await search.getMosaicDef(namespace);
	// return (mosaicDefArr.indexOf(domain) == -1) ? false: true;

	const mosaicArr = await search.getAccountOwnedMosaic(REGISTRY_ADDRESS);
	for(var i=0; i < mosaicArr.length; i++){
		if(mosaicArr[i].mosaicId.name === domain){
			console.log("domain registered");
			return true;
		}
	}
	return false;
};

export const transferDomain = async(domain, onwer) => {
	return await transaction.transferMosaic(NAMESPACE, domain, onwer, 1, DOMAIN_MOSAIC_DEFINITION, `You own the ${domain}`);
};
/**
 * setAddress msg format:
 * {
 * 	name: "domainName",
 * 	address: "address"
 * }
 */

const parseResolveMsg = (msg) => {
	const jsonParseResult = JSON.parse(nem.utils.format.hexMessage(msg));
	return jsonParseResult;
}
export const getDomainMapping = async(name) => {
	const pageSize = 25;
	let txArr;
	let result = [];
	do {
		txArr = await search.getIncomingTxs(RESOLVER_ADDRESS);
		for(var i=0; i < txArr.length; i++){
			if(name){
				const resolveMsg = parseResolveMsg(txArr[i].transaction.message) ;
				if(resolveMsg.name == name){
					return resolveMsg.address;
				}
			}else{
				result.push(txArr[i]);
			}
		}
		if(txArr.length == pageSize) {
			id = txArr[pageSize - 1].meta.id;
		}
	} while (txArr.length == pageSize);
	return 0;
};

export const getAddressMapping = async(address) => {
	const pageSize = 25;
	let txArr;
	let result = [];
	do {
		txArr = await search.getIncomingTxs(RESOLVER_ADDRESS);
		for(var i=0; i < txArr.length; i++){
			if(address){
				const resolveMsg = parseResolveMsg(txArr[i].transaction.message) ;
				if(resolveMsg.address == address){
					return resolveMsg.name;
				}
			}else{
				result.push(txArr[i]);
			}
		}
		if(txArr.length == pageSize) {
			id = txArr[pageSize - 1].meta.id;
		}
	} while (txArr.length == pageSize);
	return 0;
};

export const isAddressDomainOwner = async (domain, address) => {
	const mosaicArr = await search.getAccountOwnedMosaic(address);
	for(var i=0; i < mosaicArr.length; i++){
		if(mosaicArr[i].mosaicId.name === domain){
			return true;
		}
	}
	return false;
};

export const createDomain = async (domain, owner) => {
	const hash = await transaction.createMosaic("REGISTRY", domain, DOMAIN_MOSAIC_DEFINITION, `owner:${owner}`);
	if(hash){
		return hash;
	}
	return false;
};

export const createWallet = async (walletName) => {
	// Convert the random bytes to hex
	var privateKey = nem.crypto.helpers.derivePassSha(walletName, 6000).priv;
	console.log(privateKey);
	var keyPair = nem.crypto.keyPair.create(privateKey);
	console.log(keyPair);
	// Set a password
	var password = "P@ssw0rd";
	// Create a private key wallet
	var wallet = nem.model.wallet.importPrivateKey(walletName, password, privateKey, nem.model.network.data.testnet.id);    
	console.log(wallet);
};