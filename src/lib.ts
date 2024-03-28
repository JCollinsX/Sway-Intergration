export const NODE_URL = 'https://beta-5.fuel.network/graphql';

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}