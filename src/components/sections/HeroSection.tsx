import { heroContent } from "../../lib/content";

export default function HeroSection() {
    return (
        <section className="min-h-[90vh] w-full flex flex-col justify-end items-start px-8 md:px-16 lg:px-24 pb-24 md:pb-32">
            <div className="max-w-4xl">
                <p className="text-[#a0a0a0] tracking-[0.2em] text-sm md:text-base uppercase mb-4 md:mb-6 drop-shadow-md">
                    {heroContent.eyebrow}
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white mb-6 md:mb-8 drop-shadow-lg">
                    {heroContent.headline}
                </h1>
                <div className="flex items-center gap-8 mt-10">
                    <span className="text-neutral-500 text-sm uppercase tracking-widest">
                        {heroContent.scrollHint}
                    </span>
                </div>
            </div>
        </section>
    );
}
