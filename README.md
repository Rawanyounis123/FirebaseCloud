# Firebase Channel Subscriptions and Chat Rooms

This project integrates **Firestore** and **Realtime Database** to manage channel subscriptions and enable real-time chat functionalities. 
The system allows users to subscribe to channels, and each channel has a corresponding chat room for instant messaging.

---
## Setup 
- Create a Firebase Project
- Go to the Firebase Console.
- Click on Add Project and follow the prompts to create a new Firebase project.
### Realtime Database
- Set Up Firebase Realtime Database
- Go to the Realtime Database section under Build.
- Click on Create Database.
- Choose the Start in test mode to allow read/write access during development and change rules.
### FireStore
- Set Up Firebase Firestore
- In the Firebase Console, go to the Firestore Database section under Build.
- Click Create Database.
- Choose Start in test mode and change rules.
--- 

## Usage

### 1. **Channel Subscriptions with Firestore**
- **Store and Retrieve Channels:**
  - Channels are stored as documents in a `channels` collection in Firestore.
  - Each channel document contains metadata such as channel name, description.

- **Manage User Subscriptions:**
  - User subscriptions are stored in Firestore under a `subscriptions` collection.
  - Each subscription document links a user to their subscribed channels.

- **Functionalities:**
  - **Add a Channel:** Add a new channel to the `channels` collection.
  - **Remove a Channel:** Remove an existing channel and clean up associated subscriptions.
  - **List Channels:** Retrieve a list of all available channels.
  - **Subscribe/Unsubscribe:** Allow users to subscribe to or unsubscribe from specific channels.

---

### 2. **Chat Room Integration with Realtime Database**
- **Chat Room Creation:**
  - A chat room is created in the Realtime Database for each channel.
  - Each chat room contains messages organized by a unique ID, with fields like `sender`, `message`, and `timestamp`.

- **Real-Time Messaging:**
  - Users can send and receive messages within a channel in real time.
  - Messages are instantly synchronized for all participants in the chat room.

- **Functionalities:**
  - **Post Messages:** Users can send messages to the chat room.
  - **View Messages:** Messages are displayed in real-time as other users post them.

---

## Why Use Firestore and Realtime Database Together?
- **Firestore:** Ideal for structured, scalable data like channels and subscriptions.
- **Realtime Database:** Optimized for low-latency, real-time data updates like chat messages.

---

## Future Improvements
1. **Enhance Security:**
   - Use Firebase Security Rules to restrict access based on user roles and subscriptions.
2. **Push Notifications:**
   - Notify users when new messages are posted in subscribed channels.
3. **UI Enhancements:**
   - Add typing indicators and message read receipts.
4. **Search Functionality:**
   - Allow users to search for channels or specific messages.

---
