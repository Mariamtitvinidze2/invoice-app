"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Invoice from "../Invoice/Invoice";
import EMailProf from "../../../Images/email.png";
import Image from "next/image";
import Arrow from "../../../Images/arr.png";
import InvoiceDetail from "../Invoice/InvoiceDetail";
import { useTheme } from "../../ThemeContext";

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
  const { theme, toggleTheme } = useTheme();
  const [modal, setModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
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
        setInvoices(parsedInvoices);
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
    setShowLogoutModal(true);
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredInvoices = selectedStatuses.length
    ? invoices.filter((inv) => selectedStatuses.includes(inv.status))
    : invoices;

  return selectedInvoice ? (
    <InvoiceDetail
      invoice={selectedInvoice}
      onBack={handleBack}
      onStatusChange={handleStatusChange}
      onDelete={handleDeleteInvoice}
      onSave={handleSaveInvoice}
    />
  ) : (
    <div
      className={`${
        modal && "fixed"
      } w-full h-full min-h-screen flex items-start justify-center relative ${
        theme === "dark" ? "bg-[#141625]" : "bg-[#F8F8FB]"
      }`}
    >
      {modal && <Invoice onDiscard={() => setModal(false)} />}

      <div className="w-[700px] h-fit flex flex-col items-start justify-between mt-[50px] mb-8">
        <div className="w-full flex flex-col items-center justify-between md:flex-row mb-8 relative">
          <div>
            <h1
              className={`text-2xl md:text-[32px] font-bold ${
                theme === "dark" ? "text-white" : "text-[#0C0E16]"
              }`}
            >
              Invoices
            </h1>
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-gray-300" : "text-[#888EB0]"
              }`}
            >
              {filteredInvoices.length} invoice
              {filteredInvoices.length !== 1 ? "s" : ""} total
            </p>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative">
              <button
                className={`text-sm font-bold hover:opacity-70 cursor-pointer flex items-center ${
                  theme === "dark" ? "text-white" : "text-[#0C0E16]"
                }`}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                Filter by status
                <span className="ml-2 text-xs">▼</span>
              </button>

              {showFilterDropdown && (
                <div
                  className={`absolute z-10 mt-2 w-[130px]  flex h-[100px] flex-col rounded-md border shadow-md ${
                    theme === "dark"
                      ? "bg-[#1E2139] border-[#252945]"
                      : "bg-white border-gray-200"
                  }  `}
                >
                  <div className="w-[130px] bg-gray-300 h-[1px] absolute top-12 "></div>
                  {["Pending", "Paid"].map((status) => (
                    <label
                      key={status}
                      className={`flex items-center gap-2 mb-2 cursor-pointer pl-3 pt-2 font-[inter] font-semibold text-[20px]  ${
                        theme === "dark" ? "text-white" : "text-[#0C0E16]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => toggleStatus(status)}
                        className="cursor-pointer  "
                      />
                      {status}
                    </label>
                  ))}
                </div>
              )}
            </div>

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

        {filteredInvoices.length > 0 ? (
          <div className="w-[700px] flex items-start flex-col rounded-[23px] gap-4">
            {filteredInvoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => handleInvoiceClick(inv)}
                className={`flex flex-col md:flex-row justify-between rounded-[11px]  items-start md:items-center p-6 w-full cursor-pointer hover:shadow-md transition
                  ${
                    theme === "dark"
                      ? "bg-[#1E2139] shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)]"
                      : "bg-white shadow"
                  }
                `}
              >
                <div className="flex flex-row justify-between w-[85%]">
                  <div
                    className={`${
                      theme === "dark" ? "text-white" : "text-[#0C0E16]"
                    } w-[70px]`}
                  >
                    <span className="font-semibold">
                      #{inv.id.toString().slice(-6)}
                    </span>
                    <span className="md:hidden block text-gray-400">
                      {inv.name}
                    </span>
                  </div>

                  <div
                    className={`${
                      theme === "dark" ? "text-gray-300" : "text-[#888EB0]"
                    } w-[124px]`}
                  >
                    Due {new Date(inv.date).toLocaleDateString()}
                  </div>

                  <div
                    className={`${
                      theme === "dark" ? "text-white" : "text-[#0C0E16]"
                    } w-[145px] font-semibold`}
                  >
                    {inv.name}
                  </div>

                  <div
                    className={`${
                      theme === "dark" ? "text-white" : "text-[#0C0E16]"
                    } w-[100px] font-bold`}
                  >
                    ${inv.total}
                  </div>
                </div>

                <div
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold font-inter w-fit h-[32px]
                     ${
                       inv.status === "Pending"
                         ? theme === "dark"
                           ? "border border-[#FF8F00] bg-[#FF8F00]/10 text-[#FF8F00]"
                           : "bg-yellow-100 text-yellow-700"
                         : inv.status === "Paid"
                         ? theme === "dark"
                           ? "border border-[#33D69F] bg-[#33D69F]/10 text-[#33D69F]"
                           : "bg-green-100 text-green-700"
                         : "bg-gray-100 text-gray-700"
                     }`}
                >
                  <span className="text-lg">●</span>
                  {inv.status}
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
          <div className="flex flex-col items-center justify-center text-center mt-[60px] ml-[200px]">
            <Image
              src={EMailProf}
              alt="Empty"
              width={240}
              height={200}
              priority
            />
            <h2
              className={`${
                theme === "dark" ? "text-white" : "text-[#0C0E16]"
              } text-2xl font-bold mt-4`}
            >
              There is nothing here
            </h2>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-[#888EB0]"
              } text-sm mt-2`}
            >
              Create an invoice by clicking the <br />
              <span className="font-semibold">New Invoice</span> button and get
              started
            </p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="fixed bottom-6 right-6 text-sm bg-[#7C5DFA] hover:bg-[#9277FF] text-white px-4 py-2 cursor-pointer rounded-md shadow"
        >
          Logout
        </button>
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div
              className={`rounded-xl p-6 w-[320px] shadow-lg text-center ${
                theme === "dark" ? "bg-[#1E2139]" : "bg-white"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${
                  theme === "dark" ? "text-white" : "text-[#0C0E16]"
                }`}
              >
                Log out?
              </h3>
              <p
                className={`text-sm mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-[#888EB0]"
                }`}
              >
                Are you sure you want to log out?
              </p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    router.push("/");
                  }}
                  className="bg-red-500 cursor-pointer hover:bg-red-600 text-white py-2 px-4 rounded-md w-full"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className={`py-2 px-4 cursor-pointer rounded-md w-full ${
                    theme === "dark"
                      ? "bg-[#252945] hover:bg-[#333752] text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-[#0C0E16]"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
