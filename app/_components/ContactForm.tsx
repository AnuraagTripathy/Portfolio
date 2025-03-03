"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "../_actions/action";
import { toast } from "sonner";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Basic input validation
  const validate = () => {
    const newErrors = { name: "", email: "", subject: "", message: "" };

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      //TODO: Add email sending logic
      setIsSubmitting(true);
      try {
        toast.loading("Sending message...", { id: "sending-message" });
        const response = await sendEmail(formData);
        if (response.success) {
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          toast.success("Message sent successfully!", {
            id: "sending-message",
          });
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Error sending email:", error);
        setIsSubmitting(false);
        toast.error("Something went wrong!", { id: "sending-message" });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Validation failed");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mt-4 flex w-full max-w-lg flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className={errors.name ? "border-red-500" : ""}
      />
      {errors.name && (
        <p className="text-sm font-medium text-red-500">{errors.name}</p>
      )}

      <Input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className={errors.email ? "border-red-500" : ""}
      />
      {errors.email && (
        <p className="text-sm font-medium text-red-500">{errors.email}</p>
      )}

      <Input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className={errors.subject ? "border-red-500" : ""}
      />
      {errors.subject && (
        <p className="text-sm font-medium text-red-500">{errors.subject}</p>
      )}

      <Textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className={errors.message ? "border-red-500" : ""}
      />
      {errors.message && (
        <p className="text-sm font-medium text-red-500">{errors.message}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="via- mt-4 bg-gradient-to-t from-[#1c0913] to-[#860162]"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
