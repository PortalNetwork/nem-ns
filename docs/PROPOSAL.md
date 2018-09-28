# Proposal based on NEM feature of mosaics

Each mosaic is viewed as a unique domain name.

`Mosaic` is the smart asset on the NEM blockchain. You can imagine it as a kind of token that you can define on your own. XEM is the native cryptocurrency on NEM which is also a kind of mosaic. Anyone can create as many Mosaics as they need.

## Register a new domain name

There is a key feature that can be used to function as a domain record - Mosaic. When User Account(refer as UA) wants to register a new domain name, UA can send a transaction to Registry Account (refer as RA). Once the incoming transaction from RA is confirmed, UA will receive a Mosaic created by RA named as the registered domain name. The created Mosaic is non-transaferable, its initial supply is 1 and immutable.

## Set a domain-to-address mapping

UA can send a setResolverRequest transaction(specific format message within the transaction) to RA to point out what address or content will be appended on the domain name. RA can validate if the setResolverRequest transaction is available through comparing the sender address with the Mosaic owner.
Once the setResolverRequest transaction is confirmed, RA will send setResolver transaction to Resolver Account with the same message within the setResolverRequest transaction.

## Look up address which is mapping to the domain name

Once the setResolver transaction is confirmed, anyone can lookup the domain-to-address mapping through directly query incoming transactions of Resolver Account of which sender is RA.

## Transfer domain to new UA

UA can transfer the domain it owns to a different account via sending the Mosaic back transaction to RA including of the meassge describes which the new UA is. As the sendMosaicBack transaction to RA is confirmed, RA will send the Mosaic to new UA.

## Set subdomain

Domain owner can create subdomain on its owned domain and set address mapping on it. Through sending the same setResolverRequest transaction to RA.


# Proposal based on address

Each address is viewed as domain name.

## Register a new domain name

Create a new address related to domain name, for example:
```js
const createDomain = (iterateCnt, walletName, password) => {
	// Convert the random bytes to hex
	const privateKey = nem.crypto.helpers.derivePassSha(walletName, iterateCnt).priv;
	console.log(privateKey);
	// Create a private key wallet
	const wallet = nem.model.wallet.importPrivateKey(walletName, password, privateKey, nem.model.network.data.testnet.id);    
    return wallet;
}
//Register a domain named 'portal'
console.log(createDomain(6000, 'portal', 'P@ssw0rd'));
// output addeess: a87ad157e2f3f7bab289d40d817deebe96f99f159b35b4287bc95134f4b0c42b
```
Once address related to domain name is created, Registry Account can send transaction to the address to mark it as owned.

Everytime when someone lookup a domain named `portal`, we can find its related address "a87ad157e2f3f7bab289d40d817deebe96f99f159b35b4287bc95134f4b0c42b" and check if it's owned.

## Set a domain-to-address mapping

The approach is as same as setResolverRequest described above, the only difference is that Registry Account won't send setResolver transaction to the Resolver Account, send to address related to the domain name instead.

## Look up address which is mapping to the domain name

Once the setResolver transaction is confirmed, anyone can lookup the domain-to-address mapping through directly query incoming transactions of address related to the domain.

## Transfer domain to new UA

UA can transfer the domain it owns to a different account via sending a transaction to RA including of the meassge describes which the new UA is. As the transaction to RA is confirmed, RA will send a transaction to address related to the domain to announce its new owner

## Set subdomain

Domain owner can create subdomain on its owned domain and set address mapping on it. Through sending a setSubdomain transaction to RA. As the transaction to RA is confirmed, RA will send a transaction to address related to the domain with message which is including of subdomain name and its owner.

# The comparison between two proposal

 --                           | Mosaic based                        | Address based
------------------------------|:------------------------------------|:-------------------------------
Domain                        | Mosaic                              | Address
Registry Information storage  | Registry Account                    | Address(made of domain name)
Resolver Information storage  | Resolver Account                    | Address(made of domain name)
Registrar Information storage | Registrar Account                   | Address(made of domain name)
Subdomain                     | Mosaic(different from parent domain)| Transaction in Address(made of parent domain)
Register New domain cost      | 10 XEM per domain                   | Transaction fee(around 0.2 XEM)