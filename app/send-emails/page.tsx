"use client";
import React from "react";
import axios from "axios";

const EmailsPage = () => {
  console.log("Emails page");

  return (
    <div className="p-5 space-y-5">
      <div className="">Emails</div>

      <div
        className="bg-green-500 rounded px-3 py-2 text-white cursor-pointer"
        onClick={async () => {

          await axios.post('/api/serve')

        }}>
        Send Email
      </div>
    </div>
  );
};

export default EmailsPage;

