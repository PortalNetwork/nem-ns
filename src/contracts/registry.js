import nem from 'nem-sdk';
import transaction from '../lib/transaction';
import {
	isDomainRegistered,
	transferDomain,
	isAddressDomainOwner,
	createDomain
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
import resolver from './resolver';
/**
 * The NNS registry contract.
 */

class REGISTRY {
	constructor(){
		// Create an NIS endpoint object
		this.endpoint = nem.model.objects.create("endpoint")(NIS_HOST, NIS_PORT);
		// Create a common object holding key 
		this.common = nem.model.objects.create("common")(PASSWORD, REGISTRY_PRIVATE_KEY);
	}

	/**
	 * @description Register a new domain
	 * @param {*} domain 
	 * @param {*} owner 
	 */
	async register(domain, owner) {
		//await isDomainRegistered({});
		if(await isDomainRegistered(domain) != true){
			const hash = await createDomain(domain, owner);
			if(hash){
				return hash;
			}
		}
		return false;
	}

	/**
	 * @description transfer domain to newOwner
	 * @param {*} domain 
	 * @param {*} oldOwner 
	 * @param {*} newOwner 
	 */
	async transfer(domain, oldOwner, newOwner){
		if(await isAddressDomainOwner(domain, oldOwner)){
			const res = await transferDomain(domain, newOwner);
			return res;
		}
		return false;
	}

	async setSubdomain(subDomain, domain, owner) {
		/**
		* @definition: Create a subdomain based on an existed domain
		*/
	};
}
module.exports = new REGISTRY();

