// Type definitions for mqtt-packet 6.3
// Project: https://github.com/mqttjs/mqtt-packet
// Definitions by: scarry1992 <https://github.com/scarry1992>
//                 Rodrigo Saboya <https://github.com/saboya>
//                 TekuConcept <https://github.com/TekuConcept>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference types="node" />

import EventEmitter = NodeJS.EventEmitter;
import WritableStream = NodeJS.WritableStream;

export type QoS = 0 | 1 | 2;

export type PacketCmd =
    'connack' |
    'connect' |
    'disconnect' |
    'pingreq' |
    'pingresp' |
    'puback' |
    'pubcomp' |
    'publish' |
    'pubrel' |
    'pubrec' |
    'suback' |
    'subscribe' |
    'unsuback' |
    'unsubscribe';

export type Packet =
    IConnectPacket |
    IPublishPacket |
    IConnackPacket |
    ISubscribePacket |
    ISubackPacket |
    IUnsubscribePacket |
    IUnsubackPacket |
    IPubackPacket |
    IPubcompPacket |
    IPubrelPacket |
    IPingreqPacket |
    IPingrespPacket |
    IDisconnectPacket |
    IPubrecPacket;

export interface IPacket {
    cmd: PacketCmd;
    messageId?: number;
    length?: number;
}

export interface IConnectPacket extends IPacket {
    cmd: 'connect';
    clientId: string;
    protocolVersion?: 4 | 5 | 3;
    protocolId?: 'MQTT' | 'MQIsdp';
    clean?: boolean;
    keepalive?: number;
    username?: string;
    password?: Buffer;
    will?: {
        topic: string;
        payload: Buffer;
        qos?: QoS;
        retain?: boolean;
        properties?: {
            willDelayInterval?: number;
            payloadFormatIndicator?: number;
            messageExpiryInterval?: number;
            contentType?: string;
            responseTopic?: string;
            correlationData?: Buffer;
            userProperties?: any;
        }
    };
    properties?: {
        sessionExpiryInterval?: number;
        receiveMaximum?: number;
        maximumPacketSize?: number;
        topicAliasMaximum?: number;
        requestResponseInformation?: boolean;
        requestProblemInformation?: boolean;
        userProperties?: any;
        authenticationMethod?: string;
        authenticationData?: Buffer;
    };
}

export interface IPublishPacket extends IPacket {
    cmd: 'publish';
    qos: QoS;
    dup: boolean;
    retain: boolean;
    topic: string;
    payload: string | Buffer;
    properties?: {
        payloadFormatIndicator?: boolean;
        messageExpiryInterval?: number;
        topicAlias?: number;
        responseTopic?: string;
        correlationData?: Buffer;
        userProperties?: any;
        subscriptionIdentifier?: number;
        contentType?: string;
    };
}

export interface IConnackPacket extends IPacket {
    cmd: 'connack';
    returnCode: number;
    sessionPresent: boolean;
    properties?: {
        sessionExpiryInterval?: number;
        receiveMaximum?: number;
        maximumQoS?: number;
        retainAvailable?: boolean;
        maximumPacketSize?: number;
        assignedClientIdentifier?: string;
        topicAliasMaximum?: number;
        reasonString?: string;
        userProperties?: any;
        wildcardSubscriptionAvailable?: boolean;
        subscriptionIdentifiersAvailable?: boolean;
        sharedSubscriptionAvailable?: boolean;
        serverKeepAlive?: number;
        responseInformation?: string;
        serverReference?: string;
        authenticationMethod?: string;
        authenticationData?: Buffer;
    };
}

export interface ISubscription {
    topic: string;
    qos: QoS;
    nl?: boolean;
    rap?: boolean;
    rh?: number;
}

export interface ISubscribePacket extends IPacket {
    cmd: 'subscribe';
    subscriptions: ISubscription[];
    properties?: {
        reasonString?: string;
        userProperties?: any;
    };
}

export interface ISubackPacket extends IPacket {
    cmd: 'suback';
    properties?: {
        reasonString?: string;
        userProperties?: any;
    };
    granted: number[] | any[];
}

export interface IUnsubscribePacket extends IPacket {
    cmd: 'unsubscribe';
    properties?: {
        reasonString?: string;
        userProperties?: any;
    };
    unsubscriptions: string[];
}

export interface IUnsubackPacket extends IPacket {
    cmd: 'unsuback';
    properties?: {
        reasonString?: string;
        userProperties?: any;
    };
}

export interface IPubackPacket extends IPacket {
    cmd: 'puback';
    properties?: {
        reasonString?: string;
        userProperties?: any;
    };
}

export interface IPubcompPacket extends IPacket {
    cmd: 'pubcomp';
    properties?: {
        reasonString?: string;
        userProperties?: any;
    };
}

export interface IPubrelPacket extends IPacket {
    cmd: 'pubrel';
    properties?: {
        reasonString?: string;
        userProperties?: any;
    };
}

export interface IPubrecPacket extends IPacket {
    cmd: 'pubrec';
    properties?: {
        reasonString?: string;
        userProperties?: any;
    };
}

export interface IPingreqPacket extends IPacket {
    cmd: 'pingreq';
}

export interface IPingrespPacket extends IPacket {
    cmd: 'pingresp';
}

export interface IDisconnectPacket extends IPacket {
    cmd: 'disconnect';
    properties?: {
        sessionExpiryInterval?: number;
        reasonString?: string;
        userProperties?: any;
        serverReference?: string;
    };
}

export interface Parser extends EventEmitter {
    on(event: 'packet', callback: (packet: Packet) => void): this;
    on(event: 'error', callback: (error: any) => void): this;
    parse(buffer: Buffer, opts?: any): number;
}

export function parser(opts?: any): Parser;

export function generate(packet: Packet, opts?: any): Buffer;

export function writeToStream(object: Packet,
    stream: WritableStream, opts?: any): void;

export namespace writeToStream {
    let cacheNumbers: boolean;
}
