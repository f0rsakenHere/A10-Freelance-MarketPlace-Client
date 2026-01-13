import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate success
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message sent. We'll get back to you soon!");
      setForm({ name: "", email: "", message: "" });
    }, 700);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Have a question or need help? Send us a message and we'll respond as
          soon as possible.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You can also reach us via email or phone.
          </p>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <strong>Email:</strong> support@freelancehub.example
            </li>
            <li>
              <strong>Phone:</strong> +1 (555) 123-4567
            </li>
            <li>
              <strong>Address:</strong> 123 Market St, Suite 400
            </li>
          </ul>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Send Message
              </button>
              {status && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          Prefer live chat? We're available weekdays from 9am–5pm.
        </p>
      </section>
    </main>
  );
};

export default Contact;
