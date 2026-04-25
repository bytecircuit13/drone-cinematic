"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useImagePreloader } from "../../hooks/useImagePreloader";

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const START_FRAME = 1000;
    const END_FRAME = 1982;
    const MAX_FRAMES = END_FRAME - START_FRAME + 1;

    const { images, isLoading, progress } = useImagePreloader(
        START_FRAME,
        END_FRAME,
        "/sequence-01",
        "Sequence 0",
        ".jpg"
    );

    // We use global ScrollY to tie the animation to the ENTIRE PAGE scroll
    const { scrollYProgress } = useScroll();

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, MAX_FRAMES - 1]);

    useEffect(() => {
        if (images.length > 0 && canvasRef.current) {
            renderFrame(0);
        }
    }, [images]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!images.length) return;
        const index = Math.min(Math.max(Math.round(latest), 0), images.length - 1);
        renderFrame(index);
    });

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];
        if (!img) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        // object-fit: cover equivalent algorithm
        const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const x = (canvasWidth / 2) - (imgWidth / 2) * scale;
        const y = (canvasHeight / 2) - (imgHeight / 2) * scale;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    };

    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                renderFrame(Math.round(frameIndex.get()));
            }
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [images, frameIndex]);

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-[#050505]">
                    <div className="text-white font-sans flex flex-col items-center w-full max-w-sm px-6">
                        <svg viewBox="0 0 100 100" className="w-24 h-24 mb-8 relative z-10">
                            <motion.path
                                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                                fill="none"
                                stroke="white"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: progress / 100 }}
                                transition={{ duration: 0.1 }}
                            />
                            <motion.path
                                d="M50 10 L50 50 L90 30 M50 50 L50 90 M50 50 L10 30"
                                fill="none"
                                stroke="rgba(255,255,255,0.15)"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: progress / 100 }}
                                transition={{ duration: 0.1 }}
                            />
                        </svg>
                        <p className="tracking-[0.4em] uppercase text-xs mb-3 text-neutral-500 font-medium">Zenith Aero Systems</p>
                        <p className="tracking-[0.1em] font-light text-xl text-white">{Math.round(progress)}%</p>
                    </div>
                </div>
            )}
            <div className="fixed inset-0 -z-50 bg-[#050505]">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Subtle dark overlay to guarantee text legibility */}
                <div className="absolute inset-0 bg-black/40" />
            </div>
        </>
    );
}
