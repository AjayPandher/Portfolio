import { TypeAnimation } from "react-type-animation";
import { FiDownload } from "react-icons/fi";
import { useState, useEffect } from "react";

const Home = () => {
  const resumeUrl =
    "https://firebasestorage.googleapis.com/v0/b/ajportbase.firebasestorage.app/o/ajay_resume_FS.pdf?alt=media&token=2b2cc907-7d00-4ee8-8367-00c234094d83";

  const [showContent, setShowContent] = useState(false);
  const [nameMoved, setNameMoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      setNameMoved(true);
    }, 1500); // keep typing delay
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "AjayPandher-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-transparent px-6 text-center"
    >
      {/* Name with typing effect */}
      <h1
        className={`text-6xl sm:text-7xl md:text-8xl font-extrabold mb-6 text-gray-900 dark:text-white transition-transform duration-[2500ms] ease-out ${
          nameMoved ? "-translate-y-20 sm:-translate-y-24 md:-translate-y-28" : ""
        }`}
      >
        <TypeAnimation
          sequence={["Hi, I'm Ajay"]} // slow typing
          speed= {1}
          wrapper="span"
          cursor={true}
          repeat={0}
        />
      </h1>

      {/* Bottom content */}
      {showContent && (
        <div className="flex flex-col items-center justify-center gap-6 max-w-3xl animate-fadeUp">
          {/* Phrase */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Turning Ideas into Scalable Products
          </h2>

          {/* Paragraph */}
          <p className="text-center text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Crafting seamless web and mobile experiences with React, Flutter, and Node.js.  
            From finance and fitness apps to SonyLiv streaming at TCS, I bring  
            performance, design, and intelligence to every solution.  
            Passionate about AI/ML, streaming tech, and building products that scale.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a
              href="#projects"
              className="px-10 py-3 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              🚀 Explore My Work
            </a>
            <button
              onClick={handleDownload}
              className="px-10 py-3 rounded-full border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold flex items-center gap-2 justify-center hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <FiDownload size={18} /> Resume
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(120px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          /* slow start, faster end */
        }
      `}</style>
    </section>
  );
};

export default Home;
