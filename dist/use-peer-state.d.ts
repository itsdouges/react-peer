import Peer from 'peerjs';
declare const usePeerState: <TState extends {}>(initialState: TState, opts?: {
    brokerId: string;
}) => [TState, Function, string, Peer.DataConnection[]];
export default usePeerState;
