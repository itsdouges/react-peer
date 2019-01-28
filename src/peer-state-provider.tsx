import * as React from 'react';
import Peer from 'peerjs';

interface PeerStateProviderProps<TState> {
  brokerId: string;
  value: TState;
  children: (props: { connections: Peer.DataConnection[]; brokerId: string }) => React.ReactNode;
}

interface PeerStateProviderState {
  connections: Peer.DataConnection[];
  brokerId: string;
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
    const { connections, brokerId } = this.state;
    return this.props.children({ connections, brokerId });
  }
}
