const createHandleCommand = ({ invoiceData, setInvoiceData, setStatus, speak, conversationState, setConversationState }) => {
  return command => {
    const lowerCommand = command.toLowerCase();

    // Handle ongoing conversation state (multi-step)
    if (conversationState.step === 'awaitingName') {
      const customerName = lowerCommand.trim();
      setInvoiceData(prev => ({ ...prev, customerName }));
      speak(`Customer name updated to ${customerName}`);
      setStatus(`Name updated to ${customerName}`);
      setConversationState({ step: null, data: {} });
      return;
    }

    if (conversationState.step === 'awaitingProductName') {
      const productName = lowerCommand.trim();
      setConversationState({ step: 'awaitingQuantity', data: { name: productName } });
      speak('What is the quantity?');
      setStatus(`Got product "${productName}". Awaiting quantity...`);
      return;
    }

    if (conversationState.step === 'awaitingQuantity') {
      const quantity = parseInt(lowerCommand, 10);
      if (!quantity) {
        speak('Please say a valid number for quantity.');
        setStatus('Waiting for valid quantity...');
        return;
      }
      setConversationState(prev => ({
        step: 'awaitingPrice',
        data: { ...prev.data, quantity },
      }));
      speak('What is the price?');
      setStatus(`Got quantity ${quantity}. Awaiting price...`);
      return;
    }

    if (conversationState.step === 'awaitingPrice') {
      const price = parseFloat(lowerCommand);
      if (!price) {
        speak('Please say a valid number for price.');
        setStatus('Waiting for valid price...');
        return;
      }

      const { name, quantity } = conversationState.data;
      const newItem = { name, quantity, price };
      const updatedItems = [...invoiceData.items, newItem];
      const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      setInvoiceData(prev => ({ ...prev, items: updatedItems, total: newTotal }));
      speak(`Added ${quantity} ${name}(s) at ₹${price} each.`);
      setStatus(`Added ${quantity} ${name}(s) @ ₹${price}`);
      setConversationState({ step: null, data: {} });
      return;
    }

    // Chained full command: "Hey Jarvis, add Pen with quantity 2 and price 100"
    const productFullMatch = lowerCommand.match(/add (.+?) with quantity (\d+) and price (\d+)/);
    if (productFullMatch) {
      const [, name, quantityStr, priceStr] = productFullMatch;
      const quantity = parseInt(quantityStr, 10);
      const price = parseFloat(priceStr);

      if (!name || !quantity || !price) {
        speak('Incomplete product details.');
        return;
      }

      const newItem = { name: name.trim(), quantity, price };
      const updatedItems = [...invoiceData.items, newItem];
      const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      setInvoiceData(prev => ({ ...prev, items: updatedItems, total: newTotal }));
      speak(`Product ${newItem.name} added with quantity ${quantity} and price ${price}`);
      return;
    }

    // Chained name update: "Hey Jarvis, change name to John"
    const nameMatch = lowerCommand.match(/change name to ([a-z ]+)/);
    if (nameMatch && nameMatch[1]) {
      const customerName = nameMatch[1].trim();
      setInvoiceData(prev => ({ ...prev, customerName }));
      speak(`Customer name changed to ${customerName}`);
      return;
    }

    // Initiate conversational flow
    if (lowerCommand.includes('hey jarvis')) {
      if (lowerCommand.includes('change the name')) {
        speak('What should the name be?');
        setStatus('Awaiting customer name...');
        setConversationState({ step: 'awaitingName', data: {} });
        return;
      }

      if (lowerCommand.includes('add product')) {
        speak('What is the product name?');
        setStatus('Awaiting product name...');
        setConversationState({ step: 'awaitingProductName', data: {} });
        return;
      }
    }

    speak('Command not recognized.');
  };
};
export default createHandleCommand;
