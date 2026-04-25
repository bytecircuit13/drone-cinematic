"use client";

import { useEffect, useState } from "react";

export function useImagePreloader(startIndex: number, endIndex: number, basePath: string, prefix: string, extension: string) {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return;

        let totalFrames = endIndex - startIndex + 1;
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        const loadImages = async () => {
            const promises = [];
            for (let i = startIndex; i <= endIndex; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new window.Image();
                    img.src = `${basePath}/${prefix}${i}${extension}`;
                    img.onload = () => {
                        loadedCount++;
                        setProgress((loadedCount / totalFrames) * 100);
                        resolve();
                    };
                    img.onerror = () => {
                        // gracefully manage missing frames so we don't break
                        loadedCount++;
                        resolve();
                    };
                    imgArray.push(img);
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(imgArray);
            setIsLoading(false);
        };

        loadImages();
    }, [startIndex, endIndex, basePath, prefix, extension]);

    return { images, isLoading, progress };
}
