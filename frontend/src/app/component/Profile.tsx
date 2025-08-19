"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "./auth/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDialog({ isOpen, onClose }: ProfileDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [, setProfile] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const { logout } = useAuth();

  // Fetch profile when dialog opens
  useEffect(() => {
    if (!isOpen) return;

    fetch("http://localhost:8080/profile", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setEmail(data.email || "");
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [isOpen]);

  const handleUpdateProfile = async (updatedData: {
    name: string;
    email: string;
  }) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/profile",
        updatedData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Profile updated:", response.data);
      setProfile(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-xl overflow-hidden">
        {/* Header */}
        <DialogHeader className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Profile
          </DialogTitle>
        </DialogHeader>

        {/* User Info */}
        <div className="p-6 flex flex-col items-center gap-3">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-blue-400">
            <Image
              src="/img2.png"
              alt="User Avatar"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {name}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="px-6 py-3">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Profile
          </h3>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex md:flex-row gap-5 justify-center">
            <Button
              onClick={() => handleUpdateProfile({ name, email })}
              className="mt-5 w-25 cursor-pointer bg-blue-700 hover:bg-blue-600 dark:hover:bg-white-900 hover:text-white transition-colors duration-200"
            >
              Update
            </Button>
            <Button
              variant="outline"
              onClick={logout}
              className=" w-30 cursor-pointer mt-5 border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-700 transition-colors duration-200"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Sign Out */}
      </DialogContent>
    </Dialog>
  );
}
