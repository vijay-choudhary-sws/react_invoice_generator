// src/pages/InvoicePage.js or App.js

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFInvoice from '../components/PDFInvoice'; // adjust path if needed

const invoiceData = {
  invoiceNumber: 'INV-001',
  date: '2025-05-07',
  customerName: 'Jane Smith',
  items: [
    { name: 'Service A', quantity: 2, price: 150 },
    { name: 'Service B', quantity: 1, price: 200 },
  ],
  total: 500,
};

const InvoicePage = () => {
  return (
    <div className="container mt-5">
      <h1>Invoice Page</h1>
      <PDFDownloadLink
        document={<PDFInvoice data={invoiceData} />}
        fileName={`Invoice_${invoiceData.invoiceNumber}.pdf`}
        style={{
          textDecoration: 'none',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          borderRadius: 5,
        }}
      >
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download Invoice')}
      </PDFDownloadLink>
    </div>
  );
};

export default InvoicePage;
