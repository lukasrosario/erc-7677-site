import { ENTRYPOINT_ADDRESS_V06, UserOperation } from "permissionless";
import { paymasterActionsEip7677 } from "permissionless/experimental";
import {
  GetEntryPointVersion,
  ENTRYPOINT_ADDRESS_V06_TYPE,
} from "permissionless/types";
import { useMemo } from "react";
import { Chain, Hex, createClient, http, numberToHex } from "viem";
import { useChains } from "wagmi";
import { useQuery } from "@tanstack/react-query";

type Params = {
  userOp?: Omit<
    UserOperation<GetEntryPointVersion<ENTRYPOINT_ADDRESS_V06_TYPE>>,
    "signature" | "paymasterAndData"
  >;
  chainId: Hex;
  paymasterUrl: string;
  context?: Record<string, any>;
};

export function usePaymasterData({
  userOp,
  chainId,
  paymasterUrl,
  context,
}: Params) {
  const chains = useChains();

  const paymasterClient = useMemo(
    () =>
      createClient({
        chain: chains.find(
          (chain) => numberToHex(chain.id) === chainId
        ) as Chain,
        transport: http(paymasterUrl),
      }).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06)),
    [chainId, chains, paymasterUrl]
  );

  return useQuery({
    queryKey: ["paymasterStubData", userOp],
    queryFn: () =>
      paymasterClient.getPaymasterData({
        userOperation: userOp as Omit<
          UserOperation<GetEntryPointVersion<ENTRYPOINT_ADDRESS_V06_TYPE>>,
          "signature" | "paymasterAndData"
        >,
        context,
      }),
    select: (data) => data.paymasterAndData,
    enabled: !!userOp,
  });
}
