'use client';

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import { useState } from 'react';

const client = new Ably.Realtime({ key: process.env.ABLY_KEY });

export default function Page({ params }: { params: { chatId: string } }) {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={params.chatId}>
        <Conversation chatId={params.chatId} />
      </ChannelProvider>
    </AblyProvider>
  );
}

function Conversation({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const [text, setText] = useState<string>('');

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  const { channel } = useChannel(chatId, 'message', (message) => {
    setMessages((previousMessages) => [message, ...previousMessages]);
  });

  const sendMessage = () => {
    channel.publish('message', text);
    setText('');
  };

  return (
    <div>
      <div className="flex gap-2">
        <input className="input input-bordered" type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn" onClick={sendMessage}>
          Send
        </button>
      </div>

      {messages.map((message) => {
        return (
          <div key={message.id} className="chat chat-start">
            <div className="chat-bubble">{message.data}</div>
          </div>
        );
      })}
    </div>
  );
}
