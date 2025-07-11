"use client";

import Image from "next/image";
import React, { useState } from "react";
import { InvoiceData } from "../HomePage/HomePage";
import Arr from "../../../Images/arrowRight.png";
import EditInvoice from "../Invoice/EditInvoice";
import { useTheme } from "../../ThemeContext";

interface InvoiceDetailProps {
  invoice: InvoiceData;
  onBack: () => void;
  onStatusChange: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
  onSave: (updatedInvoice: InvoiceData) => void;
}

const InvoiceDetail = ({
  invoice,
  onBack,
  onStatusChange,
  onDelete,
  onSave,
}: InvoiceDetailProps) => {
  const { theme } = useTheme();
  const [currentStatus, setCurrentStatus] = useState(invoice.status);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(invoice);
  const initialInvoice = React.useRef<InvoiceData>(
    JSON.parse(JSON.stringify(invoice))
  );

  const paymentDue = new Date(invoice.date);
  paymentDue.setDate(paymentDue.getDate() + 30);

  const handleMarkAsPaid = () => {
    setCurrentStatus("Paid");
    onStatusChange(invoiceData.id, "Paid");
  };

  const handleDeleteConfirm = () => {
    onDelete(invoiceData.id);
    setShowConfirmModal(false);
  };

  return (
    <div
      className={`flex flex-col items-center ${
        editInvoice && "fixed"
      } justify-center w-full min-h-screen p-5 ${
        theme === "dark" ? "bg-[#141625]" : "bg-[#F8F8FB]"
      }`}
    >
      <div className="w-[700px]">
        <button
          onClick={onBack}
          className={`flex items-center cursor-pointer gap-2 mb-5 font-semibold font-[inter] hover:opacity-70 ${
            theme === "dark" ? "text-white" : "text-[#0C0E16]"
          }`}
        >
          <Image src={Arr} alt="Back" width={12} height={12} />
          Go back
        </button>

        <div
          className={`rounded-lg shadow p-6 mb-6 flex justify-between items-center ${
            theme === "dark" ? "bg-[#1E2139]" : "bg-white"
          }`}
          style={{
            boxShadow: "0px 10px 10px -10px rgba(72, 84, 159, 0.10)",
          }}
        >
          <div className="flex items-center gap-4 font-[inter] font-semibold   ">
            <span
              className={theme === "dark" ? "text-white" : "text-[#0C0E16]"}
            >
              Status
            </span>
            <span
              className={`px-4 py-2 rounded-md text-sm font-bold font-league-spartan ${
                currentStatus === "Pending"
                  ? theme === "dark"
                    ? "border border-[#FF8F00] bg-[#FF8F00]/10 text-[#FF8F00]"
                    : "bg-yellow-100 text-yellow-700"
                  : currentStatus === "Paid"
                  ? theme === "dark"
                    ? "border border-[#33D69F] bg-[#33D69F]/10 text-[#33D69F]"
                    : "bg-green-100 text-green-700"
                  : theme === "dark"
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
              style={{
                fontSize: "15px",
                lineHeight: "15px",
                letterSpacing: "-0.25px",
              }}
            >
              ● {currentStatus}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditInvoice(true)}
              className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full font-[inter] font-semibold "
            >
              Edit
            </button>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-2  cursor-pointer  bg-red-500 hover:bg-red-200 rounded-full font-[inter] font-semibold  text-white"
            >
              Delete
            </button>
            {currentStatus === "Pending" && (
              <button
                onClick={handleMarkAsPaid}
                className="px-4 py-2 bg-[#7C5DFA]  cursor-pointer  hover:bg-[#9277FF] rounded-full font-[inter] font-semibold  text-white"
              >
                Mark as Paid
              </button>
            )}

            {editInvoice && (
              <EditInvoice
                onDiscard={() => {
                  setInvoiceData(initialInvoice.current);
                  setEditInvoice(false);
                  setCurrentStatus(initialInvoice.current.status);
                }}
                invoice={invoiceData}
                onSave={(updatedInvoice) => {
                  setInvoiceData(updatedInvoice);
                  setCurrentStatus(updatedInvoice.status);
                  setEditInvoice(false);
                  onSave(updatedInvoice);
                }}
              />
            )}
          </div>
        </div>

        <div
          className={`rounded-lg p-8 ${
            theme === "dark" ? "bg-[#1E2139]" : "bg-white"
          }`}
          style={{
            boxShadow: "0px 10px 10px -10px rgba(72, 84, 159, 0.10)",
          }}
        >
          <div className="w-full flex flex-col pl-[2px] pr-[22px]">
            <div
              className={`w-full flex flex-row justify-between items-start ${
                theme === "dark" ? "text-white" : "text-[#0C0E16]"
              }`}
            >
              <div>
                <h2 className="text-xl font-semibold font-[inter]  ">
                  #{invoiceData.id.toString().slice(-6)}
                </h2>
                <p className="text-[#c2c7e2]">{invoice.description}</p>
              </div>

              <div className="text-right md:text-left text-[#c2c7e2]">
                <p>{invoiceData.address}</p>
                <p>{invoiceData.city}</p>
                <p>{invoiceData.postcode}</p>
                <p>{invoiceData.country}</p>
              </div>
            </div>

            <div className="w-full flex flex-row justify-between mt-9 mb-5 pr-[80px]">
              <div className="flex flex-col gap-[50px]">
                <div>
                  <p className="text-[#c2c7e2]">Invoice Date</p>
                  <p
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-[#0C0E16]"
                    }`}
                  >
                    {new Date(invoiceData.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[#c2c7e2]">Payment Due</p>
                  <p
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-[#0C0E16]"
                    }`}
                  >
                    {paymentDue.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col hs-[0px] text-[#c2c7e2]">
                <p>Bill To</p>
                <p
                  className={`font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-[#0C0E16]"
                  }`}
                >
                  {invoiceData.name}
                </p>
                <p>{invoiceData.addressTwo}</p>
                <p>{invoiceData.cityTwo}</p>
                <p>{invoiceData.postcodeTwo}</p>
                <p>{invoiceData.countryTwo}</p>
              </div>

              <div>
                <p className="text-[#c2c7e2]">Sent to</p>
                <p
                  className={`font-bold ${
                    theme === "dark" ? "text-white" : "text-[#0C0E16]"
                  }`}
                >
                  {invoiceData.email}
                </p>
              </div>
            </div>
          </div>

          <div
            className={` w-[100%] p-6  flex flex-col justify-between  gap-4  ${
              theme === "dark" ? "bg-[#252945]" : "bg-[#f2f4fa] "
            } rounded-t-lg`}
          >
            <div
              className={`w-[95%] flex flex-row justify-between  font-semibold font-[inter] ${
                theme === "dark" ? "text-white" : "text-[#0C0E16]"
              }`}
            >
              <div className="w-[38%] flex flex-row justify-between itemc-center ">
                <p>Item Name</p>
                <p className="">QTY.</p>
              </div>
              <div className="w-[38%] flex flex-row justify-between md:gap-[160px] ">
                <p className="">Price</p>
                <p className="">Total</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              <div
                className={`md:col-span-1 font-bold ${
                  theme === "dark" ? "text-white" : "text-[#0C0E16]"
                }`}
              >
                {invoiceData.item}
              </div>
              <div
                className={`md:col-span-1 ml-4 font-bold ${
                  theme === "dark" ? "text-white" : "text-[#0C0E16]"
                }`}
              >
                {invoiceData.quantity}
              </div>
              <div
                className={`md:col-span-1 text-center font-bold ${
                  theme === "dark" ? "text-white" : "text-[#0C0E16]"
                }`}
              >
                {invoiceData.values}
              </div>
              <div
                className={`text-right font-bold ${
                  theme === "dark" ? "text-white" : "text-[#0C0E16]"
                }`}
              >
                ${invoiceData.total}
              </div>
            </div>
          </div>

          <div
            className={`rounded-b-lg p-7 flex justify-between bg-[#373B53] items-center ${
              theme === "dark" && "bg-[#F1F3FF]"
            }`}
          >
            <p
              className={`font-semibold font-[inter]  text-[18px] ${
                theme === "dark" ? `text-[#0C0E16]` : `text-white`
              }`}
            >
              Amount Due
            </p>
            <p
              className={`font-semibold font-[inter] text-[23px] ${
                theme === "dark" ? `text-[#0C0E16]` : `text-white`
              }`}
            >
              ${invoiceData.total}
            </p>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div
            className={`rounded-lg shadow-lg p-8 max-w-md w-full ${
              theme === "dark" ? "bg-[#1E2139]" : "bg-white"
            }`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-[#0C0E16]"
              }`}
            >
              Confirm Deletion
            </h2>
            <p
              className={`text-sm mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Are you sure you want to delete invoice #
              {invoiceData.id.toString().slice(-6)}? <br />
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className={`px-4 py-2 rounded ${
                  theme === "dark"
                    ? "bg-[#252945] hover:bg-[#333752] text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
