import * as React from 'react';
import Peer from 'peerjs';
import { PeerError } from './types';

interface PeerStateProviderProps<TState> {
  brokerId: string;
  value: TState;
  children: (
    props: { connections: Peer.DataConnection[]; brokerId: string; error: PeerError | undefined }
  ) => React.ReactNode;
}

interface PeerStateProviderState {
  connections: Peer.DataConnection[];
  brokerId: string;
  error: PeerError | undefined;
}

export default class PeerStateProvider<TState> extends React.Component<
  PeerStateProviderProps<TState>,
  PeerStateProviderState
> {
  static defaultProps = {
    brokerId: '',
  };

  peer: Peer;

  state: PeerStateProviderState = {
    connections: [],
    brokerId: this.props.brokerId,
    error: undefined,
  };

  componentDidMount() {
    this.setPeer();
  }

  setPeer = () => {
    this.cleanup();

    import('peerjs').then(({ default: Peer }) => {
      this.peer = new Peer(this.props.brokerId);

      this.peer.on('open', () => {
        if (this.state.brokerId !== this.peer.id) {
          this.setState({
            brokerId: this.peer.id,
          });
        }
      });

      this.peer.on('connection', conn => {
        this.setState(prevState => ({ connections: [...prevState.connections, conn] }));

        // We want to immediately send the newly connected peer the current data.
        conn.on('open', () => {
          conn.send(this.props.value);
        });
      });

      this.peer.on('error', error => this.setState({ error }));
    });
  };

  componentDidUpdate(prevProps: PeerStateProviderProps<TState>) {
    if (prevProps.value !== this.props.value) {
      this.state.connections.forEach(conn => conn.send(this.props.value));
    }

    if (prevProps.brokerId !== this.props.brokerId) {
      this.setPeer();
    }
  }

  cleanup() {
    if (this.peer) {
      this.peer.destroy();
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  render() {
    const { connections, brokerId, error } = this.state;

    return this.props.children({ connections, brokerId, error });
  }
}
