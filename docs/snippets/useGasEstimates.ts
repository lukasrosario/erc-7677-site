import { useQuery } from "@tanstack/react-query";
import {
  ENTRYPOINT_ADDRESS_V06,
  UserOperation,
  bundlerActions,
} from "permissionless";
import {
  GetEntryPointVersion,
  ENTRYPOINT_ADDRESS_V06_TYPE,
} from "permissionless/types";
import { useMemo } from "react";
import { Chain, Hex, createClient, http, numberToHex } from "viem";
import { useChains } from "wagmi";

type Params = {
  userOp?: UserOperation<GetEntryPointVersion<ENTRYPOINT_ADDRESS_V06_TYPE>>;
  chainId: Hex;
};

export function useGasEstimates({ userOp, chainId }: Params) {
  const chains = useChains();

  const bundlerClient = useMemo(
    () =>
      createClient({
        chain: chains.find(
          (chain) => numberToHex(chain.id) === chainId
        ) as Chain,
        transport: http(process.env.BUNDLER_URL),
      }).extend(bundlerActions(ENTRYPOINT_ADDRESS_V06)),
    [chainId, chains]
  );

  return useQuery({
    queryKey: ["estimateGas", userOp],
    queryFn: () =>
      bundlerClient.estimateUserOperationGas({
        userOperation: userOp as UserOperation<GetEntryPointVersion<ENTRYPOINT_ADDRESS_V06_TYPE>>,
      }),
    enabled: !!userOp && !!userOp.paymasterAndData,
  });
}
