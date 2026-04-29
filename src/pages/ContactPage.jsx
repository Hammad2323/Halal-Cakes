import { FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="px-4 md:px-12 py-16 max-w-6xl mx-auto font-[PlayfairDisplay] text-[#4B2E2E]">

   
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-wide">
          Get in Touch
        </h1>

        <p className="mt-4 text-[#7A4E4E] max-w-xl mx-auto font-[Poppins] leading-relaxed">
          Whether it's a custom cake, a special occasion, or a simple craving —  
          we’re here to make your moments sweeter with elegance and care.
        </p>
      </div>

    
      <div className="grid md:grid-cols-2 gap-8">

      
        <div className="bg-[#FFF0F3] p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#F3DDE2]">
          <h2 className="text-xl font-semibold mb-4">
            Contact Details
          </h2>

          <p className="text-[#7A4E4E] font-[Poppins] leading-relaxed mb-4">
            We'd love to hear from you. Reach out for custom cake orders,
            collaborations, or any sweet inquiries.
          </p>

          <p className="font-medium text-[#4B2E2E]">
            ✉️ aminhalalbakery@gmail.com
          </p>
        </div>

    
        <div className="bg-[#FFF0F3] p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#F3DDE2] text-center">

          <h2 className="text-xl font-semibold mb-4">
            Connect With Us
          </h2>

          <p className="text-[#7A4E4E] font-[Poppins] mb-6">
            Follow our creations or reach out directly for orders and inquiries.
          </p>

          <div className="flex justify-center gap-8 text-3xl">

          
            <a
              href="https://www.instagram.com/cakeup44?igsh=MXE3bTdjNGI5M2xqMQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition duration-300"
              style={{ color: "#E1306C" }}
            >
              <FaInstagram />
            </a>

          
            <a
              href="mailto:aminhalalbakery@gmail.com"
              className="hover:scale-125 transition duration-300"
              style={{ color: "#D44638" }}
            >
              <FaEnvelope />
            </a>

          </div>
        </div>

      </div>

      
      <div className="mt-16 text-center">
        <div className="w-16 h-[2px] bg-[#FF7F6A] mx-auto mb-6"></div>

        <p className="text-[#7A4E4E] italic text-lg font-[Poppins]">
          “Every message is the beginning of something sweet.”
        </p>
      </div>

    </div>
  );
}