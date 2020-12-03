import { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';
import { PeerError } from './types';

const usePeerState = <TState extends {}>(
  initialState: TState,
  opts: { brokerId: string } = { brokerId: '' }
): [TState, Function, string, Peer.DataConnection[], Peer | undefined, any] => {
  const [connections, setConnections] = useState<Peer.DataConnection[]>([]);
  const [state, setState] = useState<TState>(initialState);
  const [error, setError] = useState<PeerError | undefined>(undefined);
  // We useRef to get around useLayoutEffect's closure only having access
  // to the initial state since we only re-execute it if brokerId changes.
  const stateRef = useRef<TState>(initialState);
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const [brokerId, setBrokerId] = useState(opts.brokerId);

  useEffect(
    () => {
      import('peerjs').then(({ default: Peer }) => {
        const localPeer = new Peer(opts.brokerId);
        setPeer(localPeer);

        localPeer.on('open', () => {
          if (brokerId !== localPeer.id) {
            setBrokerId(localPeer.id);
          }
        });

        localPeer.on('error', err => setError(err));

        localPeer.on('connection', conn => {
          setConnections(prevState => [...prevState, conn]);

          // We want to immediately send the newly connected peer the current data.
          conn.on('open', () => {
            conn.send(stateRef.current);
          });

          conn.on('close', () => {
            setConnections(prevState => {
              var indexOfClosedConnection = prevState.findIndex(value => value.peer === conn.peer);
              if (indexOfClosedConnection !== -1) {
                prevState.splice(indexOfClosedConnection, 1);
                return [...prevState];
              }
              return prevState;
            })
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
    peer,
    error
  ];
};

export default usePeerState;
