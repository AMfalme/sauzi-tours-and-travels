"use client"


import { useState } from "react";
import { Input } from "../components/ui/input";
import { TextArea} from "../components/ui/textarea"
export default function ContactPage() {



  const [form, setForm] = useState({
      userName: "",
      email: "",
      message: "",
    });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit following to sauziand tourstravel official email: ", form);
  };
  
  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>
        <p className="text-gray-600 mb-8">We’d love to hear from you! Fill out the form below and we’ll get back soon.</p>
        <form className="max-w-xl mx-auto space-y-4"
          onSubmit={handleSubmit}
        >
           <Input
              name="userName"
              placeholder="Your Name"
              value={form.userName}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              type="text"
            />
            <Input
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              type="email"
            />
            <TextArea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              required
              className="w-full border p-3 rounded h-32"
            />
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Send Message</button>
        </form>
      </div>
    </section>
  );
}
