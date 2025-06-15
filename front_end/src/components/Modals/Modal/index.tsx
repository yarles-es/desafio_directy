import React from "react";

import { AnimatePresence, motion } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onCloseClicked?: boolean;
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      stiffness: 500,
    },
  },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  onCloseClicked,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => !onCloseClicked && onClose()}
        >
          <motion.div
            className="top-7.5 relative w-full my-6 mx-auto max-w-5xl max-h-[80vh] xlg:max-h-[90vh]  bg-[#24303f] p-6 rounded-lg shadow-xl overflow-auto text-xs lg:text-sm"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
          >
            <button
              onClick={onClose}
              className="absolute top-0 right-0 mt-5 mr-7 text-2xl font-semibold text-gray-300 hover:text-white cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
