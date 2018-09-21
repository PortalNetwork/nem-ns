import axios from 'axios';
import {
	AccountHttp,
	Address,
	NEMLibrary,
	NetworkTypes
} from "nem-library";

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
/**
 * The QNS registry contract.
 */
const NIS_URL = `${process.env.NIS_HOST}:${process.env.NIS_PORT}`;
const pageSize = 100;

const httpReqHelper = async (params, path) =>{
	const res = await axios
	.get(`${NIS_URL}${path}`, {
		params: params
	});
	return res;
}
const getMosaicDefHelper = async (namespace, endId) => {
	const params = {
		namespace,
		pageSize,
	};
	if(endId) {
		params.id = endId;
	}

	const res = await httpReqHelper(params, '/namespace/mosaic/definition/page');

	return res.data.data;
}
const getAccountOwnMosaicHelper = async (address) => {
	const params = {
		address
	};
	const res = await httpReqHelper(params, '/account/mosaic/owned');

	return res.data.data;
}

class SEARCH {
	async getMosaicDef(namespaceId, mosaicName='') {
		let result = [];
		let mosaicDefArr;
		let id;
		do {
			mosaicDefArr = await getMosaicDefHelper(namespaceId, id);
			for(var i=0; i < mosaicDefArr.length; i++){
				if(mosaicName && mosaicDefArr[i].mosaic.id.name == mosaicName){
					return [mosaicDefArr[i]];
				}else{
					result.push(mosaicDefArr[i]);
				}
			}
			
			if(mosaicDefArr.length == pageSize) {
				id = mosaicDefArr[pageSize - 1].meta.id;
			}
		} while (mosaicDefArr.length == pageSize);
		return result;
	}

	async getAccountOwnedMosaic(address) {
		let result = [];
		let mosaicDefArr;
		let id;
		mosaicDefArr = await getAccountOwnMosaicHelper(address);
		return mosaicDefArr;
	}

	async chkTransactionStatus(address, hash){
		const params = {
			address,
			hash
		}
		const res = await httpReqHelper(params, '/account/transfers/all');
		return res;
	}
	async  getOutgoingTxs(address) {
		const params = {
			address
		}
		const res = await httpReqHelper(params, '/account/transfers/outgoing');
		return res.data.data;
	}

	async  getIncomingTxs(address, id) {
		const params = {
			address
		}
		if(id){
			params.id = id;
		}
		const res = await httpReqHelper(params, '/account/transfers/incoming');
		return res.data.data;
	}

	
}




module.exports = new SEARCH();