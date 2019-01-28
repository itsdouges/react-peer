import * as React from 'react';
import Peer from 'peerjs';

interface ReceivePeerStateProps<TState> {
  brokerId: string;
  peerBrokerId: string;
  children: (props: { data: TState | undefined; isConnected: boolean }) => React.ReactNode;
}

interface ReceivePeerStateState<TState> {
  data: TState | undefined;
  isConnected: boolean;
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
      });
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
    const { data, isConnected } = this.state;

    return this.props.children({
      data,
      isConnected,
    });
  }
}
