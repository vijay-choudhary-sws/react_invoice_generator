import React, { useState } from "react";

const SpeechToAction = ({ invoiceData, setInvoiceData }) => {
  const [status, setStatus] = useState("Say something...");

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  };

  const handleCommand = (command) => {
    const lowerCommand = command.toLowerCase();

    // Match both parts separately using regex or simple split
    const nameRegex = /change name to ([a-z ]+?)(?: and|$)/;
    const productRegex =
      /add product(?: called| named)? ([a-z0-9 ]+?)(?: and|$)/;

    const nameMatch = lowerCommand.match(nameRegex);
    const productMatch = lowerCommand.match(productRegex);

    if (nameMatch && nameMatch[1]) {
      const customerName = nameMatch[1].trim();
      setInvoiceData((prev) => ({ ...prev, customerName }));
      speak(`Customer name changed to ${customerName}`);
    }

    if (productMatch && productMatch[1]) {
      const productName = productMatch[1].trim();
      const newItem = {
        name: productName,
        quantity: 1,
        price: 10,
      };

      const updatedItems = [...invoiceData.items, newItem];
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setInvoiceData((prev) => ({
        ...prev,
        items: updatedItems,
        total: newTotal,
      }));
      speak(`Product ${productName} added`);
    }

    if (!nameMatch && !productMatch) {
      speak("Command not recognized.");
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setStatus("Listening...");

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      setStatus(`You said: ${speechResult}`);
      speak(`You said: ${speechResult}`);
      handleCommand(speechResult);
    };

    recognition.onerror = (event) => {
      setStatus(`Error: ${event.error}`);
    };
  };

  return (
    <div className="my-4">
      <h4>{status}</h4>
      <button className="btn btn-warning" onClick={startListening}>
        Start Listening
      </button>
    </div>
  );
};

export default SpeechToAction;
