"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Invoice from "../Invoice/Invoice";
import EMailProf from "../../../Images/email.png";
import Image from "next/image";
import Arrow from "../../../Images/arr.png";
import InvoiceDetail from "../Invoice/InvoiceDetail";

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
  total: string;
  quantity: string;
  values: string;
  item: string;
  price: number;
};

const HomePage = () => {
  const [modal, setModal] = useState(false);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(
    null
  );
  const router = useRouter();

  const handleSaveInvoice = (updatedInvoice: InvoiceData) => {
    const updatedInvoices = invoices.map((inv) =>
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    );
    setInvoices(updatedInvoices);
    setSelectedInvoice(updatedInvoice);
    localStorage.setItem("Invoices", JSON.stringify(updatedInvoices));
  };

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
        onSave={handleSaveInvoice}
      />
    );
  }

  return (
    <div
      className={`${
        modal && `fixed`
      } w-[100%] h-[100vh] flex items-start justify-center relative`}
    >
      {modal && <Invoice onDiscard={() => setModal(false)} />}
      <div
        className={`"w-[700px] h-fit flex flex-col items-start justify-between mt-[50px] mb-8 "`}
      >
        <div className="w-[100%] flex flex-col items-center justify-between md:flex-row mb-8 ">
          <div>
            <h1 className="text-2xl md:text-[32px] font-bold text-[#0C0E16]   ">
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
          <div className="w-[100%] flex items-start flex-col gap-4">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => handleInvoiceClick(inv)}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white rounded-lg shadow w-[100%]  cursor-pointer hover:shadow-md transition"
              >
                <div className="flex flex-row justify-between w-[100%] ">
                  <div className="w-[110px]  ">
                    <span className="font-semibold text-[#0C0E16]">
                      #{inv.id.toString().slice(-6)}
                    </span>
                    <span className="text-[#888EB0] md:hidden">{inv.name}</span>
                  </div>

                  <div className="w-[130px] ">
                    <span className="text-[#888EB0]">
                      Due {new Date(inv.date).toLocaleDateString()}
                    </span>
                    <span className="text-[#0C0E16] font-bold md:hidden"></span>
                  </div>

                  <div className=" w-[120px] ">
                    <span className="text-[#0C0E16] font-semibold">
                      {inv.name}
                    </span>
                  </div>

                  <div className="w-[100px] ">
                    <span className="text-[#0C0E16] font-bold">
                      ${inv.total}
                    </span>
                  </div>
                </div>

                <div
                  className={`px-3 py-1 rounded-md text-sm mt-4 md:mt-0 text-center  w-[110px]  ${
                    inv.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : inv.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  ● {inv.status}
                </div>

                <Image
                  src={Arrow}
                  alt="left arrow"
                  width={12}
                  height={12}
                  className="ml-2"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className=" h-[100px] flex flex-col items-center justify-center text-center  ">
            <div className="text-center flex items-center flex-col justify-center gap-4 mt-[300px] ml-[200px] ">
              <Image
                src={EMailProf}
                alt="Empty"
                width={240}
                height={200}
                priority
                className=" "
              />
              <h2 className="text-2xl font-bold text-[#0C0E16]  ">
                There is nothing here
              </h2>
              <p className="text-sm text-[#888EB0]   ">
                Create an invoice by clicking the <br />
                <span className="font-semibold">New Invoice</span> button and
                get started
              </p>
            </div>
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
