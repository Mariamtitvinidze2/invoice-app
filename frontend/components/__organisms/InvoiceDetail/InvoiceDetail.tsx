"use client";

import Image from "next/image";
import React, { useState } from "react";
import BackArrow from "../../../Images/BackArrow.png";
import { InvoiceData } from "../HomePage/HomePage";

interface InvoiceDetailProps {
  invoice: InvoiceData;
  onBack: () => void;
  onStatusChange: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
}

const InvoiceDetail = ({
  invoice,
  onBack,
  onStatusChange,
  onDelete,
}: InvoiceDetailProps) => {
  const [currentStatus, setCurrentStatus] = useState(invoice.status);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const paymentDue = new Date(invoice.date);
  paymentDue.setDate(paymentDue.getDate() + 30);

  const handleMarkAsPaid = () => {
    setCurrentStatus("Paid");
    onStatusChange(invoice.id, "Paid");
  };

  const handleDeleteConfirm = () => {
    onDelete(invoice.id);
    setShowConfirmModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#F8F8FB] p-4 md:p-8 relative">
      <div className="w-full max-w-3xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-sm font-medium text-[#7C5DFA] hover:opacity-70"
        >
          <Image src={BackArrow} alt="Back" width={12} height={12} />
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
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium">
              Edit
            </button>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-full text-sm font-medium text-red-600"
            >
              Delete
            </button>
            {currentStatus === "Pending" && (
              <button
                onClick={handleMarkAsPaid}
                className="px-4 py-2 bg-[#7C5DFA] hover:bg-[#9277FF] rounded-full text-sm font-medium text-white"
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold mb-2">
                <span className="text-[#7E88C3]">#</span>
                {invoice.id.toString().slice(-6)}
              </h2>
              <p className="text-[#7E88C3]">{invoice.description}</p>
            </div>

            <div className="text-right md:text-left text-[#7E88C3]">
              <p>{invoice.address}</p>
              <p>{invoice.city}</p>
              <p>{invoice.postcode}</p>
              <p>{invoice.country}</p>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[#7E88C3]">Invoice Date</p>
                <p className="font-bold">
                  {new Date(invoice.date).toLocaleDateString("en-GB", {
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

            <div>
              <p className="text-[#7E88C3]">Bill To</p>
              <p className="font-bold mb-2">{invoice.name}</p>
              <p className="text-[#7E88C3]">{invoice.addressTwo}</p>
              <p className="text-[#7E88C3]">{invoice.cityTwo}</p>
              <p className="text-[#7E88C3]">{invoice.postcodeTwo}</p>
              <p className="text-[#7E88C3]">{invoice.countryTwo}</p>
            </div>

            <div>
              <p className="text-[#7E88C3]">Sent to</p>
              <p className="font-bold">{invoice.email}</p>
            </div>
          </div>

          <div className="bg-[#F9FAFE] rounded-t-lg p-6">
            <div className="hidden md:grid grid-cols-4 gap-4 mb-6">
              <p className="text-[#7E88C3] font-medium">Item Name</p>
              <p className="text-[#7E88C3] font-medium text-right">QTY.</p>
              <p className="text-[#7E88C3] font-medium text-right">Price</p>
              <p className="text-[#7E88C3] font-medium text-right">Total</p>
            </div>

            {invoice.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
              >
                <div className="md:col-span-1">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-[#7E88C3] md:hidden">
                    {item.quantity} × £{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="hidden md:block text-right">
                  {item.quantity}
                </div>
                <div className="hidden md:block text-right">
                  £ {item.price.toFixed(2)}
                </div>
                <div className="text-right font-bold">
                  £ {item.total.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#373B53] rounded-b-lg p-6 flex justify-between items-center">
            <p className="text-white">Amount Due</p>
            <p className="text-2xl font-bold text-white">
              £ {invoice.total.toFixed(2)}
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
              {invoice.id.toString().slice(-6)}? <br />
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
