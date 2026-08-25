"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const leftLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
];

const rightLinks = [
    { label: "GALLERY", href: "#gallery" },
    { label: "CONTACT", href: "#contact" },
];

const QuoteButton = ({ mobile = false }: { mobile?: boolean }) => {
    return (
        <Link
            href="#contact"
            className={`group relative flex items-center justify-center overflow-hidden rounded-full bg-primary text-white transition-transform duration-300 hover:scale-[0.98] ${mobile
                ? "h-10 px-5 text-[12px]"
                : "h-10 px-6 text-[12px]"
                }`}
        >
            <span className="relative z-10 whitespace-nowrap font-sans font-medium text-white">
                Get a Free Quote
            </span>
        </Link>
    );
};

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <header className="relative z-50 h-[64px] bg-background">
                <div className="relative mx-auto flex h-full w-full max-w-[1280px] items-center px-5 md:px-8">
                    <nav className="hidden h-full w-full items-center justify-center md:flex">
                        <div className="flex items-center gap-10">
                            {leftLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="font-sans text-[10px] font-medium text-primary transition-opacity duration-300 hover:opacity-50"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <Link
                            href="/"
                            aria-label="Freshroom home"
                            className="mx-14 flex items-center justify-center"
                        >
                            <span className="font-display text-[34px] leading-none">
                                FR
                            </span>
                        </Link>

                        <div className="flex items-center gap-10">
                            {rightLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="font-sans text-[10px] font-medium text-primary transition-opacity duration-300 hover:opacity-50"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </nav>

                    <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 md:block md:right-8">
                        <QuoteButton />
                    </div>

                    <Link
                        href="/"
                        aria-label="Freshroom home"
                        className="absolute left-5 top-1/2 flex -translate-y-1/2 items-center justify-center md:hidden"
                    >
                        <span className="font-display text-[32px] leading-none">
                            FR
                        </span>
                    </Link>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
                        <QuoteButton mobile />
                    </div>

                    <button
                        type="button"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((value) => !value)}
                        className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center md:hidden"
                    >
                        <span className="relative block h-[14px] w-[20px]">
                            <motion.span
                                className="absolute left-0 top-0 h-px w-full bg-primary"
                                animate={
                                    isOpen
                                        ? { top: 6, rotate: 45 }
                                        : { top: 0, rotate: 0 }
                                }
                                transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            />
                            <motion.span
                                className="absolute bottom-0 left-0 h-px w-full bg-primary"
                                animate={
                                    isOpen
                                        ? { bottom: 6, rotate: -45 }
                                        : { bottom: 0, rotate: 0 }
                                }
                                transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            />
                        </span>
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="fixed inset-0 z-40 flex min-h-screen flex-col bg-background md:hidden"
                    >
                        <div className="flex flex-1 flex-col justify-center px-8">
                            <nav className="flex flex-col">
                                {[...leftLinks, ...rightLinks].map(
                                    (link, index) => (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            onClick={closeMenu}
                                            initial={{
                                                opacity: 0,
                                                y: 30,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 20,
                                            }}
                                            transition={{
                                                duration: 0.55,
                                                delay: 0.05 + index * 0.07,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="border-b border-primary/10 py-5 font-display text-[clamp(42px,12vw,64px)] leading-[0.9] text-primary"
                                        >
                                            {link.label}
                                        </motion.a>
                                    )
                                )}
                            </nav>
                        </div>

                        <div className="flex items-center justify-between px-8 pb-8">
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary/50">
                                Carpet & Upholstery Care
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary/50">
                                England
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};