# NEM Key Feature

Nem supports a number of key features . Here is a brief introduction:

## Namespace and mosaic

`Mosaic` is the smart asset on the NEM blockchain. You can imagine it as a kind of token that you can define on your own. XEM is the native cryptocurrency on NEM which is also a kind of mosaic. Anyone can create as many Mosaics as they need.

Before creating your own mosaics, you have to define `namespace` in your wallet first: Namespace is a domain naming system in NEM which allows users to own domain names on the NEM blockchain. It can be attached to assets. Namespace can be divided into two parts - root level domains and subdomains. Root level domain is one of a kind which means there is no duplicate root level domain on NEM. On the contrary, subdomains can be the same under different root level domains.

## Multisig account

You can change your account into multisig account. At that point, the account has no power and its private key is useless. You then need multiple keys from other singing accounts to send XEM. NEM's current implementation of multisig is "M-of-N", meaning M can be any number equal to or less than N, i.e., 1-of-4, 2-of-3, 4-of-9, 11-of-12 and so on. NEM also allows "N-of-N" accounts, i.e., 1-of-1, 2-of-2, 5-of-5, 10-of-10 and so on. With N-of-N accounts transaction have to have all N cosignatories sign the account, but to edit the signers on the account it is "N-1." 



## Reference
[NEM Official docs](https://docs.nem.io/ja/nem-dev-basics-docker)