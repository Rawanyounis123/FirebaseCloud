import React, { useState, useEffect } from "react";
import {
  getChannels,
  addChannel,
  removeChannel,
} from "./channelService";
import {
  getUserSubscriptions,
  subscribeToChannel,
  unsubscribeFromChannel,
} from "./subscriptionService";
import { listenToMessages, sendMessage } from "./chatService";

const App = () => {
  const [channels, setChannels] = useState([]);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newChannel, setNewChannel] = useState("");

  const userId = `user-${window.location.port}`; // Replace with actual user ID

  // Fetch channels and subscriptions on mount
  useEffect(() => {
    const fetchData = async () => {
      const channelList = await getChannels();
      const subscriptions = await getUserSubscriptions(userId);
      setChannels(channelList);
      setSubscribedChannels(subscriptions);
    };
    fetchData();
  }, []);

  // Listen for messages in the selected channel
  useEffect(() => {
    if (selectedChannel) {
      listenToMessages(selectedChannel, setMessages);
    } else {
      setMessages([]); // Clear messages when no channel is selected
    }
  }, [selectedChannel]);

  const handleAddChannel = async () => {
    if (newChannel.trim() !== "") {
      await addChannel(newChannel);
      const updatedChannels = await getChannels();
      setChannels(updatedChannels);
      setNewChannel("");
    }
  };

  const handleSubscribe = async (channelName) => {
    await subscribeToChannel(userId, channelName);
    const subscriptions = await getUserSubscriptions(userId);
    setSubscribedChannels(subscriptions);
  };

  const handleUnsubscribe = async (channelName) => {
    await unsubscribeFromChannel(userId, channelName);
    const subscriptions = await getUserSubscriptions(userId);
    setSubscribedChannels(subscriptions);
    if (selectedChannel === channelName) {
      setSelectedChannel(null); // Close chat if unsubscribed
    }
  };

  const handleRemoveChannel = async (channelId) => {
    const channel = channels.find((ch) => ch.id === channelId);
    if (channel && selectedChannel === channel.name) {
      setSelectedChannel(null); // Close chat if removed
    }
    await removeChannel(channelId);
    const updatedChannels = await getChannels();
    setChannels(updatedChannels);
    const subscriptions = await getUserSubscriptions(userId);
    setSubscribedChannels(subscriptions);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" && selectedChannel) {
      await sendMessage(selectedChannel, userId, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div>
      <h1>Manage Channels</h1>
      <input
        value={newChannel}
        onChange={(e) => setNewChannel(e.target.value)}
        placeholder="New Channel Name"
      />
      <button onClick={handleAddChannel}>Add Channel</button>
      <ul>
        {channels.map((channel) => {
          const isSubscribed = subscribedChannels.includes(channel.name);

          return (
            <li key={channel.id}>
              {channel.name}
              {!isSubscribed && (
                <>
                  <button onClick={() => handleSubscribe(channel.name)}>
                    Subscribe
                  </button>
                  <button onClick={() => handleRemoveChannel(channel.id)}>
                    Remove
                  </button>
                </>
              )}
              {isSubscribed && (
                <>
                  <button onClick={() => handleUnsubscribe(channel.name)}>
                    Unsubscribe
                  </button>
                  <button
                    onClick={() =>
                      setSelectedChannel(
                        selectedChannel === channel.name ? null : channel.name
                      )
                    }
                  >
                    {selectedChannel === channel.name ? "Close Chat" : "Open Chat"}
                  </button>
                  <button onClick={() => handleRemoveChannel(channel.id)}>
                    Remove
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>

      {selectedChannel && (
        <div>
          <h2>Chat Room: {selectedChannel}</h2>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              height: "300px",
              overflowY: "scroll",
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <strong>{msg.sender}:</strong> {msg.text}
                <div style={{ fontSize: "0.8em", color: "#888" }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          <div>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message"
              style={{ width: "80%", padding: "5px" }}
              disabled={!selectedChannel}
            />
            <button
              onClick={handleSendMessage}
              style={{ padding: "5px 10px" }}
              disabled={!selectedChannel}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;