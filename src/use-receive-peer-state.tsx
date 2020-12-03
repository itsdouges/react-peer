import { useEffect, useState } from 'react';
import Peer from 'peerjs';
import { PeerError } from './types';

const useReceivePeerState = <TData extends {}>(
  peerBrokerId: string,
  opts: { brokerId: string } = { brokerId: '' },
  connectionOpts?: Peer.PeerConnectOption
): [TData | undefined, boolean, any, Peer.DataConnection | undefined, Peer | undefined] => {
  const [state, setState] = useState<TData | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [peer, setPeer] = useState<Peer | undefined>(undefined);
  const [connection, setConnection] = useState<Peer.DataConnection | undefined>(undefined);
  const [brokerId, setBrokerId] = useState(opts.brokerId);
  const [error, setError] = useState<PeerError | undefined>(undefined);

  useEffect(
    () => {
      if (!peerBrokerId) {
        return;
      }

      import('peerjs').then(({ default: Peer }) => {
        const localPeer = new Peer(opts.brokerId);
        setPeer(localPeer);

        localPeer.on('open', () => {
          if (brokerId !== localPeer.id) {
            setBrokerId(localPeer.id);
          }

          const connection = localPeer.connect(peerBrokerId, connectionOpts);
          setConnection(connection);

          connection.on('open', () => {
            connection.on('data', (receivedData: TData) => {
              // We want isConnected and data to be set at the same time.
              setState(receivedData);
              setIsConnected(true);
            });
          });

          connection.on('close', () => {
            setIsConnected(false);
          });

          connection.on('error', err => setError(err));
        });

        localPeer.on('error', err => setError(err));
      });

      return () => {
        setIsConnected(false);
        peer && peer.destroy();
      };
    },
    [peerBrokerId, opts.brokerId]
  );

  return [state, isConnected, error, connection, peer];
};

export default useReceivePeerState;
