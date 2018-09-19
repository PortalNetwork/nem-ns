# Proposal based on NEM features

## Register a new domain name

There is a key feature that can be used to function as a domain record - Mosaic. When User Account(refer as UA) wants to register a new domain name, UA can send a transaction to Registry Account (refer as RA). Once the incoming transaction from RA is confirmed, UA will receive a Mosaic created by RA named as the registered domain name. The created Mosaic is non-transaferable, its initial supply is 1 and immutable.

## Set a domain-to-address mapping

UA can send a setResolverRequest transaction(specific format message within the transaction) to RA to point out what address or content will be appended on the domain name. RA can validate if the setResolverRequest transaction is available through comparing the sender address with the Mosaic owner.
Once the setResolverRequest transaction is confirmed, RA will send setResolver transaction to Resolver Account with the same message within the setResolverRequest transaction.

## Look up address which is mapping to the domain name

Once the setResolver transaction is confirmed, anyone can lookup the domain-to-address mapping through directly query incoming transactions of Resolver Account of which sender is RA.

## Transfer domain to new UA

UA can transfer the domain it owns to a different via sending the Mosaic back transaction to RA including of the meassge describes which the new UA is. As the sendMosaicBack transaction to RA is confirmed, RA will send the Mosaic to new UA.