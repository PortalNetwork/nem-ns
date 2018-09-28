import nem from 'nem-sdk';
import transaction from '../lib/transaction';
import {
	isDomainRegistered,
	transferDomain,
	isAddressDomainOwner,
	getAddressMapping,
	getDomainMapping
} from '../lib/helper';
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
/**
 * The NNS registry contract.
 */

class RESOLVER {
	constructor(){
		// Create an NIS endpoint object
		this.endpoint = nem.model.objects.create("endpoint")(NIS_HOST, NIS_PORT);
		// Create a common object holding key 
		this.common = nem.model.objects.create("common")(PASSWORD, RESOLVER_PRIVATE_KEY);
	}
	/**
	 * @description Set address mapping to domain name
	 * @param {*} owner 
	 * @param {*} domain 
	 * @param {*} addr 
	 */
	async setAddress(owner, domain, addr) {
		if(await isDomainRegistered(domain) === true && await isAddressDomainOwner(domain, owner)){
			const setAddressMsg = JSON.stringify(
				{
					name: domain,
					address: addr
				}
			);
			const hash = await transaction.transfer( "REGISTRY", RESOLVER_ADDRESS, 0, setAddressMsg);
			return hash;
		}
		return false;
	}
	/**
	 * @description Get domain name mapped to address
	 * @param {*} addr 
	 */
	async name(addr) {
		//TODO: query incoming TX in resolver account
		const name = await getAddressMapping(addr);
		if(name){
			return name;
		}
		return 0;
	}
	/**
	 * @description Ger address mapped to domain
	 * @param {*} domain 
	 */
	async addr(domain) {
		//await isDomainRegistered({});
		if(await isDomainRegistered(domain) === true){
			const address = await getDomainMapping(domain);
			if(address){
				return address;
			}
		}
		return 0;
	}

}
module.exports = new RESOLVER();

