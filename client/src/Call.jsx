import React from "react";
import { MessengerChat } from "react-messenger-chat-plugin";

export default function Call() {
  return (
    <div>
      <button
        onClick={() => {
          showMessenger(true);
        }}
      >
        show messenger
      </button>
      <button
        onClick={() => {
          hideMessenger();
        }}
      >
        hide messenger
      </button>
      <button
        onClick={() => {
          showDialog();
        }}
      >
        show dialog
      </button>
      <button
        onClick={() => {
          hideDialog();
        }}
      >
        hide dialog
      </button>
      <button
        onclick={() => {
          setMessengerBottomSpacing(100);
        }}
      >
        set chat 100px in bottom spacing
      </button>

      <MessengerChat pageId="726971152360145" />
    </div>
  );
}
