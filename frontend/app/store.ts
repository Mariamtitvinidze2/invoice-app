"usse client";

import { InvoiceData } from "@/components/__organisms/HomePage/HomePage";
import { useState } from "react";

export const [invoices, setInvoices] = useState<InvoiceData[]>([]);
export const [selectedInvoice, setSelectedInvoice] =
  useState<InvoiceData | null>(null);

export const handleStatusChange = (id: number, newStatus: string) => {
  const updatedInvoices = invoices.map((invoice) =>
    invoice.id === id ? { ...invoice, status: newStatus } : invoice
  );
  setInvoices(updatedInvoices);
  localStorage.setItem("Invoices", JSON.stringify(updatedInvoices));
};

export const handleDeleteInvoice = (id: number) => {
  const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
  setInvoices(updatedInvoices);
  localStorage.setItem("Invoices", JSON.stringify(updatedInvoices));
  setSelectedInvoice(null);
};
