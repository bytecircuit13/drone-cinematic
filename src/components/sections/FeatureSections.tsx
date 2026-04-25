"use client";

import { motion } from "framer-motion";
import { featuresContent } from "../../lib/content";

export default function FeatureSections() {
    return (
        <div className="w-full relative z-10 flex flex-col pt-[5vh] pb-[10vh]">
            {featuresContent.map((feature, idx) => {
                const isLeft = idx % 2 !== 0;

                return (
                    <section
                        key={feature.id}
                        className={`min-h-[50vh] w-full flex flex-col justify-center px-6 md:px-16 lg:px-32 ${feature.id === 4 ? "mt-[80vh]" : "mt-[35vh]"
                            }`}
                    >
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(8px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            viewport={{ once: false, amount: 0.1, margin: "-100px 0px" }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className={`w-full max-w-2xl flex flex-col ${isLeft
                                ? "items-start text-left self-start"
                                : "items-end text-right self-end"
                                }`}
                        >
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 drop-shadow-xl">
                                {feature.preTitle}
                            </h1>
                            <p className="text-base md:text-lg font-light text-neutral-300 drop-shadow-lg leading-relaxed">
                                {feature.body}
                            </p>
                        </motion.div>
                    </section>
                );
            })}
        </div>
    );
}
