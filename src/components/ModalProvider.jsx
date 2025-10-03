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
import { Card,CardHeader,CardTitle,CardContent,CardFooter } from "./ui/card";
import { Button } from "./ui/button";

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
          <Card className={"w-full h-full"}>
          <CardHeader>
            <CardTitle><h1 className="text-2x1">Welcome!</h1></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[14px]">
            <p>If you're reading this, you've come across the portfolio website of Robert Lewis, 
                If you'll indulge me, I would love to show you my works in a professional, but fun way.</p><br className="mb-16"/>
                <p>You'll notice once this Modal is closed, you will only see a piano. Once you've played a certain 
                song <span className="font-bold">(don't worry, I will give you the notes)</span> you will gain access to the rest of the site.</p><br className="mb-16"/>
                <p>from there, you can look through my projects, learn about me, and contact me if that is all you want to do...
                But I have hidden some more easter eggs around the site that revolve around this piano. Can you find them all?</p><br className="mb-16"/>
                <p>Thank you again for visiting my site, and I hope to hear from you soon! Good luck!</p>
            </div>
          </CardContent>
          <CardFooter className={"flex justify-end"}>
            <Button onClick={closeModal}>Let's go!</Button>
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
                <motion.div
                  key="panel"
                  ref={panelRef}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-full
                    max-w-[95vw] max-h-[95vh]
                    md:max-w-[60vw] md:max-h-[90vh] 
                    overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {content}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </ModalContext.Provider>
  );
}
