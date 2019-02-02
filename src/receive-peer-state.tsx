import * as React from 'react';
import Peer from 'peerjs';
import { PeerError } from './types';

interface ReceivePeerStateProps<TState> {
  brokerId: string;
  peerBrokerId: string;
  children: (
    props: { data: TState | undefined; isConnected: boolean; error: PeerError | undefined }
  ) => React.ReactNode;
}

interface ReceivePeerStateState<TState> {
  data: TState | undefined;
  isConnected: boolean;
  error: PeerError | undefined;
}

export default class ReceivePeerState<TState> extends React.Component<
  ReceivePeerStateProps<TState>,
  ReceivePeerStateState<TState>
> {
  static defaultProps = {
    brokerId: '',
  };

  state = {
    data: undefined,
    isConnected: false,
    error: undefined,
  };

  peer: Peer;

  componentDidMount() {
    this.setPeer();
  }

  componentDidUpdate(prevProps: ReceivePeerStateProps<TState>) {
    if (prevProps.peerBrokerId !== this.props.peerBrokerId) {
      this.setPeer();
    }
  }

  setPeer = () => {
    this.cleanup();

    import('peerjs').then(({ default: Peer }) => {
      const { peerBrokerId } = this.props;
      if (!peerBrokerId) {
        return;
      }

      this.peer = new Peer(this.props.brokerId);

      this.peer.on('open', () => {
        const { peerBrokerId } = this.props;
        const connection = this.peer.connect(peerBrokerId);

        connection.on('open', () => {
          connection.on('data', (receivedData: TState) => {
            this.setState({
              data: receivedData,
              isConnected: true,
            });
          });
        });

        connection.on('close', () => {
          this.setState({
            isConnected: false,
          });
        });

        connection.on('error', error => this.setState({ error }));
      });

      this.peer.on('error', error => this.setState({ error }));
    });
  };

  cleanup = () => {
    if (this.peer) {
      this.peer.destroy();
    }
  };

  componentWillUnmount() {
    this.cleanup();
  }

  render() {
    const { data, isConnected, error } = this.state;

    return this.props.children({
      data,
      isConnected,
      error,
    });
  }
}
