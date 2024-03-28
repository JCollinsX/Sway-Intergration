import { FuelLogo } from "@/components/FuelLogo";
import { bn, Wallet } from "fuels";
import { useEffect, useState } from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import toast from "react-hot-toast";
import { useWallet } from "@fuels/react";
import { TestContractAbi, TestContractAbi__factory } from "@/contracts";

const contractId = "0x85958801564e5e65d64999da76e8922ea99ed5911fae74d4994509cb95da7786";

const hasContract = process.env.NEXT_PUBLIC_HAS_CONTRACT === "true";
const hasPredicate = process.env.NEXT_PUBLIC_HAS_PREDICATE === "true";
const hasScript = process.env.NEXT_PUBLIC_HAS_SCRIPT === "true";

export default function Home() {
  const { wallet } = useWallet();

  const [contract, setContract] = useState<TestContractAbi>();
  const [counter, setCounter] = useState<number>();

  useEffect(() => {
    (async () => {
      if (wallet) {
        const contract = TestContractAbi__factory.connect(
          contractId,
          wallet,
        );
        const { value } = await contract.functions.get_count().get();
        setCounter(value.toNumber());
      }

      // eslint-disable-next-line no-console
    })().catch(console.error);
  }, [wallet]);

  // eslint-disable-next-line consistent-return
  const onIncrementPressed = async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    try {
      const {value} = await contract.functions.increment_counter(bn(1)).call();
      setCounter(value.toNumber());
    } catch (e) {
      // @ts-ignore
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <FuelLogo />
        <h1 className="text-2xl font-semibold ali">Welcome to Fuel</h1>
      </div>

      <>
        <h3 className="text-xl font-semibold">Counter</h3>

        <span className="text-gray-400 text-6xl">{counter}</span>

        <Button onClick={onIncrementPressed} className="mt-6">
          Increment Counter
        </Button>
      </>

      <Link href="https://docs.fuel.network" target="_blank" className="mt-12">
        Fuel Docs
      </Link>
    </>
  );
}
