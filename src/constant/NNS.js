export const DOMAIN_MOSAIC_DEFINITION = {
	namespaceParent: {
		"fqn": process.env.NAMESPACE
	},
	properties: {
		initialSupply: 2,
		divisibility: 0,
		transferable: false,
		supplyMutable: false
	}
};
export const NIS_HOST = process.env.NIS_HOST;
export const NIS_PORT = process.env.NIS_PORT;
export const NAMESPACE = process.env.NAMESPACE;
export const PASSWORD = process.env.PASSWORD;
export const REGISTRY_PRIVATE_KEY = process.env.REGISTRY_PRIVATE_KEY;
export const RESOLVER_PRIVATE_KEY = process.env.RESOLVER_PRIVATE_KEY;
export const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS;
export const RESOLVER_ADDRESS = process.env.RESOLVER_ADDRESS;

