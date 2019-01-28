"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var peerjs_1 = require("peerjs");
var useRecievePeerState = function (peerBrokerId, opts) {
    if (opts === void 0) { opts = { brokerId: '' }; }
    var _a = react_1.useState(undefined), state = _a[0], setState = _a[1];
    var _b = react_1.useState(false), isConnected = _b[0], setIsConnected = _b[1];
    var _c = react_1.useState(undefined), peer = _c[0], setPeer = _c[1];
    var _d = react_1.useState(opts.brokerId), brokerId = _d[0], setBrokerId = _d[1];
    react_1.useLayoutEffect(function () {
        if (!peerBrokerId) {
            return;
        }
        var localPeer = new peerjs_1.default(opts.brokerId);
        setPeer(localPeer);
        localPeer.on('open', function () {
            if (brokerId !== localPeer.id) {
                setBrokerId(localPeer.id);
            }
            var connection = localPeer.connect(peerBrokerId);
            connection.on('open', function () {
                setIsConnected(true);
                connection.on('data', function (recievedData) { return setState(recievedData); });
            });
            connection.on('close', function () {
                setIsConnected(false);
            });
        });
        return function () {
            setIsConnected(false);
            peer && peer.destroy();
        };
    }, [peerBrokerId, opts.brokerId]);
    return [state, isConnected];
};
exports.default = useRecievePeerState;
