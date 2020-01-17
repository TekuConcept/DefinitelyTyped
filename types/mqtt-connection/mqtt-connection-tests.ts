import {
    IPublishPacket,
    ISubscribePacket
} from 'mqtt-packet';
import Connection from 'mqtt-connection';
import * as net from 'net';

const server = new net.Server();
server.on('connection', (stream: net.Socket) => {
    const client = new Connection(stream);

    client.on('connect', () => {
        client.connack({ returnCode: 0 });
    });

    client.on('publish', (packet: IPublishPacket) => {
        client.puback({ messageId: packet.messageId });
    });

    client.on('pingreq', () => {
        client.pingresp();
    });

    client.on('subscribe', (packet: ISubscribePacket) => {
        client.suback({
            granted: [packet.subscriptions[0].qos],
            messageId: packet.messageId
        });
    });

    stream.setTimeout(1000 * 60 * 5);

    client.on('close', () => { client.destroy(); });
    client.on('error', () => { client.destroy(); });
    client.on('disconnect', () => { client.destroy(); });

    stream.on('timeout', () => { client.destroy(); });
});
