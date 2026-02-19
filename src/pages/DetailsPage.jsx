
import React, { useEffect, useState, } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopMenu from "../layout/TopMenu";
import Footer from "../layout/Footer";
import calendar_img from '../assets/calendar.png';
import person_img from '../assets/profile-circle.png';
import bank_img from '../assets/bank.png';
import note_img from '../assets/message-text.png';
import bookmark_img from '../assets/bookmark.png';
import pdf_img from '../assets/pdf_icon.png';



const DetailsPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // return (
    //   <>

    //   {/* Top Menu */}
    //   {/* <TopMenu/> */}
    //     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
    //       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
    //         {/* <div className="lg:col-span-4 flex flex-col gap-3">
    //           <div className="aspect-[3/4] bg-surface-light dark:bg-surface-dark rounded-xl flex items-center justify-center relative shadow-sm border border-border-light dark:border-border-dark group cursor-pointer overflow-hidden">
    //             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
    //               <div className="bg-white/90 dark:bg-black/90 px-4 py-2 rounded-full shadow-lg text-sm font-medium">Click to Preview</div>
    //             </div>
    //             <div className="flex flex-col items-center">
    //               <span className="material-icons-round text-pdf text-9xl">picture_as_pdf</span>
    //               <span className="text-pdf font-bold text-xl mt-[-10px]">PDF</span>
    //             </div>
    //           </div>
    //           <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
    //             <span>PDF Size: 4.2 MB</span>
    //             <div className="flex items-center gap-1">
    //               <span className="material-icons-round text-sm">visibility</span>
    //               <span>12.4k Views</span>
    //             </div>
    //           </div>
    //         </div> */}
    //         <div className="lg:col-span-12 flex flex-col">
    //           <div className="flex items-center gap-3 mb-4 flex-wrap">
    //             <span className="px-2.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wide">Court Case</span>
    //             <span className="text-sm text-slate-500 dark:text-slate-400">Term 2023 • Docket 22-148</span>
    //             <img src={bookmark_img} alt="Bookmark" className="item-end"/>
    //           </div>
    //           <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
    //             Quantum Computing v. Cryptography Standards
    //           </h1>
    //           <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-[#C5C7CA] dark:border-border-dark">
    //             <div className="flex items-center gap-2">
    //               <img src={person_img} alt="Author"/>
    //               <span className="font-medium text-slate-900 dark:text-white">Hon. Amelia Smith</span>
    //             </div>
    //             <div className="flex items-center gap-2">
    //               <img src={person_img} alt="Author"/>
    //               <span className="font-medium text-slate-900 dark:text-white">Hon. John Doe</span>
    //             </div>
    //           </div>
    //           <div className="mb-8 bg-surface-light dark:bg-surface-dark rounded-xl border border-[#C5C7CA] dark:border-border-dark p-6 shadow-sm">
    //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //               <div className="flex flex-col">
    //                 <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
    //                   <img src={bank_img} alt="Court"/>
    //                   <div className="text-lg font-bold text-slate-900 dark:text-white">Supreme Court</div>
    //                 </div>
                    
    //               </div>
    //               <div className="flex flex-col">
    //                 <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
    //                   <img src={calendar_img} alt="Date"/>
    //                   <div className="text-lg font-bold text-slate-900 dark:text-white">October 14, 2023</div>
    //                 </div>
                    
    //               </div>
    //               <div className="flex flex-col">
    //                 <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
    //                   <img src={note_img} alt="Docket Number"/>
    //                   <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">22-148</div>
    //                 </div>
                    
    //               </div>
    //             </div>
    //           </div>
    //           <div className="flex flex-col sm:flex-row gap-3">
    //             <button class="px-4 py-2 border btn_bordered rounded-full">
    //                 View
    //             </button>
    //             <button class="px-4 py-2 btn_primary rounded-full">
    //                   Download
    //             </button>
    //             {/* <button className="flex-1 bg-white dark:bg-transparent border border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
    //               <span className="material-icons-round text-lg">download</span>
    //               Download
    //             </button> */}
                
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mt-20 border-t border-[#C5C7CA] dark:border-border-dark pt-10">
            
    //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    //           <div className="group flex flex-col h-full">
    //             <img src={pdf_img} alt="PDF Icon"/>
    //             <h4 className="font-bold text-center text-slate-900 dark:text-white text-lg mb-1 leading-snug line-clamp-2">Headnotes</h4>
    //           </div>
              
    //             <div className="group flex flex-col h-full">
    //               <img src={pdf_img} alt="PDF Icon"/>
    //               <h4 className="font-bold text-center text-slate-900 dark:text-white text-lg mb-1 leading-snug line-clamp-2">Catchnotes</h4>
    //             </div>
              
    //           <div className="group flex flex-col h-full">
    //               <img src={pdf_img} alt="PDF Icon"/>
    //               <h4 className="font-bold text-center text-slate-900 dark:text-white text-lg mb-1 leading-snug line-clamp-2">Student Case Notes</h4>
    //             </div>
    //           <div className="group flex flex-col h-full">
    //               <img src={pdf_img} alt="PDF Icon"/>
    //               <h4 className="font-bold text-center text-slate-900 dark:text-white text-lg mb-1 leading-snug line-clamp-2">Judgement Summary</h4>
    //             </div>
    //           <div className="group flex flex-col h-full">
    //               <img src={pdf_img} alt="PDF Icon"/>
    //               <h4 className="font-bold text-center text-slate-900 dark:text-white text-lg mb-1 leading-snug line-clamp-2">Judgement Timeline Summary</h4>
    //             </div>
    //           <div className="group flex flex-col h-full">
    //               <img src={pdf_img} alt="PDF Icon"/>
    //               <h4 className="font-bold text-center text-slate-900 dark:text-white text-lg mb-1 leading-snug line-clamp-2">Case Commentry</h4>
    //             </div>
    //         </div>
    //       </div>
    //     </main>
    //     <Footer/>
    //   </>
     
    // );
  return(
    <h1 className="text-center text-xl font-bold">Coming Soon</h1>
  )
  }

export default DetailsPage;