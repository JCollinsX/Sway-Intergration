/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.78.0
  Forc version: 0.51.1
  Fuel-Core version: 0.22.1
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

interface TestContractAbiInterface extends Interface {
  functions: {
    get_count: FunctionFragment;
    increment_counter: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'get_count', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'increment_counter', values: [BigNumberish]): Uint8Array;

  decodeFunctionData(functionFragment: 'get_count', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'increment_counter', data: BytesLike): DecodedValue;
}

export class TestContractAbi extends Contract {
  interface: TestContractAbiInterface;
  functions: {
    get_count: InvokeFunction<[], BN>;
    increment_counter: InvokeFunction<[amount: BigNumberish], BN>;
  };
}
