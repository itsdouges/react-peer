import { useLayoutEffect, useState, useRef } from 'react';
import Peer from 'peerjs';

const usePeerState = <TState extends {}>(
  initialState: TState,
  opts: { brokerId: string } = { brokerId: '' }
): [TState, Function, string, Peer.DataConnection[]] => {
  const [connections, setConnections] = useState<Peer.DataConnection[]>([]);
  const [state, setState] = useState<TState>(initialState);
  // We useRef to get around useLayoutEffect's closure only having access
  // to the initial state since we only re-execute it if brokerId changes.
  const stateRef = useRef<TState>(initialState);
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const [brokerId, setBrokerId] = useState(opts.brokerId);

  useLayoutEffect(
    () => {
      import('peerjs').then(({ default: Peer }) => {
        const localPeer = new Peer(opts.brokerId);
        setPeer(localPeer);

        localPeer.on('open', () => {
          if (brokerId !== localPeer.id) {
            setBrokerId(localPeer.id);
          }
        });

        localPeer.on('connection', conn => {
          setConnections(prevState => [...prevState, conn]);

          // We want to immediately send the newly connected peer the current data.
          conn.on('open', () => {
            conn.send(stateRef.current);
          });
        });
      });

      return () => {
        peer && peer.destroy();
      };
    },
    [opts.brokerId]
  );

  return [
    state,
    (newState: TState) => {
      setState(newState);
      stateRef.current = newState;
      connections.forEach(conn => conn.send(newState));
    },
    brokerId,
    connections,
  ];
};

export default usePeerState;
