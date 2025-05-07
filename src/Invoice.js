import React, { useRef, useState } from "react";
import SpeechToAction from "./components/SpeechToAction";

const Invoice = React.forwardRef((props, ref) => {
  const { data } = props;

  return (
    <div ref={ref}>
      <div className="row mb-4">
        <div className="col-md-6">
          <p className="mb-1">
            <strong>Date:</strong> {data.date}
          </p>
          <p className="mb-1">
            <strong>Bill To:</strong> {data.customerName}
          </p>
        </div>
      </div>
      <h4 className="mb-3">Items</h4>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <h3 className="text-success">Total: ${data.total}</h3>
      </div>
    </div>
  );
});

const GenerateInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "INV12345",
    date: "2025-05-07",
    customerName: "John Doe",
    items: [
      { name: "Product 1", quantity: 2, price: 50 },
      { name: "Product 2", quantity: 1, price: 100 },
    ],
    total: 200,
  });

  const invoiceRef = useRef();

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Invoice #{invoiceData.invoiceNumber}</h2>
        </div>
        <div className="card-body">
          <Invoice ref={invoiceRef} data={invoiceData} />
          <div className="d-flex gap-3 justify-content-start mt-4"></div>
        </div>
      </div>

      <SpeechToAction
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
      />
    </div>
  );
};

export default GenerateInvoice;
