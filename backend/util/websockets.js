class WebSockets {
    users = [];

    connection(client) {
      console.log("Client connected");
      console.log(client.id);
      // event fired when the chat room is disconnected
      // client.on("disconnect", () => {
      //   this.users = this.users.filter((user) => user.socketId !== client.id);
      // });
      // add identity of user mapped to the socket id
      // client.on("identity", (userId) => {
      //   this.users.push({
      //     socketId: client.id,
      //     userId: userId,
      //   });
      // });
      // subscribe person to chat & other user as well
      // client.on("subscribe", (room, otherUserId = "") => {
      client.on("subscribe", (room) => {
        // this.subscribeOtherUser(room, otherUserId);
        console.log("In");
        client.join(room);
      });
      // mute a chat room
      client.on("unsubscribe", (room) => {
        
        client.leave(room);
      });
    }
  
    // subscribeOtherUser(room, otherUserId) {
    //   const userSockets = this.users.filter(
    //     (user) => user.userId === otherUserId
    //   );
    //   userSockets.map((userInfo) => {
    //     const socketConn = global.io.sockets.connected(userInfo.socketId);
    //     if (socketConn) {
    //       socketConn.join(room);
    //     }
    //   });
    // }
  }
  
  exports.default =  new WebSockets();