import Image from "next/image";
import { techSpecs } from "../../lib/content";
import { AnimatedCounter } from "../ui/AnimatedCounter";

export default function TechSpecs() {
    return (
        <section className="relative z-10 w-full bg-[#050505]/70 backdrop-blur-xl text-white py-16 px-6 md:px-12 lg:px-24 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/3">
                    <p className="text-neutral-400 text-sm uppercase tracking-[0.2em] mb-4">{techSpecs.eyebrow}</p>
                    <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-6">{techSpecs.headline}</h2>
                    <div className="relative w-full aspect-square mt-8">
                        <Image
                            src="/drone-model.png"
                            alt="APEX X9 Aerial Platform"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full mt-6 lg:mt-0">
                    {techSpecs.specs.map((spec, i) => (
                        <div
                            key={i}
                            className="border-t border-neutral-800 pt-6"
                        >
                            <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-medium">
                                {spec.label}
                            </div>
                            <div className="text-lg md:text-xl font-light text-neutral-200">
                                <AnimatedCounter text={spec.value} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
