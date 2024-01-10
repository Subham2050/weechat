let loc = window.location;
let wsStart = "ws://";
let endPoint = "";

if (loc.protocol == "https") {
  wsStart = "wss://";
}

endPoint = wsStart + loc.host + loc.pathname;
if (loc.pathname != "") {
  var socket = new WebSocket(endPoint);
  socket.onopen = async function (e) {
    console.log("chat socket connected", e);
  };

  socket.onclose = async function (e) {
    console.log(endPoint);
    console.log("chat socket closed unexpectedly", e);
  };

  socket.onmessage = async function (e) {
    console.log("sent message:", e);
    const data = JSON.parse(e.data);
    const message = data.message;
    setMessage(message);
  };

  socket.onerror = async function (e) {
    console.log(endPoint);
    console.log("close", e);
  };

  document.querySelector("#sendMsg").onclick = function (e) {
    const messageInputDom = document.querySelector("#textMsg");
    const message = messageInputDom.value;

    socket.send(
      JSON.stringify({
        message: message,
      })
    );

    messageInputDom.value = "";
  };

  function setMessage(message) {
    var div = document.createElement("div");
    div.className = "container-chatbox active";

    var message = document.createTextNode(message);
    div.appendChild(message);

    var container = document.getElementById("messages");
    container.appendChild(div);
  }
}
