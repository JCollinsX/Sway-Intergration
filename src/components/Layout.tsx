import { BN, Provider, Wallet, WalletUnlocked } from "fuels";
import { createContext, useCallback, useEffect, useState } from "react";
import { BurnerWallet } from "./BurnerWallet";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "./Link";
import { Button } from "./Button";
import { NODE_URL, truncateAddress } from "@/lib";
import { useAccount, useConnectUI, useIsConnected, useWallet } from '@fuels/react';

const BURNER_WALLET_LOCAL_STORAGE_KEY = "create-fuels-burner-wallet-pk";

export const AppContext = createContext<{
  faucetWallet?: WalletUnlocked;
  setFaucetWallet?: (wallet: WalletUnlocked) => void;

  burnerWallet?: WalletUnlocked;
  setBurnerWallet?: (wallet: WalletUnlocked) => void;

  burnerWalletBalance?: BN;
  setBurnerWalletBalance?: (balance: BN) => void;

  refreshBurnerWalletBalance?: () => Promise<void>;
}>({});

export const Layout = ({children}: { children: React.ReactNode }) => {
  const { isConnected} = useIsConnected()
  const { connect, isConnecting } = useConnectUI();
  const { account } = useAccount();

  const [faucetWallet, setFaucetWallet] = useState<WalletUnlocked>();

  const [initialTopupDone, setInitialTopupDone] = useState(false);

  useEffect(() => {
    (async () => {
      // check if burner wallet pk is stored in local storage
      const burnerWalletPk = localStorage.getItem(
        BURNER_WALLET_LOCAL_STORAGE_KEY,
      );

      let wallet: WalletUnlocked;

      if (burnerWalletPk) {
        const provider = await Provider.create(NODE_URL);
        wallet = Wallet.fromPrivateKey(burnerWalletPk, provider);
      } else {
        // if not, create a new burner wallet
        const provider = await Provider.create(NODE_URL);
        wallet = Wallet.generate({provider});

        localStorage.setItem(
          BURNER_WALLET_LOCAL_STORAGE_KEY,
          wallet.privateKey,
        );
      }

      const burnerWalletBalance = await wallet?.getBalance();
    })().catch(console.error);
  }, []);

  useEffect(() => {
    if (faucetWallet && !initialTopupDone) {
      setInitialTopupDone(true);
    }
  }, [faucetWallet, initialTopupDone]);


  return (
    <AppContext.Provider
      value={{
        faucetWallet,
        setFaucetWallet,
      }}
    >
      <Toaster/>
      <div className="flex flex-col">
        <nav className="flex justify-between items-center p-4 bg-black text-white gap-6">
          <Link href="/">Home</Link>

          <Link href="https://faucet-beta-4.fuel.network/" target="_blank">Faucet</Link>

          <div className="ml-auto">
            <BurnerWallet/>
          </div>

          {
            isConnected && account ?
              <Link href={`https://app.fuel.network/account/${account}/assets`} target="_blank">{truncateAddress(account)}</Link>
              :
              <Button onClick={() => connect()}>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</Button>
          }
        </nav>

        <div className="min-h-screen items-center p-24 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};
