import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopMenu from "../layout/TopMenu";
import Footer from "../layout/Footer";
import secure_access_img from "../assets/secure_access.png";
import monthly_update_img from "../assets/monthly_update.png";
import advance_filling_img from "../assets/advance_filling.png";
import mission_img from "../assets/mission.png";
import values_img from "../assets/values.png";
import bg_image from "../assets/background.png";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Top Menu */}
      {/* <TopMenu /> */}
      <main class="flex-grow flex flex-col items-center justify-start pt-0 pb-20 px-4 sm:px-6 relative">
        <div class="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10">
          <div class="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10"></div>
          <div class="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div class="absolute top-40 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
        <div
          className="px-6 flex justify-center bg-cover bg-center bg-no-repeat mb-6 px-0 w-full"
          style={{ backgroundImage: `url(${bg_image})` }}
        >
          <div className="text-center max-w-3xl space-y-4 dark:bg-[#2e1d19]/80 backdrop-blur-md p-5 rounded-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#181311] dark:text-white leading-[1.15]">
              Unravelling the Complexity of Legal Research
            </h2>
            <p className="text-lg sm:text-xl color_1 font-medium max-w-2xl mx-auto">
              Access judgements and associated case toolkits to unravel the
              complexity of legal research
            </p>
          </div>
        </div>
          <div className="text-center max-w-3xl space-y-4 dark:bg-[#2e1d19]/80 backdrop-blur-md p-10 rounded-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#181311] dark:text-white leading-[1.15]">
              Search the Judgment&nbsp;
              <span className="text-primary relative inline-block secondary_color">
                Database
              </span>
            </h2>

            <p className="text-lg sm:text-xl color_1 font-medium max-w-2xl mx-auto">
              Gain instant access to millions of judgments, orders, and case statuses
              from Supreme, High, and District Courts.
            </p>
          </div>
        <div class="w-full max-w-5xl bg-white dark:bg-[#2e1d19] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-[#e6dedb] dark:border-[#3e2c26] overflow-hidden">
          <div class="border-b border-[#e6dedb] dark:border-[#3e2c26] bg-[#faf8f7] dark:bg-[#251815] px-6 py-4">
            <label class="text-sm font-bold tracking-wider color_1 mb-3 block">
              Select Court Level
            </label>
            <div class="flex flex-col sm:flex-row gap-2">
              <div class="selected_tab_color p-1 rounded-full inline-flex w-full sm:w-auto">
                <label class="group relative flex-1 sm:flex-none cursor-pointer">
                  {/* <input class="peer sr-only" name="court_type" type="radio" value="supreme" /> */}
                  <div class="px-6 py-2.5 rounded-md text-sm font-semibold dark:text-[#a08d87] peer-checked:bg-white dark:peer-checked:bg-[#2e1d19] peer-checked:text-primary peer-checked:shadow-sm transition-all text-center">
                    Supreme Court
                  </div>
                </label>
                {/* <label class="group relative flex-1 sm:flex-none cursor-pointer">
                    <input checked="" class="peer sr-only" name="court_type" type="radio" value="high" />
                    <div class="px-6 py-2.5 rounded-md text-sm font-semibold text-[#6d544b] dark:text-[#a08d87] peer-checked:bg-white dark:peer-checked:bg-[#2e1d19] peer-checked:text-primary peer-checked:shadow-sm transition-all text-center">
                      High Court
                    </div>
                  </label> */}
                {/* <label class="group relative flex-1 sm:flex-none cursor-pointer">
                    <input class="peer sr-only" name="court_type" type="radio" value="district" />
                    <div class="px-6 py-2.5 rounded-md text-sm font-semibold text-[#6d544b] dark:text-[#a08d87] peer-checked:bg-white dark:peer-checked:bg-[#2e1d19] peer-checked:text-primary peer-checked:shadow-sm transition-all text-center">
                      District Court
                    </div>
                  </label> */}
              </div>
            </div>
          </div>
          <div class="p-6 md:p-8 space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* <div class="space-y-2">
                  <label class="block text-sm font-semibold text-[#181311] dark:text-[#e0dad7]">
                    State
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8a6b60]">
                      <span class="material-symbols-outlined text-[20px]">map</span>
                    </div>
                    <select class="form-select block w-full pl-10 pr-10 py-3 text-base border-[#e6dedb] dark:border-[#523d36] bg-[#fcfbfb] dark:bg-[#251815] rounded-lg focus:ring-primary focus:border-primary sm:text-sm text-[#181311] dark:text-white transition-shadow shadow-sm">
                      <option disabled="" selected="" value="">Select State</option>
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                      <option>Florida</option>
                    </select>
                  </div>
                </div> */}
              {/* <div class="space-y-2">
                  <label class="block text-sm font-semibold text-[#181311] dark:text-[#e0dad7]">
                    District
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8a6b60]">
                      <span class="material-symbols-outlined text-[20px]">location_on</span>
                    </div>
                    <select class="form-select block w-full pl-10 pr-10 py-3 text-base border-[#e6dedb] dark:border-[#523d36] bg-[#fcfbfb] dark:bg-[#251815] rounded-lg focus:ring-primary focus:border-primary sm:text-sm text-[#181311] dark:text-white transition-shadow shadow-sm">
                      <option disabled="" selected="" value="">Select District</option>
                      <option>San Francisco</option>
                      <option>Los Angeles</option>
                      <option>San Diego</option>
                    </select>
                  </div>
                </div> */}
              <div class="space-y-2">
                <label class="block text-sm font-semibold dark:text-[#e0dad7]">
                  Case Category
                </label>
                <div class="relative">
                  {/* <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8a6b60]">
                      <span class="material-symbols-outlined text-[20px]">category</span>
                    </div> */}
                  <select class="form-select block w-full pl-10 pr-10 py-3 input_border bg-[#fcfbfb] dark:bg-[#251815] rounded-lg sm:text-sm dark:text-white transition-shadow shadow-sm">
                    <option disabled="" selected="" value="">
                      All Categories
                    </option>
                    <option>Civil</option>
                    <option>Criminal</option>
                    <option>Family</option>
                    <option>Corporate</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div class="lg:col-span-4 grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold dark:text-[#e0dad7]">
                    Year
                  </label>
                  <select class="form-select block w-full py-3 text-base input_border bg-[#fcfbfb] dark:bg-[#251815] rounded-lg focus:ring-primary focus:border-primary sm:text-sm dark:text-white shadow-sm">
                    <option value="">All</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-semibold dark:text-[#e0dad7]">
                    Month
                  </label>
                  <select class="form-select block w-full py-3 text-base input_border bg-[#fcfbfb] dark:bg-[#251815] rounded-lg focus:ring-primary focus:border-primary sm:text-sm  dark:text-white shadow-sm">
                    <option value="">All</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                </div>
              </div>
              <div class="lg:col-span-6 space-y-2">
                <label class="block text-sm font-semibold dark:text-[#e0dad7]">
                  Search By
                </label>
                <div class="relative">
                  <select class="form-select block w-full pl-10 pr-10 py-3 input_border bg-[#fcfbfb] dark:bg-[#251815] rounded-lg sm:text-sm dark:text-white transition-shadow shadow-sm">
                    {/* <option disabled="" selected="" value="">All Categories</option> */}
                    <option>Legislation</option>
                    <option>Criminal</option>
                    <option>Family</option>
                    <option>Corporate</option>
                  </select>{" "}
                </div>
              </div>
              {/* <div class="lg:col-span-2">
                  <button class="px-4 py-2 btn_primary rounded-full">
                      Search
                  </button>
                </div> */}
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div class="lg:col-span-6 space-y-2">
                <label class="block text-sm font-semibold dark:text-[#e0dad7]">
                  Search Query
                </label>
                <div class="relative">
                  <input
                    class="form-input block w-full pl-10 pr-4 py-3 text-base input_border bg-white dark:bg-[#251815] rounded-lg focus:ring-primary focus:border-primary  shadow-sm  dark:text-white"
                    placeholder="Enter Case Number, Party Name, or Keyword"
                    type="text"
                  />
                </div>
              </div>
              <div class="lg:col-span-2">
                <button class="px-4 py-2 btn_primary rounded-full">
                  Search
                </button>
              </div>
              <div class="lg:col-span-4">
                <button class="px-4 py-2 selected_tab_color rounded-full">
                  Advance Search
                </button>
              </div>
            </div>
            {/* <div class="flex flex-wrap gap-4 pt-2">
                <span class="text-sm text-[#8a6b60] dark:text-[#a08d87]">Popular Searches:</span>
                <a class="text-sm font-medium text-primary hover:underline" href="#">Constitutional Rights</a>
                <span class="text-[#e6dedb] dark:text-[#523d36]">•</span>
                <a class="text-sm font-medium text-primary hover:underline" href="#">Labor Disputes</a>
                <span class="text-[#e6dedb] dark:text-[#523d36]">•</span>
                <a class="text-sm font-medium text-primary hover:underline" href="#">Property Tax</a>
              </div> */}
          </div>
        </div>
        <div class="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl w-full px-4">
          <div class="flex flex-col items-center text-center gap-3">
            <div class="bg-white dark:bg-[#2e1d19] p-3 rounded-full shadow-sm">
              <img
                src={secure_access_img}
                alt="Secure Access"
                class="text-primary"
              />
            </div>
            <h3 class="font-bold text-[#181311] dark:text-white">
              Secure Access
            </h3>
            <p class="text-sm dark:text-[#a08d87]">
              Encrypted database access ensuring privacy and security for
              sensitive legal data.
            </p>
          </div>
          <div class="flex flex-col items-center text-center gap-3">
            <div class="bg-white dark:bg-[#2e1d19] p-3 rounded-full shadow-sm">
              <img
                src={monthly_update_img}
                alt="Monthly Updates"
                class="text-primary"
              />
            </div>
            <h3 class="font-bold text-[#181311] dark:text-white">
              Monthly Updates
            </h3>
            <p class="text-sm dark:text-[#a08d87]">
              Daily updates from over 3,000 courts across the country.
            </p>
          </div>
          <div class="flex flex-col items-center text-center gap-3">
            <div class="bg-white dark:bg-[#2e1d19] p-3 rounded-full shadow-sm">
              <img
                src={advance_filling_img}
                alt="Advanced Filing"
                class="text-primary"
              />
            </div>
            <h3 class="font-bold text-[#181311] dark:text-white">
              Advanced Filing
            </h3>
            <p class="text-sm dark:text-[#a08d87]">
              Comprehensive case history with digitized document archives.
            </p>
          </div>
        </div>
        <div class="w-full max-w-5xl px-4 sm:px-6 mt-24 mb-10">
          <div class="bg-[#faf8f7] dark:bg-[#251815] rounded-2xl p-8 md:p-12 border border-[#e6dedb] dark:border-[#3e2c26]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="space-y-6">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full selected_tab_color text-primary text-xs font-bold uppercase tracking-wider w-fit">
                  <span class="w-2 h-2 rounded-full bullet_span"></span>
                  About Us
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-[#181311] dark:text-white leading-tight">
                  Connecting You to the{" "}
                  <span class="text-primary">Justice System</span>
                </h2>
                <p class="dark:text-[#a08d87] text-lg leading-relaxed">
                  LexSearch offers a comprehensive suite of tools designed to
                  simplify legal research. From instant case retrieval to
                  advanced analytics, we empower users with the data they need
                  to make informed decisions.
                </p>
              </div>
              <div class="grid gap-6">
                <div class="bg-white dark:bg-[#2e1d19] p-6 rounded-xl shadow-sm border border-[#e6dedb] dark:border-[#3e2c26] transition-transform hover:-translate-y-1 duration-300">
                  <div class="flex gap-4">
                    <div class="shrink-0 size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <img src={mission_img} alt="Our Mission" />
                    </div>
                    <div>
                      <h3 class="font-bold text-lg text-[#181311] dark:text-white mb-2">
                        Our Mission
                      </h3>
                      <p class="text-sm dark:text-[#a08d87]">
                        To create the most accessible, transparent, and reliable
                        national judicial database for every citizen.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="bg-white dark:bg-[#2e1d19] p-6 rounded-xl shadow-sm border border-[#e6dedb] dark:border-[#3e2c26] transition-transform hover:-translate-y-1 duration-300">
                  <div class="flex gap-4">
                    <div class="shrink-0 size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <img src={values_img} alt="Our Values" />
                    </div>
                    <div>
                      <h3 class="font-bold text-lg text-[#181311] dark:text-white mb-2">
                        Our Values
                      </h3>
                      <p class="text-sm dark:text-[#a08d87]">
                        We are driven by integrity, accuracy, and a commitment
                        to public service in everything we build.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
