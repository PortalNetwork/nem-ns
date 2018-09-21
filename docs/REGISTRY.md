# Registry

The NNS registry consists of a single smart contract that maintains a list of all domains and subdomains, and stores three critical pieces of information about each:
- The owner of the domain
- The resolver for the domain
- The time-to-live for all records under the domain

The owner of a domain may be either an external account (a user) or a smart contract. A registrar is simply a smart contract that owns a domain, and issues subdomains of that domain to users that follow some set of rules defined in the contract.

Owners of domains in the NNS registry may:
- Set the resolver and TTL for the domain
- Transfer ownership of the domain to another address
- Change the ownership of subdomains

The NNS registry is deliberately straightforward, and exists only to map from a name to the resolver responsible for it.

## Class Definition

Here is an abstract class definition of registry:
```javascript
class REGISTRY {

	function register(domain, owner) {
		/**
		* @description: Register a new domain
		*/
	}

	function transfer(domain, newOwner){
		/**
		* @description: Transfer a existed domain to a new account
		*/
	}

	function setAddress(domain, address){
		/**
		* @description: Set address mapping to a existed domain
		*/
	}

	function setSubdomain(subDomain, domain, owner) {
		/**
		* @description: Create a subdomain based on an existed domain
		*/
	};
}
```
### Method

#### `REGISTRY.register`
##### Parameters
- `domain`: `String` - domain name that user want to register
- `owner`: `String` - hash of the owner address

##### Example
```js
	import REGISTRY from 'Registry';

	REGISTRY.register("blockchain", "TCMHFQXVKHJNBJ2M5KJ57YSHY7OMK3V36HAE53G7");
```
##### Returns
- `status`: `Boolean` - if domain is registered or not

***

#### `REGISTRY.transfer`
##### Parameters
- `domain`: `String` - domain name that user want to transfer
- `newOwner`: `String` - hash of the new owner address

##### Example
```js
	import REGISTRY from 'Registry';

	REGISTRY.transfer("blockchain", "TCMHFQXVKHJNBJ2M5KJ57YSHY7OMK3V36HAE53G7");
```
##### Returns
- `status`: `Boolean` - if domain is transferred or not

***

#### `REGISTRY.setAddress`
##### Parameters
- `domain`: `String` - domain name that user want to append address on
- `address`: `String` - hash of the account address

##### Example
```js
	import REGISTRY from 'Registry';

	REGISTRY.setAddress("blockchain", "TCMHFQXVKHJNBJ2M5KJ57YSHY7OMK3V36HAE53G7");
```
##### Returns
- `status`: `Boolean` - if address is appended or not

***

#### `REGISTRY.setSubdomain`
##### Parameters
- `subDomain`: `String` - subdomain name that onwer want to create
- `domain`: `String` - domain name that owner owns and will create based on it
- `address`: `String` - hash of the owner address

##### Example
```js
	import REGISTRY from 'Registry';

	REGISTRY.setSubdomain("nameservice", "blockchain", "TCMHFQXVKHJNBJ2M5KJ57YSHY7OMK3V36HAE53G7");
```
##### Returns
- `status`: `Boolean` - if subDomain is created or not