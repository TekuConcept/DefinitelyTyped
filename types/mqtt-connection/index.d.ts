// Type definitions for mqtt-connection 4.0
// Project: https://github.com/mqttjs/mqtt-connection
// Definitions by: TekuConcept <https://github.com/TekuConcept>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference types="node" />

import stream = require('stream');
import {
    IConnectPacket,
    IConnackPacket,
    IPublishPacket,
    IPubackPacket,
    IPubrecPacket,
    IPubrelPacket,
    IPubcompPacket,
    IUnsubackPacket,
    ISubscribePacket,
    ISubackPacket,
    IUnsubscribePacket,
    IPingreqPacket,
    IPingrespPacket,
    IDisconnectPacket,
    IPacket
} from 'mqtt-packet';

export namespace MqttConnection {
    interface Options { [key: string]: any; }
    interface CtorOptions extends Options { notData: boolean; }
    type ConnectCallback = () => void;
    type CompleteCallback = () => void;
    class Duplexify extends stream.Duplex { } // see 'duplexify'
}

export default class Connection extends MqttConnection.Duplexify {
    /** Creates a new MQTT Connection */
    constructor(
        duplex: stream.Duplex,
        opts?: MqttConnection.CtorOptions,
        cb?: MqttConnection.ConnectCallback);

    /** Emitted when a MQTT connect packet is received by the client. */
    on(event: 'connect',
        cb: (packet: IConnectPacket) => void): this;
    /** Emitted when a MQTT connack packet is received by the client. */
    on(event: 'connack',
        cb: (packet: IConnackPacket) => void): this;
    /** Emitted when a MQTT publish packet is received by the client. */
    on(event: 'publish',
        cb: (packet: IPublishPacket) => void): this;
    /** Emitted when a MQTT puback packet is received by the client. */
    on(event: 'puback',
        cb: (packet: IPubackPacket) => void): this;
    /** Emitted when a MQTT pubrec packet is received by the client. */
    on(event: 'pubrec',
        cb: (packet: IPubrecPacket) => void): this;
    /** Emitted when a MQTT pubrel packet is received by the client. */
    on(event: 'pubrel',
        cb: (packet: IPubrelPacket) => void): this;
    /** Emitted when a MQTT pubcomp packet is received by the client. */
    on(event: 'pubcomp',
        cb: (packet: IPubcompPacket) => void): this;
    /** Emitted when a MQTT unsuback packet is received by the client. */
    on(event: 'unsuback',
        cb: (packet: IUnsubackPacket) => void): this;
    /** Emitted when a MQTT subscribe packet is received. */
    on(event: 'subscribe',
        cb: (packet: ISubscribePacket) => void): this;
    /** Emitted when a MQTT suback packet is received. */
    on(event: 'suback',
        cb: (packet: ISubackPacket) => void): this;
    /** Emitted when a MQTT unsubscribe packet is received. */
    on(event: 'unsubscribe',
        cb: (packet: IUnsubscribePacket) => void): this;
    /** Emitted when a MQTT pingreq packet is received. */
    on(event: 'pingreq',
        cb: (packet: IPingreqPacket) => void): this;
    /** Emitted when a MQTT pingresp packet is received. */
    on(event: 'pingresp',
        cb: (packet: IPingrespPacket) => void): this;
    /** Emitted when a MQTT disconnect packet is received. */
    on(event: 'disconnect',
        cb: (packet: IDisconnectPacket) => void): this;
    /** Emitted when a MQTT auth packet is received. */
    on(event: 'auth' | 'data',
        cb: (packet: IPacket) => void): this;

    on(event: 'close', cb: () => void): this;
    on(event: 'error', cb: (error: Error) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;

    /** Send a MQTT auth packet. Only MQTT 5.0 */
    auth(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT connack packet. */
    connack(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT connect packet. */
    connect(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT disconnect packet. */
    disconnect(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT pingreq packet. */
    pingreq(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT pingresp packet. */
    pingresp(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT puback packet. */
    puback(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT pubcomp packet. */
    pubcomp(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT publish packet. */
    publish(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT pubrec packet. */
    pubrec(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT pubrel packet. */
    pubrel(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT suback packet. */
    suback(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT subscribe packet. */
    subscribe(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT unsuback packet. */
    unsuback(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;
    /** Send a MQTT unsubscribe packet. */
    unsubscribe(
        opts?: MqttConnection.Options,
        cb?: MqttConnection.CompleteCallback): void;

    destroy(): void;
    setOptions(opts: MqttConnection.Options): void;

    /**
     * Returns a Transform stream that embeds a Parser and
     * calls Parser.parse() for each new Buffer. The stream
     * is configured into object mode. It accepts the same
     * options of parser(opts).
     */
    static parseStream(opts: MqttConnection.Options): stream.Transform;

    /**
     * Returns a Transform stream that calls generate().
     * The stream is configured into object mode.
     */
    static generateStream(opts: MqttConnection.Options): stream.Transform;
}
