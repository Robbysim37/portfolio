"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const ModalContext = createContext(null);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};

export function ModalProvider({ children }) {
  const [content, setContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => setMounted(true), []);

  const openModal = useCallback((c) => {
    setContent(c);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => setContent(null), 200);
  }, []);

  // 🚀 Show modal first time site opens
  useEffect(() => {
    if (mounted) {
      const hasVisited = localStorage.getItem("hasVisited");
      if (!hasVisited) {
        openModal(
          <Card className="w-[66%] h-max-[100vh] shadow-none border-none">
            <CardHeader>
              <CardTitle>
                <h1 className="text-[14px] md:text-[20px]">Welcome!</h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-[12px] md:text-base">
                <p className="text-[12px] md:text-base">
                  If you're reading this, you've come across the portfolio
                  website of Robert Lewis. If you'll indulge me, I would love to
                  show you my works in a professional, but fun way.
                </p>
                <br className="mb-16" />
                <p className="text-[12px] md:text-base">
                  You'll notice once this dialog is closed, you will only see a
                  piano. Once you've played a certain song{" "}
                  <span className="text-[12px] md:text-base font-bold">(don't worry, I will give you the notes)</span>{" "}
                  you will gain access to the rest of the site.
                </p>
                <br className="mb-16" />
                <p className="text-[12px] md:text-base">
                  From there, you can look through my projects, learn about me,
                  and contact me if that is all you want to do... But I have
                  hidden some more easter eggs around the site that revolve
                  around this piano. Can you find them all?
                </p>
                <br className="mb-16" />
                <p className="text-[12px] md:text-base">
                  Thank you again for visiting my site, and I hope to hear from
                  you soon! Good luck!
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button size={"sm"} onClick={closeModal}>Let's go!</Button>
            </CardFooter>
          </Card>
        );
        localStorage.setItem("hasVisited", "true");
      }
    }
  }, [mounted, openModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="backdrop"
                className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              >
                {/* Full-screen centering container */}
                <div className="w-full h-screen flex items-center justify-center pointer-events-none">
                  {/* Animated content wrapper (you control width on the content you pass in) */}
                  <motion.div
                    key="panel"
                    ref={panelRef}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="pointer-events-auto bg-transparent p-0 flex justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {content}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </ModalContext.Provider>
  );
}
