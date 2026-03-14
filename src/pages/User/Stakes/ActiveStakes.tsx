import { motion } from "framer-motion";
import AnimatedTicker from "./AnimatedTicker";

const ActiveStakes = ({ investments }: { investments: Investment[] }) => {
    if (!investments.length) return null;

    return (
        <main className={`${investments.length === 2 ? "lg:grid-cols-2" : investments.length > 2 ? "md:grid-cols-2 lg:grid-cols-3" : ""} gap-4 grid`}>
            {investments.map((inv) => (
                <motion.div key={inv._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <AnimatedTicker investment={inv} />
                </motion.div>
            ))}
        </main>
    );
};

export default ActiveStakes;
