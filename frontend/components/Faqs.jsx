import React, { useState } from "react";

const Faqs = () => {
  const faqs = [
    {
      question: "How can I schedule a medical appointment?",
      answer:
        "You can schedule a medical appointment by logging into your patient portal or by calling our appointment hotline. Follow the provided instructions for a seamless booking process.",
    },
    {
      question: "What COVID-19 safety measures are in place?",
      answer:
        "Your health and safety are our top priorities. We have implemented strict COVID-19 safety protocols, including regular sanitization, social distancing measures, and virtual consultations when possible.",
    },
    {
      question: "How can I access my medical records?",
      answer:
        "You can access your medical records through our secure patient portal. Log in using your credentials, and you ll be able to view and download your medical history, test results, and other relevant information.",
    },
    {
      question: "What specialties do your healthcare professionals cover?",
      answer:
        "Our healthcare professionals cover a wide range of specialties, including but not limited to internal medicine, pediatrics, cardiology, dermatology, and more. Feel free to check our website or contact us for specific details about our medical staff.",
    },
    {
      question: "What should I bring to my first appointment?",
      answer:
        "For your first appointment, please bring a valid ID, insurance information, a list of current medications, and any relevant medical records. This will help us provide you with the best possible care.",
    },
    // Add more healthcare-related FAQ items as needed
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="bg-yellow-100">
        <div className="w-3/4 mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h1>
          <div>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md mb-4 shadow-md transition duration-300 ease-in-out"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <h2 className="text-lg font-semibold">{faq.question}</h2>
                  <svg
                    className={`w-6 h-6 ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={
                        activeIndex === index
                          ? "M19 9l-7 7-7-7"
                          : "M5 15l7-7 7 7"
                      }
                    />
                  </svg>
                </div>
                {activeIndex === index && (
                  <p className="text-gray-600 mt-4">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
