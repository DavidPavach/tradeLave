import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode, useEffect } from "react";

interface DownDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    height?: string; // e.g. "70vh", "90vh"
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const drawerVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
    exit: { y: "100%" },
};

const DownDrawer = ({ isOpen, onClose, children, height = "70vh" }: DownDrawerProps) => {

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div className="z-40 fixed inset-0 bg-black/40" variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose} />

                    {/* Drawer */}
                    <motion.div className="right-0 bottom-0 left-0 z-50 fixed bg-background shadow-xl rounded-t-2xl" style={{ height }} variants={drawerVariants} initial="hidden" animate="visible"
                        exit="exit" transition={{ type: "spring", stiffness: 260, damping: 30 }} drag="y" dragConstraints={{ top: 0 }} dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 120 || info.velocity.y > 800) {
                                onClose();
                            }
                        }}>
                        <div className="flex justify-center py-3">
                            <div className="bg-muted-foreground/40 rounded-full w-10 h-1.5" />
                        </div>

                        <div className="p-4 md:p-6 xl:p-8 pb-28 lg:pb-0 h-full overflow-y-auto">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DownDrawer;
