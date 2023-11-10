import React from 'react';

const ContactUsPage = () => {
  return (
<div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center shadow-xl">
  <div className="container mx-auto p-8">
    <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

    <div className="flex justify-center">
      {/* Contact Form */}
      <div className="w-full lg:w-1/2">
        <form className=" p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>

  </div>
</div>

  );
};

export default ContactUsPage;
