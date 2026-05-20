const chatBox = document.getElementById("chatBox");
const input = document.getElementById("message");
const darkBtn = document.getElementById("darkBtn");
function addMessage(text, className) {
 const div = document.createElement("div");
 div.classList.add("message", className);
 div.innerText = text;
 chatBox.appendChild(div);
 chatBox.scrollTop = chatBox.scrollHeight;
}
async function sendMessage() {
 const message = input.value.trim();
 if (!message) return;
 addMessage(message, "user");
 input.value = "";
 // Show typing indicator
 const typing = document.createElement("div");
 typing.classList.add("message", "bot");
 typing.innerText = "Typing...";
 chatBox.appendChild(typing);
 try {
 const response = await fetch("/chat", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ message }),
 });
 const data = await response.json();
 typing.remove();
 addMessage(data.reply, "bot");
 saveChat();
 } catch (error) {
 typing.remove();
 addMessage("Something went wrong ■", "bot");
 }
}
// Send on Enter key
input.addEventListener("keypress", (e) => {
 if (e.key === "Enter") sendMessage();
});
// Save & load chat history
function saveChat() {
 localStorage.setItem("chatData", chatBox.innerHTML);
}
function loadChat() {
 const data = localStorage.getItem("chatData");
 if (data) chatBox.innerHTML = data;
}
loadChat();
// Dark mode toggle
darkBtn.addEventListener("click", () => {
 document.body.classList.toggle("dark");
});
