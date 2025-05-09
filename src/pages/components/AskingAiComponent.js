import React, { useState } from 'react';
import createHandleCommand from '../components/speechHandlerAiBot';

const AskingAiComponent = ({ invoiceData, setInvoiceData }) => {
  const [status, setStatus] = useState('Say something...');
  const [listen, setListen] = useState(false);
  
  const [conversationState, setConversationState] = useState({ step: null, data: {} });

  const speak = text => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  };

  const handleCommand = createHandleCommand({
    invoiceData,
    setInvoiceData,
    setStatus,
    speak,
    conversationState,
    setConversationState,
  });

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    setListen(true);
    speak('Listening...');

    recognition.onresult = event => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      setStatus(`You said: ${speechResult}`);
      speak(`You said: ${speechResult}`);
      handleCommand(speechResult);
    };

    recognition.onerror = event => {
      setStatus(`Error: ${event.error}`);
    };

    recognition.onend = () => {
      setListen(false);
    };
  };

  return (
    <div className="my-4">
      Example:-
      <ul>
        <li>Say “Hey Jarvis, change the name”</li>
        <li>Say “Hey Jarvis, add product”</li>
        <li>Say “Hey Jarvis, change name to John”</li>
        <li>Say “Hey Jarvis, add Pen with quantity 2 and price 100”</li>
      </ul>
      <h4>{status}</h4>
      <button className={'btn btn-warning' + (listen ? ' d-none' : '')} onClick={startListening}>
        Start Listening
      </button>
      <button className={'btn btn-primary' + (!listen ? ' d-none' : '')} type="button">
        <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
        <span role="status" className='ms-2'>Listening...</span>
      </button>
    </div>
  );
};

export default AskingAiComponent;
