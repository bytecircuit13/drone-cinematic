"use client";

import { footerContent } from "../../lib/content";

export default function Footer() {
    return (
        <footer className="relative z-10 w-full bg-[#050505] text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-24">
                <div className="max-w-sm">
                    <p className="text-xl font-light text-neutral-300 leading-relaxed">
                        {footerContent.tagline}
                    </p>
                </div>
                <div className="flex flex-wrap md:flex-nowrap gap-12 md:gap-24">
                    {footerContent.columns.map((col, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <h4 className="text-xs md:text-sm tracking-[0.2em] uppercase text-neutral-500 font-medium mb-2">{col.title}</h4>
                            {col.links.map(link => (
                                <a key={link} href="#" className="text-sm md:text-base text-neutral-300 hover:text-white transition-colors block">
                                    {link}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-neutral-900 pt-8 text-xs md:text-sm text-neutral-600">
                {footerContent.copyright}
            </div>
        </footer>
    );
}
