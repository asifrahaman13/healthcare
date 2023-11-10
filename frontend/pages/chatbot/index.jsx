import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Loader from "@/components/Loader";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";


const index = () => {
    const [loadingTimeout, setLoadingTimeout] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    msg: "",
    statuscode: 0,
  });
  const [inputText, setInputText] = useState(""); // Add state for the input box
  const [email, setEmail] = useState(""); // Add state for the email box

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

  const handleStart = (e) => {
    e.preventDefault();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handlespeechSubmit = async (e) => {
    e.preventDefault();


    setIsLoading(true);
    setLoadingTimeout(
      setTimeout(() => {
        setIsLoading(false);
      }, 15000)
    );

    if (
      !inputText ||
      !username ||
      inputText.length == 0 ||
      username.length == 0
    ) {
      // At least one of the fields is empty or contains only whitespace
      // Handle the validation error here
      console.error("Please provide valid values for all fields.");
      setMessage({
        msg: "Something went wrong. Plesae fill the details properly",
        statuscode: 404,
      });
      return;
    }

    try {
      setMessage({
        msg: "Everything is successfully sent. Wait a few seconds to get your response.",
        statuscode: 200,
      });
      const response = await axios.post("http://localhost:5000/postquestion/", {
        question: inputText,
        username: username,
        email_support: email,
      });

      if (response.status == 200) {
        setIsLoading(false);
        setQuery((prevQuery) => ({
          ...prevQuery,
          answer: response.data.response,
        }));
        setChats((prevChats) => [
          ...prevChats,
          {
            question: inputText,
            answer: response.data.response,
          },
        ]);

        clearTimeout(loadingTimeout);

        console.log(email, email != null && email.length > 0);
        if (email != null && email.length > 0) {
          setMessage({
            msg: "Congratulation your result is here. You should have also received email now.",
            statuscode: 200,
          });
        }
      } else {
        setMessage({
          msg: "Something is wrong. Please enter your details properly.",
          statuscode: 404,
        });
      }
    } catch (err) {
      setMessage({
        msg: "Something is wrong. Please enter your details properly.",
        statuscode: 404,
      });
    }
  };

  const stopListening = (e) => {
    e.preventDefault();
    SpeechRecognition.stopListening();
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Update the inputText state with the transcript value
//   React.useEffect(() => {
//     setInputText(transcript);
//   }, [transcript]);

  const [username, setUsername] = useState("");

  const generateUniqueId = () => {
    setUsername(uuidv4());
  };

  useEffect(() => {
    generateUniqueId();
  }, []);

  const [query, setQuery] = useState({
    question: "",
    answer: "",
    username: "",
  });

  // Function to format text with bold and italic tags
  const formatText = (text) => {
    // Replace **text** with <b> tags for bold text
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Replace _text_ with <i> tags for italic text
    text = text.replace(/_(.*?)_/g, "<i>$1</i>");

    return text;
  };

  const [chats, setChats] = useState([]); // Initialize chats as an empty array

  const [showToast, setShowToast] = useState(false);

  // Function to show the toast
  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide the toast after 3 seconds (adjust as needed)
  };

  return (
    <>
    {isLoading && <Loader />}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-black tracking-widest font-medium title-font mb-1">
              ASTRA
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              CHAT WITH OUR APPLICATION
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-900">
              Our application is capable of chatting with high level of
              accuracy. Get the responses without much delay with good amount of
              latency. You will get to the point answers.
            </p>
          </div>
          <div className="flex flex-wrap">
            <div className="xl:w-1/3 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-black  font-medium title-font mb-2">
                Examples
              </h2>
              <p className="leading-relaxed text-base mb-4">
                I have fear of cats. I feel panic when I see them.
              </p>
              <p className="leading-relaxed text-base mb-4">
                I fear small holes. When I see honey beehive, or shouwer opening
                I feel anxiety.
              </p>
            </div>
            <div className="xl:w-1/3 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-black  font-medium title-font mb-2">
                Cpabilities
              </h2>
              <p className="leading-relaxed text-base mb-4">
                The application is able to remember your previous responses
              </p>
              <p className="leading-relaxed text-base mb-4">
                It can search over documentation and GPT-4 models
              </p>
            </div>
            <div className="xl:w-1/3 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-black  font-medium title-font mb-2">
                Limitations
              </h2>
              <p className="leading-relaxed text-base mb-4">
                At times it may not give proper response. Please be patient and
                try with newer prompts.
              </p>
              <p className="leading-relaxed text-base mb-4">
                Sometimes it may give weird answers. Plesae check your prompt
                and rewrite it to get better result. Refresh it if such case
                exists repeatedly.
              </p>
            </div>
            <div className="xl:w-1/3 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 mt-4">
              <h2 className="text-lg sm:text-xl text-black  font-medium title-font mb-2">
                How to use it
              </h2>
              <p className="leading-relaxed text-base mb-4">
                You can either type or can open the microphone to enable voice
                chat.
              </p>
              <p className="leading-relaxed text-base mb-4">
                Click on voice to enable voice chat. This will allow you to use
                both the voice chat as well as editing the text.
              </p>
              <p className="leading-relaxed text-base mb-4">
                If you want to use only the text then click on the "Only chat"
                option. You can reset the text using the 'Reset' button. When
                you are done click on the 'Send' button.
              </p>
              <p className="leading-relaxed text-base mb-4">
                in case you want to get email report of your condition then
                please enter your email address below the chat section.
              </p>
            </div>
            <div className="xl:w-1/3 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 mt-4">
              <h2 className="text-lg sm:text-xl text-black  font-medium title-font mb-2">
                Your response and latency
              </h2>
              <p className="leading-relaxed text-base mb-4">
                You do not need to wait long! If it is subjective question wait
                for 5-7 sec at max. It it is objective one then you will
                probably get instant results.
              </p>
              <p className="leading-relaxed text-base mb-4">
                Ensure that you are connected to the internet throughout the
                process.
              </p>
              <p className="leading-relaxed text-base mb-4">
                Dont refresh the page in between. Your response will be lost if
                you refresh it.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="relative">
        {showToast && <Success message={message} />}
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {chats.map((item, idx) => (
            <div key={idx} className="cont py-7">
              <div className="flex items-center lg:w-3/5 mx-auto  pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                  <h2 className="text-black  text-lg title-font font-medium mb-2">
                    USER QUESTION
                  </h2>
                  <p className="leading-relaxed text-base text-gray-300">
                    {item.question}
                  </p>
                </div>
                <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-black flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="sm:w-16 sm:h-16 w-10 h-10"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-black flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    stroke-width="2"
                    className="text-black w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                  </svg>
                </div>
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                  <h2 className="text-black text-lg title-font font-medium mb-2">
                    GPT RESPONSE
                  </h2>
                  <p
                    className="leading-relaxed text-base text-gray-300"
                    style={{ whiteSpace: "pre-line" }}
                    dangerouslySetInnerHTML={{
                      __html: formatText(item.answer),
                    }}
                  ></p>
                </div>
              </div>
            </div>
          ))}
          <div>
            {/* <p className="text-white">
              Microphone Status(🎤) : {listening ? "on ✅" : "off ❌"}
            </p> */}
            <textarea
              type="email"
              id="email"
              name="email"
              className="w-full h-10 bg-gray-700 bg-opacity-50 rounded border border-gray-700 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mt-10"
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="speech-buttons flex-col mt-4">
            {/* <button
              className="flex mx-auto  text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={(e) => {
                handleStart(e);
              }}
            >
              Voice
            </button>
            <button
              className="flex mx-auto text-white bg-black border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={(e) => {
                stopListening(e);
              }}
            >
              Only chat
            </button> */}
            {/* <button
              className="flex mx-auto  text-white bg-black border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={resetTranscript}
            >
              Reset
            </button> */}
            <button
              className="flex mx-auto  text-white bg-purple-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={(e) => {
                handlespeechSubmit(e);
              }}
            >
              Send
            </button>
          </div>
          <input
            className="flex mx-auto  text-white bg-purple-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-2"
            placeholder="Want a report? enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </section>
    </>
  );
};

export default index;
