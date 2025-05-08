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

    const nameMatch = lowerCommand.match(/change name to ([a-z ]+?)(?: and|$)/);
    const productRegex = /add product ([a-z0-9 ]+?)(?: and|$)/;
    
    const productMatch = lowerCommand.match(
      /add product (.+?) with quantity (\d+) and price (\d+)/
    ) || lowerCommand.match(productRegex);

    if (nameMatch && nameMatch[1]) {
      const customerName = nameMatch[1].trim();
      setInvoiceData((prev) => ({ ...prev, customerName }));
      speak(`Customer name changed to ${customerName}`);
    }

    if (productMatch) {
      const productName = productMatch[1].trim();
      const quantity = parseInt(productMatch[2], 10) || 1;
      const price = parseFloat(productMatch[3]) || 100 ;

      const newItem = {
        name: productName,
        quantity,
        price,
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

      speak(
        `Product ${productName} added with quantity ${quantity} and price ${price}`
      );
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
      example:-
      <ul>
        <li>
          change name to <strong>Vijay Choudhary.</strong>
        </li>
        <li>add product <strong>Pen</strong>.</li>
        <li>
            add product <strong>Pen</strong> with quantity <strong>3</strong> and price <strong>50</strong>.
        </li>
        <li>Change name to <b>Jane</b> and add product <b>Pen</b> with quantity <b>3</b> and price <b>25</b>.</li>
      </ul>
      <h4>{status}</h4>
      <button className="btn btn-warning" onClick={startListening}>
        Start Listening
      </button>
    </div>
  );
};

export default SpeechToAction;
