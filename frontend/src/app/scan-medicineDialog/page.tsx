"use client";
// components/ScanMedicineDialog.tsx
import React, { useState } from "react";
import { Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import toast from "react-hot-toast";

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [medicineName, setMedicineName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [medicineCode, setMedicineCode] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file); // keep the actual file
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string); // preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("medicine_name", medicineName);
    formData.append("medicine_code", medicineCode);

    if (uploadedFile) {
      formData.append("image", uploadedFile); // ✅ append File, not Base64
    }

    // Debug: view FormData
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = await fetch("http://localhost:8080/scan", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to analyze medicine.");

      toast.success("Form submitted successfully!");
      setMedicineName("");
      setMedicineCode("");
      setUploadedFile(null);
      setUploadedImage(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleClear = () => {
    setMedicineName("");
    setMedicineCode("");
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-2xl font-bold text-gray-700">Scan Medicine</h2>
          {/* Removed close button as it's no longer a dialog */}
        </div>

        {/* Upload or Scan Section */}
        <div className="mb-6">
          <Label htmlFor="scan-slider" className="text-gray-600">
            Upload or scan medicine
          </Label>
          <Slider
            id="scan-slider"
            defaultValue={[50]}
            max={100}
            step={1}
            className="w-full mt-2"
          />
        </div>

        {/* Medicine Inputs */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="medicine-name" className="text-gray-600">
              Medicine name
            </Label>
            <Input
              id="medicine-name"
              type="text"
              placeholder="Aspirin"
              className="mt-1"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="medicine-code" className="text-gray-600">
              Medicine code(optional)
            </Label>
            <Input
              id="medicine-code"
              type="text"
              placeholder="123456"
              className="mt-1"
              value={medicineCode}
              onChange={(e) => setMedicineCode(e.target.value)}
            />
          </div>
        </div>

        {/* Scan Options */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">
            Scan Options
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <label
              htmlFor="image-upload"
              className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              {uploadedImage ? (
                <Image
                  src={uploadedImage}
                  alt="Uploaded"
                  width={50}
                  height={50}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Upload className="mb-2 h-8 w-8" />
                  Upload Image
                </>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Recent Searches */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">
            Recent Searches
          </h3>
          <div className="relative mb-4 flex items-center justify-between rounded-md bg-gray-100 p-2">
            <span className="text-sm font-medium text-gray-700">
              UPGRADE PLAN
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-gray-700">Recent 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-gray-700">Recent 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-gray-700">Pain reliever</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-gray-700">Fever</span>
            </div>
          </div>
        </div>

        {/* Other Options */}
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">Other</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-gray-700">Detailed info</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-gray-700">Dosage info</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-gray-700">Side</span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            type="submit"
            className="bg-blue-200 text-blue-800 hover:bg-blue-300"
          >
            Scan Now
          </Button>
        </div>
      </form>
    </div>
  );
}

export default page;