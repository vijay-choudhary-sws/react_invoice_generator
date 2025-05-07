import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const Invoice = React.forwardRef((props, ref) => {
  const { data } = props;

  return (
    <div ref={ref}>
      <div class="row mb-4">
        <div class="col-md-6">
          <p class="mb-1">
            <strong>Date:</strong> {data.date}
          </p>
          <p class="mb-1">
            <strong>Bill To:</strong> {data.customerName}
          </p>
        </div>
      </div>
      <h4 class="mb-3">Items</h4>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
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
      <div class="d-flex justify-content-end">
        <h3 class="text-success">Total: ${data.total}</h3>
      </div>
    </div>
  );
});

const GenerateInvoice = () => {
  const invoiceData = {
    invoiceNumber: "INV12345",
    date: "2025-05-07",
    customerName: "John Doe",
    items: [
      { name: "Product 1", quantity: 2, price: 50 },
      { name: "Product 2", quantity: 1, price: 100 },
    ],
    total: 200,
  };

  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice_${invoiceData.invoiceNumber}`,
  });

  return (
    <div class="container my-5">
      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
          <h2 class="mb-0">Invoice #{invoiceData.invoiceNumber}</h2>
        </div>
        <div class="card-body">
          <Invoice ref={invoiceRef} data={invoiceData} />
          <div class="d-flex justify-content-start mt-4">
            <button className="btn btn-outline-primary" onClick={handlePrint}>
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;
