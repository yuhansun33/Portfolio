import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { cs_courses, iem_courses } from "../data";

export default function About() {
  const [showAbout, setShowAbout] = useState(true);

  const toggleContent = (show) => {
    setShowAbout(show);
  };

  return (
    <section id="about">
      <div className="container mx-auto px-10 py-20">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="lg:flex-grow md:w-4/5 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-14 md:mb-0 items-center text-center ml-24">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold font-medium">
              Hi, I'm <span className="font-bold text-green-500">Yu Han</span>.
              <br className="hidden lg:inline-block" />I love to explore new things.
            </h1>
            <p className="mb-8 leading-relaxed">
              Senior of <span className="font-bold">Industrial Engineering</span> @ NYCU<br />
              GPA: 4.17/4.3 ; Ranking: 2/72 ; the Dean's List Award
            </p>
            <div className="mb-8 flex">
              <button
                onClick={() => toggleContent(true)}
                className={`text-lg mr-8 focus:outline-none ${
                  showAbout ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500 hover:text-green-500'
                }`}
              >
                About Me
              </button>
              <button
                onClick={() => toggleContent(false)}
                className={`text-lg focus:outline-none ${
                  !showAbout ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500 hover:text-green-500'
                }`}
              >
                Related Courses
              </button>
            </div>
            {showAbout ? (
              <p className="mb-8 leading-relaxed italic">
                My academic background and leadership roles have sharpened my critical thinking skills. I analyze challenges effectively and devise practical solutions. Always eager to learn, I adapt well to dynamic environments. I'm excited to apply my problem-solving abilities and dedication to growth as a backend engineer.
              </p>
            ) : (
              <div>
                <p className="mb-8 leading-relaxed"> | CS domain : <br/>
                {cs_courses.map((course) => (
                  <span key={course} className="bg-gray-300 px-2 py-0.9 rounded mx-1">
                    <code>{course}</code>
                  </span>
                ))}
                </p>
                <p className="mb-8 leading-relaxed"> | IEM domain : <br/>
                {iem_courses.map((course) => (
                  <span key={course} className="bg-gray-300 px-2 py-0.9 rounded mx-1">
                    <code>{course}</code>
                  </span>
                ))}
                </p>
              </div>
            )}
            <div className="flex justify-center">
              <button
                onClick={() => window.open('./YuHanSun_Resume.pdf', '_blank')}
                className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Resume
              </button>
              <button
                onClick={() => window.open('./YuHanSun_Transcript.pdf', '_blank')}
                className="ml-4 inline-flex text-gray-500 bg-white border-2 border-green-400 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
              >
                Transcript
              </button>
              <a
                href="#projects"
                className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
              >
                Projects
              </a>
            </div>
          </div>
          <div className="lg:max-w-sm lg:w-full md:w-1/5 w-5/6 flex">
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-70 h-80 object-cover object-center rounded-full border-4 border-green-200"
                alt="hero"
                src="./profile.jpg"
              />
              <div className="flex flex-row relative mt-3 mb-4 justify-center">
                <a
                  href="https://linkedin.com/in/yuhanssun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4"
                >
                  <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: "32px", color: "#0A66C2" }} />
                </a>
                <a
                  href="https://github.com/yuhansun33"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} style={{ fontSize: "32px", color: "#333" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}