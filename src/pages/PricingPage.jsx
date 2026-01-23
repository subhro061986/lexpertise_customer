
import React, { useEffect, useState, } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopMenu from "../layout/TopMenu";
import Footer from "../layout/Footer";
import check_img from '../assets/tick-square.png';
import uncheck_img from '../assets/close-square.png';
import arrow_down from '../assets/arrow-circle-down.png';




const PricingPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
      <>

      {/* Top Menu */}
      <TopMenu/>
        <main className="flex-grow">
          <div className="layout-container flex flex-col items-center py-10 px-4 md:px-10">
            <div className="flex flex-col items-center max-w-[800px] text-center mb-8 gap-4">
              <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                Simple, transparent pricing for legal professionals
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                Unlimited access to millions of court judgments, citation analysis tools, and advanced filtering to help you win your cases.
              </p>
            </div>
            <div className="mb-12">
              <div className="flex h-12 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border input_border dark:border-slate-700 relative">
                <label className="group relative flex cursor-pointer items-center justify-center px-6 rounded-lg text-sm font-bold z-10 transition-colors">
                  <input className="peer sr-only" name="billing" type="radio" value="monthly" />
                  <span className="text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200 peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors">Monthly</span>
                </label>
                <label className="group relative flex cursor-pointer items-center justify-center px-6 rounded-lg text-sm font-bold z-10 transition-colors background_yellow">
                  <input checked="" className="peer sr-only" name="billing" type="radio" value="yearly" />
                  <div className="absolute inset-0 bg-white dark:bg-slate-700 rounded-lg shadow-sm opacity-0 peer-checked:opacity-100 transition-all -z-10"></div>
                  <span className="text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200 peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors flex items-center gap-2">
                    Yearly
                    <span className="bg-green-100 font-bold dark:bg-green-900/30 dark:text-green-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">Save 20%</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 dark:bg-slate-800 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Starter</h3>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">₹999</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">/month</span>
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Perfect for independent practitioners.</p>
                </div>
                
                
                <div className="flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>Essential case search</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>100 PDF downloads/mo</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>Basic filters</span>
                  </div>
                  <div className="flex gap-3 text-slate-400 dark:text-slate-600">
                    <img src={uncheck_img} alt="uncheck"/>
                    <span>Citation analysis</span>
                  </div>
                  <button className="w-full btn_primary rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 px-4 text-sm font-bold transition-colors dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 mb-8">
                  Get Started
                </button>
                </div>
              </div>
              <div className="flex flex-col rounded-2xl border-2 border-primary bg-white p-8 dark:bg-slate-800 relative shadow-xl shadow-primary/5 transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Professional</h3>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">₹2,499</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">/month</span>
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">For growing firms needing deeper insights.</p>
                </div>
                
                <div className="flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span><strong>Unlimited</strong> search</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span><strong>Unlimited</strong> PDF downloads</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>Citation analysis &amp; visualizer</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>Advanced boolean filters</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>Collaborative folders</span>
                  </div>
                  <button className="w-full btn_primary rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 px-4 text-sm font-bold transition-colors dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 mb-8">
                    Subscribe Now
                  </button>
                </div>
              </div>
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 dark:bg-slate-800 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Team</h3>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">₹5,999</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">/month</span>
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Best for mid-sized firms and teams.</p>
                </div>
                
                <div className="flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>Multi-user access (up to 5)</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>API Access for integrations</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>Priority email &amp; phone support</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex gap-3">
                    <img src={check_img} alt="check"/>
                    <span>Custom invoicing</span>
                  </div>
                  <button className="w-full btn_primary rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 px-4 text-sm font-bold transition-colors dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 mb-8">
                  Contact Sales
                </button>
                </div>
              </div>
            </div>
            
            <div className="w-full max-w-3xl mb-20">
              <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border input_border dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 dark:text-white font-medium">
                      <span>Can I switch plans later?</span>
                      <img src={arrow_down} alt="arrow"/>
                    </summary>
                    <div className="px-4 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the change is immediate and you will be charged a prorated amount. If you downgrade, it will take effect at the end of your current billing cycle.
                    </div>
                  </details>
                </div>
                <div className="rounded-lg border input_border dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 dark:text-white font-medium">
                      <span>Is the payment secure?</span>
                      <img src={arrow_down} alt="arrow"/>
                    </summary>
                    <div className="px-4 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Absolutely. We use industry-standard encryption and process payments through compliant, secure gateways (Stripe/Razorpay). We do not store your credit card information on our servers.
                    </div>
                  </details>
                </div>
                <div className="rounded-lg border input_border dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 dark:text-white font-medium">
                      <span>Do you offer a free trial?</span>
                      <img src={arrow_down} alt="arrow"/>
                    </summary>
                    <div className="px-4 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      We offer a 7-day free trial on the Professional plan so you can experience the full power of LegalSearch. No credit card required to start the trial.
                    </div>
                  </details>
                </div>
                <div className="rounded-lg border input_border dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-slate-900 dark:text-white font-medium">
                      <span>Does the subscription auto-renew?</span>
                      <img src={arrow_down} alt="arrow"/>
                    </summary>
                    <div className="px-4 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Yes, for your convenience, all subscriptions are set to auto-renew. You can easily disable this in your account settings if you prefer manual renewal.
                    </div>
                  </details>
                </div>
              </div>
            </div>
            
          </div>
        </main>
        <Footer/>
      </>
     
    );
}

export default PricingPage;