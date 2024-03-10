import React, { useState } from "react";
import axios from "axios";
import { Input } from "../../components/Chat/input";
import { Button } from "../../components/Chat/button";
import "./HomePage.css";
import logoImage from "../../acep-logo.png"



function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

export default function Component() {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([
    { text: "Hello! I'm here to help you. What would you like to know?", sender: "bot" },
  ]);
  const [sources, setSources] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = async () => {
    const userMessage = userInput;
    try {
      const response = await axios.post("http://127.0.0.1:5000/sendquery", { text: userInput });
      setResponses((prevResponses) => [
        { text: response.data.response + " \n" + response.data.source, sender: "bot" },
        { text: userMessage, sender: "user" },
        ...prevResponses,
      ]);
      setUserInput(""); // Clear input after sending
    } catch (error) {
      setResponses((prevResponses) => [
        { text: "Failed to get responses from LLM.", sender: "bot" },
        ...prevResponses,
      ]);
      console.error("Error sending message:", error);
    }
  };

    return (
    <div className="min-h-screen bg-gray">
      <header className="bg-white py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <img alt="Logo" className="h-14 w-auto" src ={logoImage} />
          <a className="flex items-center space-x-2 text-gray-600 hover:text-gray-900" href="https://github.com/whitneywaldinger/ACEP-Frontend" rel="noopener noreferrer" target="_blank">
            <GithubIcon className="h-6 w-6" />
            <span>GitHub</span>
          </a>
        </div>
      </header>
      <main className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-black">Welcome to Our ACEP Chatbot</h1>
          <div className="mt-6 mb-12 w-full rounded-md bg-white p-6 shadow" style={{ width: '1200px', maxHeight: '1050px', overflowY: 'auto' }}>
            <div className="flex flex-col-reverse " style={{ minHeight: '100%' }}>
              {responses.map((response, index) => (
                <div key={index} className={`flex items-center space-x-4 ${response.sender === "user" ? "justify-end" : ""}`}>
                  <div className={`rounded-md p-4 mb-2 ${response.sender === "bot" ? "bg-gray-100" : "bg-blue-100"}`}>
                    <p className={`text-sm ${response.sender === "bot" ? "text-gray-600" : "text-blue-800"}`}>{response.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-md p-6 shadow" style={{ width: '1200px' }}>
            <div className="flex items-center space-x-2">
                <Input value={userInput} onChange={handleInputChange} placeholder="Type your message here..." />
                <Button onClick={handleSend} disabled={!userInput.trim()}>Send</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
