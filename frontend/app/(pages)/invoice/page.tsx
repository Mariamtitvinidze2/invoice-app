"use client";

import { InvoiceData } from "@/components/__organisms/HomePage/HomePage";
import InvoiceDetail from "@/components/__organisms/Invoice/InvoiceDetail";
import React, { useEffect, useState } from "react";

interface InvoiceDetailProps {
  invoice: InvoiceData | null;
  onBack: () => void;
  onStatusChange: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
}

const page = ({ invoice, onStatusChange, onDelete }: InvoiceDetailProps) => {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(
    null
  );

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, status: newStatus } : invoice
    );
    setInvoices(updatedInvoices);
    localStorage.setItem("Invoices", JSON.stringify(updatedInvoices));
  };

  const handleBack = () => {
    setSelectedInvoice(null);
  };

  const handleDeleteInvoice = (id: number) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoices);
    localStorage.setItem("Invoices", JSON.stringify(updatedInvoices));
    setSelectedInvoice(null);
  };

  useEffect(() => {
    const storedInvoices = localStorage.getItem("Invoices");
    if (storedInvoices) {
      try {
        const parsedInvoices = JSON.parse(storedInvoices);
        setInvoices(
          parsedInvoices.map((invoice: any) => ({
            ...invoice,
            items: invoice.items || [],
          }))
        );
      } catch (error) {
        console.error("Error parsing invoices:", error);
      }
    }
  }, []);

  return (
    <>
      {/* <InvoiceDetail
        invoice={selectedInvoice!}
        onBack={handleBack}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteInvoice}
      /> */}
    </>
  );
};

export default page;
