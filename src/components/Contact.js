import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaCopy } from "react-icons/fa";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import AnimatedBackground from "./AnimatedBackground";
const Contact = () => {
  const email = "ajaybir555@gmail.com";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await addDoc(collection(db, "messages"), { ...form, timestamp: new Date() });
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setSuccess("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-transparent flex flex-col justify-between"
    >
      {/* Message Form */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-10 py-10">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Contact Me
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-primary dark:bg-primary-dark text-white font-semibold p-3 rounded-lg hover:bg-primary-dark dark:hover:bg-primary transition-colors"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
          {success && <p className="mt-4 text-green-500">{success}</p>}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full h-[30vh] bg-white dark:bg-gray-800 flex flex-col items-center justify-center text-gray-800 dark:text-gray-200">
        {/* Email */}
        <div className="flex items-center gap-2 mb-4">
          <FaEnvelope className="text-2xl" />
          <span className="text-lg">{email}</span>
          <button
            onClick={copyEmail}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Copy Email"
          >
            <FaCopy />
          </button>
          {copied && <span className="ml-1 text-green-500 text-sm animate-pulse">Copied!</span>}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6 text-3xl">
          <a
            href="https://www.linkedin.com/in/ajaybir-pandher/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/AjayPandher"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
            title="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
