"use client";

import Image from "next/image";
import React, { useState } from "react";
import { InvoiceData } from "../HomePage/HomePage";
import Arr from "../../../Images/arrowRight.png";
import EditInvoice from "../Invoice/EditInvoice";

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
  const [currentStatus, setCurrentStatus] = useState(invoice.status);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(invoice);

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

  console.log(invoiceData, "total in InvoiceTotal!");
  console.log(invoiceData.item, "total in ");

  return (
    <div
      className={`flex flex-col items-center ${
        editInvoice === true && `fixed`
      } justify-center w-[100%] min-h-screen bg-[#F8F8FB] p-5 `}
    >
      <div className="w-[700px]">
        <button
          onClick={onBack}
          className="flex items-center cursor-pointer gap-2 mb-5 text-sm font-semibold text-[inter] hover:opacity-70"
        >
          <Image src={Arr} alt="Back" width={12} height={12} />
          Go back
        </button>

        <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-[#7E88C3]">Status</span>
            <span
              className={`px-4 py-2 rounded-md text-sm font-bold ${
                currentStatus === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              ● {currentStatus}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditInvoice(true)}
              className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-2  cursor-pointer  bg-red-100 hover:bg-red-200 rounded-full text-sm font-medium text-red-600"
            >
              Delete
            </button>
            {currentStatus === "Pending" && (
              <button
                onClick={handleMarkAsPaid}
                className="px-4 py-2 bg-[#7C5DFA]  cursor-pointer  hover:bg-[#9277FF] rounded-full text-sm font-medium text-white"
              >
                Mark as Paid
              </button>
            )}
            {editInvoice && (
              <EditInvoice
                onDiscard={() => setEditInvoice(false)}
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

        <div className=" rounded-lg shadow bg-white md:p-8 ">
          <div className="w-[100%] flex flex-col pl-[2px] pr-[22px]   ">
            <div className="w-[100%] flex flex-row justify-between items-start ">
              <div>
                <h2 className="text-xl font-bolds">
                  <span className="text-[#7E88C3]">#</span>
                  {invoiceData.id.toString().slice(-6)}
                </h2>
                <p className="text-[#7E88C3]">{invoice.description}</p>
              </div>

              <div className="text-right md:text-left text-[#7E88C3]">
                <p>{invoiceData.address}</p>
                <p>{invoiceData.city}</p>
                <p>{invoiceData.postcode}</p>
                <p>{invoiceData.country}</p>
              </div>
            </div>

            <div className="w-[100%] flex flex-row justify-between mt-9 mb-5 pr-[80px] ">
              <div className="flex flex-col gap-[50px] ">
                <div>
                  <p className="text-[#7E88C3]">Invoice Date</p>
                  <p className="font-bold">
                    {new Date(invoiceData.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[#7E88C3]">Payment Due</p>
                  <p className="font-bold">
                    {paymentDue.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col hs-[0px] ">
                <p className="text-[#7E88C3]">Bill To</p>
                <p className="font-bold mb-2">{invoiceData.name}</p>
                <p className="text-[#7E88C3]">{invoiceData.addressTwo}</p>
                <p className="text-[#7E88C3]">{invoiceData.cityTwo}</p>
                <p className="text-[#7E88C3]">{invoiceData.postcodeTwo}</p>
                <p className="text-[#7E88C3]">{invoiceData.countryTwo}</p>
              </div>

              <div>
                <p className="text-[#7E88C3]">Sent to</p>
                <p className="font-bold">{invoiceData.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#f2f4fa] w-[100%] h-[100px] rounded-t-lg pl-6 pr-6 pt-5">
            <div className="hidden md:grid grid-cols-4 gap-4 mb-3">
              <p className="text-[#7E88C3] font-medium">Item Name</p>
              <p className="text-[#7E88C3] font-medium text-right">QTY.</p>
              <p className="text-[#7E88C3] font-medium text-right">Price</p>
              <p className="text-[#7E88C3] font-medium text-right">Total</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap- mb-">
              <div className="md:col-span-1">
                <p className="font-bold">{invoiceData.item}</p>
              </div>
              <div className="hidden md:block mr-5 text-right">
                {invoiceData.quantity}
              </div>
              <div className="hidden md:block text-right">
                {invoiceData.values}
              </div>
              <div className="text-right font-bold">${invoiceData.total}</div>
            </div>
          </div>

          <div className="bg-[#373B53] rounded-b-lg p-6 flex justify-between items-center">
            <p className="text-white">Amount Due</p>
            <p className="text-2xl font-bold text-white">
              ${invoiceData.total}
            </p>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete invoice #
              {invoiceData.id.toString().slice(-6)}? <br />
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
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
