import * as mqtt from 'mqtt-packet';
const opts = { protocolVersion: 4 };
const parser = mqtt.parser(opts);

parser.on('packet', (packet: mqtt.Packet) => {
    let correct = 0;
    let publishPacket: mqtt.IPublishPacket;
    if (packet.cmd === 'publish') {
        publishPacket = packet;
        correct++;
    }
    if (packet.length === 10) correct++;
    if (publishPacket) {
        const payload = Buffer.from([74, 65, 73, 74]);
        if (publishPacket.topic === 'test') correct++;
        if ((typeof publishPacket.payload === 'string' &&
            publishPacket.payload === 'test') ||
            payload.compare(publishPacket.payload as Buffer))
            correct++;
    }
    return correct;
});

parser.parse(Buffer.from([
    48, 10,             // Header (publish)
    0, 4,               // Topic length
    116, 101, 115, 116, // Topic (test)
    116, 101, 115, 116  // Payload (test)
]));
