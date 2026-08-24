"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";

const stages = ["WASHING", "CLEANING", "DRYING"];

export const LoadingScreen = () => {
    const loaderRef = useRef<HTMLDivElement>(null);
    const stagesRef = useRef<HTMLDivElement>(null);
    const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const progressRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (!loaderRef.current || !stagesRef.current) return;

        const loader = loaderRef.current;
        const stagesContainer = stagesRef.current;

        const lenis = new Lenis({
            autoRaf: true,
            smoothWheel: true,
            lerp: 0.08,
        });

        lenis.stop();

        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            gsap.set(stagesContainer, {
                autoAlpha: 1,
            });

            stages.forEach((stage, index) => {
                const stageElement = stageRefs.current[index];
                const progressElement = progressRefs.current[index];

                if (!stageElement || !progressElement) return;

                timeline.fromTo(
                    stageElement,
                    {
                        y: 70,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power3.out",
                    },
                    index === 0 ? 0.2 : "-=0.15"
                );

                const progress = { value: 0 };

                timeline.to(
                    progress,
                    {
                        value: 100,
                        duration: 1.5,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            progressElement.textContent = `${Math.round(progress.value)}%`;
                        },
                    },
                    "-=0.05"
                );

                if (index < stages.length - 1) {
                    timeline.to(
                        stageElement,
                        {
                            color: "#1C6766",
                            duration: 0.3,
                            ease: "power2.out",
                        },
                        "+=0.05"
                    );
                }
            });

            timeline.to(
                loader,
                {
                    yPercent: -100,
                    duration: 1.25,
                    ease: "expo.inOut",
                    opacity: 0,
                    onComplete: () => {
                        lenis.start();
                        loader.style.display = "none";
                    },
                },
                "+=0.5"
            );
        }, loaderRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    return (
        <motion.div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
        >
            <div className="relative w-full max-w-md px-8">
                <div
                    ref={stagesRef}
                    className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-0"
                >
                    <div className="flex flex-col">
                        {stages.map((stage, index) => (
                            <div
                                key={stage}
                                ref={(element) => {
                                    stageRefs.current[index] = element;
                                }}
                                className="flex translate-y-[70px] items-baseline justify-between py-1 opacity-0"
                            >
                                <span className="font-mono text-base font-medium uppercase tracking-wider text-primary">
                                    {stage}
                                </span>

                                <span
                                    ref={(element) => {
                                        progressRefs.current[index] = element;
                                    }}
                                    className="font-mono text-base tabular-nums text-primary"
                                >
                                    0%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};