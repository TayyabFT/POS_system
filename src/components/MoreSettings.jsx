"use client";
import { FiBook, FiEdit } from "react-icons/fi";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function MoreSettings() {
  const [language, setLanguage] = useState("English");
  const router = useRouter();
  return (
    <>
      <div className="flex  bg-white font-sans text-gray-900 h-screen ">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          <Navbar activeTab="setting" />
          <div className="m-11 p-2">
            <h1 className="text-lg font-bold ">Settings</h1>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between ">
                <h1 className="text-lg font-medium">Language</h1>
                <button
                  className=" flex gap-2 p-2 rounded-lg hover:cursor-pointer bg-gray-100 hover:cursor-pointer "
                  onClick={() => {
                    router.push("/editLanguage");
                  }}
                >
                  <FiEdit size={20} className="bg-gray-100 " />
                  Edit
                </button>
              </div>
              <h1 className="text-md ">Set a language for the XO POS app</h1>
              <div className="rounded-lg border border-gray-200 p-4 hover:cursor-pointer ">
                <h2 className="text-gray-500 text-sm">Language</h2>
                <h1>{language}</h1>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 my-4">
              <div className="flex justify-between">
                <h1 className="text-lg font-medium">Checkout</h1>
                <button className=" flex gap-2 p-2 rounded-lg hover:cursor-pointer bg-gray-100 hover:cursor-pointer ">
                  <FiEdit size={20} className="bg-gray-100 " />
                  Edit
                </button>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 my-2">
                <div
                  className="flex gap-2 hover:cursor-pointer "
                  onClick={() => {
                    router.push("/recieptCustomization");
                  }}
                >
                  <FiBook size={40} className="bg-gray-200 p-1 rounded-md" />
                  <div>
                    <h1>Reciept Customization </h1>
                    <h1 className="text-gray-500 text-sm ">
                      Customize reciept
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
