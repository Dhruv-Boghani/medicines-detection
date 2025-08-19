"use client";
import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Mail, Phone } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function HelpPage() {
  const steps = [
    {
      title: "Upload Image",
      description:
        "Choose a clear photo of your medicine packaging or tablet strip to begin.",
    },
    {
      title: "Enter Medicine Details",
      description:
        "Fill in the medicine name and optional code for accurate detection.",
    },
    {
      title: "Scan & Analyze",
      description:
        "Click 'Scan Now' to analyze the image and get authenticity details.",
    },
    {
      title: "View Results",
      description:
        "Review the report including summary, conclusion, and fake detection alerts.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <motion.div
        className="text-center space-y-3"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HelpCircle className="w-12 h-12 mx-auto text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Need guidance? Follow the steps below or check out the FAQs. We’re
          here to help you use our medicine detection system smoothly.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="rounded-2xl shadow-lg bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 backdrop-blur-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                  Step {idx + 1}: {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>How accurate is the detection?</AccordionTrigger>
            <AccordionContent>
              Our AI-powered system provides high accuracy by analyzing images
              and matching them against trusted medicine data. However, always
              consult a healthcare professional for final confirmation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>
              What types of images are supported?
            </AccordionTrigger>
            <AccordionContent>
              Clear photos of packaging, blister packs, or strips are
              recommended. Avoid blurry or poorly lit images for best results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>
              Can I use this without entering a medicine code?
            </AccordionTrigger>
            <AccordionContent>
              Yes! Uploading an image and providing just the medicine name is
              enough, though adding a code increases accuracy.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="rounded-2xl shadow-lg bg-gradient-to-r from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 border border-green-200 dark:border-gray-700 p-8 text-center space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300">
          Still Need Help?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Reach out to our support team for any questions or issues.
        </p>
        <div className="flex justify-center gap-8">
          <motion.div
            className="flex items-center gap-2 cursor-pointer text-green-600 dark:text-green-400 hover:underline"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-5 h-5" /> support@meddetect.com
          </motion.div>
          <motion.div
            className="flex items-center gap-2 cursor-pointer text-green-600 dark:text-green-400 hover:underline"
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="w-5 h-5" /> +1 234 567 89
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
