"use client";
import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ScanMedicine() {
  const [medicineName, setMedicineName] = useState("");
  const [medicineCode, setMedicineCode] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("medicine_name", medicineName);
    formData.append("medicine_code", medicineCode);
    if (uploadedFile) {
      formData.append("image", uploadedFile);
    }

    try {
      const res = await fetch("http://localhost:8080/scan", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to analyze medicine");
      const data = await res.json();
      setResult(data);
      toast.success("Scan complete!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Upload + form */}
      <motion.form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow-xl backdrop-blur-md space-y-4 border border-gray-200 dark:border-gray-800"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-center">
          Scan Your Medicine
        </h2>

        <div className="space-y-2">
          <Label>Medicine Name</Label>
          <Input
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            placeholder="Enter medicine name"
          />
        </div>

        <div className="space-y-2">
          <Label>Medicine Code</Label>
          <Input
            value={medicineCode}
            onChange={(e) => setMedicineCode(e.target.value)}
            placeholder="Enter code"
          />
        </div>

        <div className="space-y-2">
          <Label>Upload Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />

          {uploadedImage && (
            <motion.div
              className="w-32 h-32 relative mt-2 rounded-xl overflow-hidden shadow-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Image
                src={uploadedImage}
                alt="Preview"
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Scan Now
            </>
          )}
        </Button>
      </motion.form>

      {/* Result with animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Skeleton shimmer */}
            <div className="animate-pulse space-y-4">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            key="result"
            className="p-6 mb-10 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 shadow-2xl border border-green-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold text-green-700 dark:text-green-300">
                Analysis for {result.medicine_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Summary:</strong> {result.data.summary}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Conclusion:</strong> {result.data.conclusion}
              </p>

              {result.data.possible_fake_reasons?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <strong className="text-red-600 dark:text-red-400">
                    Possible Fake Reasons:
                  </strong>
                  <ul className="list-disc pl-6 mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {result.data.possible_fake_reasons.map(
                      (reason: string, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          {reason}
                        </motion.li>
                      )
                    )}
                  </ul>
                </motion.div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
