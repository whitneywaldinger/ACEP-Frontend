import React, { useState } from "react";
import axios from "axios";
import "./QueryReceiver.css"

function QueryReceiver({ uploadedFiles }){
    const[userInput, setUserInput] = useState("");
    const[responses, setResponse] = useState([]);
    const[visible, setVisible] = useState(false);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
      };

    const toggleVisibility = () => {
      setVisible(!visible);
    }
    
    const handleSend = async() => {
        try{const userMessage  = userInput;
        const response = await axios.post("http://127.0.0.1:5000/sendquery", {text: userInput});
        setResponse([...responses, { text: userMessage, sender: 'user' }, { text: response.data.response, sender: 'bot' }]);

        setUserInput("");
        }catch (error) {
          console.error("Error sending message:", error);
        }
    };

    return (
      <div>
      <button className = "openChatButton" onClick = {toggleVisibility}>Open Chat</button>
      {visible && (
      <div className="ChatUI">
        <header><h2>ACEP Chatbot</h2></header>
        <div className="chatContainer">
          {responses.map((response, index) => (
            <div
            key={index}
            className={`chat-message ${response.sender === 'user' ? 'outgoing' : 'incoming'}`}
          >
            <p>{response.text}</p>
          </div>
          ))}
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Type a message..."
            onChange={handleInputChange}
            value={userInput}
          />
          <button disabled={userInput.length < 1} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
      )}
    </div>
    );
  
}

export default QueryReceiver;