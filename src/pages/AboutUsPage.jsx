import React, { useEffect } from "react";
import Footer from "../layout/Footer";
import bg_image from "../assets/background.png";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-start pt-0 pb-20 px-4 sm:px-6 relative">
        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* HERO */}
        <div
          className="w-full bg-cover bg-center bg-no-repeat mb-10 px-0"
          style={{ backgroundImage: `url(${bg_image})` }}
        >
          <div className="flex justify-center">
            <div className="text-center max-w-3xl space-y-4 dark:bg-[#2e1d19]/80 backdrop-blur-md p-6 rounded-2xl">
              <h2 className="text-[24px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1B2053] leading-[1.15]">
                Smarter Legal Research <br /> Starts Here
              </h2>

              <p className="text-[13px] sm:text-xl color_1 font-medium max-w-2xl mx-auto">
                Lexpertise distills every Supreme Court judgment into clean,
                structured intelligence — summaries, headnotes, timelines,
                citations, and more.
              </p>

              <p className="text-[13px] sm:text-lg color_1 font-medium max-w-2xl mx-auto">
                Designed for lawyers, educators, and students who value speed
                and clarity.
              </p>
            </div>
          </div>
        </div>

        {/* ABOUT CONTENT */}
        <div className="w-full max-w-full bg-white px-6 sm:px-10 py-10">
          <h2 className="text-[22px] sm:text-3xl font-bold text-[#181311] text-center mb-8">
            About Us
          </h2>

          <div className="space-y-5 text-[14px] sm:text-[15px] leading-relaxed text-[#3d3d3d] text-justify">
            <p>
              The Lexpertise database is a comprehensive legal research platform
              that simplifies the analysis of Supreme Court judgments by
              delivering structured, high‑value data points for every case. Its
              core strength lies in transforming extensive court records into
              crisp case summaries, headnotes, judgment digests, and
              student‑friendly briefs. This enables legal professionals and
              learners to quickly grasp the key issues, arguments, and outcomes
              without having to navigate hundreds of pages.To support strategic
              decision‑making, the platform offers a distinctive judgment
              timeline that traces the procedural journey of each matter—from
              initiation to final disposition—providing clear context for every
              motion, order, and development. Each case entry is further
              enriched with detailed metadata, including party names, citations,
              coram details, and relevant statutory provisions, making
              Lexpertise a powerful resource for precedent tracking, trend
              analysis, and informed legal research.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
