import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black">
      <div className="container mx-auto py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Company Information */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 px-4 mb-8">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="list-none">
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 px-4 mb-8">
            <h2 className="text-lg font-semibold mb-4">Services</h2>
            <ul className="list-none">
              <li><a href="#health-checkup">Health Checkup</a></li>
              <li><a href="#appointments">Appointments</a></li>
              <li><a href="#emergency">Emergency Services</a></li>
              <li><a href="#lab-services">Lab Services</a></li>
            </ul>
          </div>

          {/* Connect with Us */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 px-4 mb-8">
            <h2 className="text-lg font-semibold mb-4">Connect with Us</h2>
            <ul className="list-none">
              <li><a href="https://facebook.com">Facebook</a></li>
              <li><a href="https://twitter.com">Twitter</a></li>
              <li><a href="https://instagram.com">Instagram</a></li>
              <li><a href="https://linkedin.com">LinkedIn</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 px-4 mb-8">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="list-none">
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms-of-service">Terms of Service</a></li>
              <li><a href="#sitemap">Sitemap</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/5 px-4 mb-8">
            <h2 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h2>
            <form className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-black py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition duration-300 mt-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 pt-6 mt-6 text-sm text-gray-500">
          <p>&copy; 2023 HealthCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
