"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InvoiceDetail from "../InvoiceDetail/InvoiceDetail";
import Invoice from "../Invoice/Invoice";
import EMailProf from "../../../Images/email.png";
import Image from "next/image";

export type InvoiceData = {
  id: number;
  address: string;
  city: string;
  postcode: string;
  country: string;
  addressTwo: string;
  cityTwo: string;
  postcodeTwo: string;
  countryTwo: string;
  name: string;
  email: string;
  description: string;
  date: string;
  status: string;
  total: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
};

const HomePage = () => {
  const [modal, setModal] = useState(false);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/");

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
  }, [modal]);

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, status: newStatus } : invoice
    );
    setInvoices(updatedInvoices);
    localStorage.setItem("Invoices", JSON.stringify(updatedInvoices));
  };

  const handleInvoiceClick = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  if (selectedInvoice) {
    return (
      <InvoiceDetail
        invoice={selectedInvoice}
        onBack={handleBack}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteInvoice}
      />
    );
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F8F8FB] relative">
      {modal && <Invoice onDiscard={() => setModal(false)} />}
      <div className="flex-1 p-6 md:p-12 flex flex-col ">
        <div className="flex flex-col items-center md:flex-row gap-[430px] ml-[300px] mb-8 md:mb-12">
          <div>
            <h1 className="text-2xl md:text-[32px] font-bold text-[#0C0E16] leading-none">
              Invoices
            </h1>
            <p className="text-sm text-[#888EB0] mt-1">
              {invoices.length} invoice{invoices.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-sm font-bold text-[#0C0E16] hover:opacity-70 flex items-center">
              Filter by status
              <span className="ml-2 text-xs">▼</span>
            </button>
            <button
              onClick={() => setModal(true)}
              className="flex items-center justify-start gap-2 md:gap-4 cursor-pointer bg-[#7C5DFA] hover:bg-[#9277FF] text-white font-semibold py-[8px] px-3 md:px-[15px] rounded-full"
            >
              <div className="bg-white ml-[-8px] text-[#7C5DFA] rounded-full w-8 h-8 text-center text-xl flex items-center justify-center">
                +
              </div>
              <span className="text-sm font-bold hidden md:inline">
                New Invoice
              </span>
              <span className="text-sm font-bold md:hidden">New</span>
            </button>
          </div>
        </div>

        {invoices.length > 0 ? (
          <div className="flex items-center flex-col gap-4">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => handleInvoiceClick(inv)}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white rounded-lg shadow w-full max-w-[900px] cursor-pointer hover:shadow-md transition"
              >
                <div className="flex justify-between w-full md:w-auto md:flex-1 mb-4 md:mb-0">
                  <span className="font-semibold text-[#0C0E16]">
                    #{inv.id.toString().slice(-6)}
                  </span>
                  <span className="text-[#888EB0] md:hidden">{inv.name}</span>
                </div>

                <div className="flex justify-between w-full md:w-auto md:flex-1">
                  <span className="text-[#888EB0]">
                    Due {new Date(inv.date).toLocaleDateString()}
                  </span>
                  <span className="text-[#0C0E16] font-bold md:hidden">
                    £ {inv.total.toFixed(2)}
                  </span>
                </div>

                <div className="hidden md:flex flex-1 justify-between">
                  <span className="text-[#0C0E16] font-semibold">
                    {inv.name}
                  </span>
                  <span className="text-[#0C0E16] font-bold">
                    £ {inv.total.toFixed(2)}
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm mt-4 md:mt-0 ${
                    inv.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : inv.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  ● {inv.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Image
              src={EMailProf}
              alt="Empty"
              width={240}
              height={200}
              priority
              className="mb-10"
            />
            <h2 className="text-2xl font-bold text-[#0C0E16] mb-4">
              There is nothing here
            </h2>
            <p className="text-sm text-[#888EB0] max-w-[220px]">
              Create an invoice by clicking the <br />
              <span className="font-semibold">New Invoice</span> button and get
              started
            </p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="fixed bottom-6 right-6 text-sm bg-[#7C5DFA] hover:bg-[#9277FF] text-white px-4 py-2 rounded-md shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
