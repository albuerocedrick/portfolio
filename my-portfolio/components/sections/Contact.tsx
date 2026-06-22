"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Send, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

// Form Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  // Dirty State Protection (Warns user if they try to leave or refresh with unsaved data)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Use internal API route which securely handles the Formspree logic
      const response = await axios.post('/api/contact', data);

      if (response.status === 200) {
        toast.custom((t) => (
          <div className="flex items-center gap-3 bg-surface border border-white/10 p-4 rounded-xl shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <p className="text-sm font-medium text-text">Message sent successfully!</p>
          </div>
        ));
        reset(); // Reset form which clears isDirty state
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.custom((t) => (
        <div className="flex items-center gap-3 bg-surface border border-white/10 p-4 rounded-xl shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-sm font-medium text-text">Failed to send message. Please try again.</p>
        </div>
      ));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 md:px-8 bg-bg">
      <div className="mx-auto max-w-3xl">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">Get in Touch</h2>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-6" />
          <p className="text-muted text-base md:text-lg">
            Have a question or want to work together? Leave a message below.
          </p>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-surface/30 p-6 md:p-10 shadow-sm"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
            
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-text">Name</label>
              <input
                {...register("name")}
                id="name"
                type="text"
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl border bg-bg/50 text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors duration-200 ${
                  errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-accent"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-text">Email</label>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="john@example.com"
                className={`w-full px-4 py-3 rounded-xl border bg-bg/50 text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors duration-200 ${
                  errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-accent"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-text">Message</label>
              <textarea
                {...register("message")}
                id="message"
                rows={5}
                placeholder="How can I help you?"
                className={`w-full px-4 py-3 rounded-xl border bg-bg/50 text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors duration-200 resize-y min-h-[120px] ${
                  errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-accent"
                }`}
              />
              {errors.message && (
                <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-accent text-white font-semibold shadow-sm hover:bg-accent/90 focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg focus:ring-accent transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
