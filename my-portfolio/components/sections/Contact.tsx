"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import aboutData from "@/data/about.json";

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
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-5">Let's Build Something Useful</h2>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-5" />
          <p className="text-muted text-base md:text-lg max-w-lg mx-auto">
            Have a project or opportunity in mind?<br className="hidden sm:block" /> I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-divider bg-surface p-6 md:p-10 shadow-card"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
            
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-text">Name</label>
              <input
                {...register("name")}
                id="name"
                type="text"
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl border bg-bg text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors duration-200 ${
                  errors.name ? "border-red-500/50 focus:border-red-500" : "border-divider focus:border-accent"
                }`}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-red-400 font-medium flex items-center gap-1.5 mt-1">
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
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 rounded-xl border bg-bg text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors duration-200 ${
                  errors.email ? "border-red-500/50 focus:border-red-500" : "border-divider focus:border-accent"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-400 font-medium flex items-center gap-1.5 mt-1">
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
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="How can I help you?"
                className={`w-full px-4 py-3 rounded-xl border bg-bg text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors duration-200 resize-y min-h-[120px] ${
                  errors.message ? "border-red-500/50 focus:border-red-500" : "border-divider focus:border-accent"
                }`}
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-red-400 font-medium flex items-center gap-1.5 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-accent text-white font-semibold shadow-sm hover:bg-accent/90 focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg focus:ring-accent transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Me a Message &rarr;
                </>
              )}
            </button>

          </form>
        </motion.div>

        {/* Alternative Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted mb-4">Or reach me directly at</p>
          <a
            href={`mailto:${aboutData.email}`}
            className="text-text font-medium text-lg hover:text-accent transition-colors duration-150 mb-6 inline-block"
          >
            {aboutData.email}
          </a>
          <div className="flex items-center justify-center gap-4">
            <a
              href={aboutData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-surface border border-divider text-muted hover:text-accent hover:border-accent transition-all duration-150 cursor-pointer"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={aboutData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-surface border border-divider text-muted hover:text-accent hover:border-accent transition-all duration-150 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
