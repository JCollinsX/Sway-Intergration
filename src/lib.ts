export const NODE_URL = 'https://beta-4.fuel.network/graphql';

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}