declare const useRecievePeerState: <TData extends {}>(peerBrokerId: string, opts?: {
    brokerId: string;
}) => [TData | undefined, boolean];
export default useRecievePeerState;
