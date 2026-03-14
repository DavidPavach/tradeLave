import StakeCard from "./StakeCard";

const CompletedStakes = ({ investments }: { investments: Investment[] }) => {
    if (!investments.length) return null;

    return (
        <section>
            <h2 className="mb-4 font-semibold text-foreground text-base md:text-lg xl:text-xl">
                Investment History
            </h2>

            <div className="space-y-4">
                {investments.map((inv) => (
                    <StakeCard key={inv._id} investment={inv} />
                ))}
            </div>
        </section>
    );
};

export default CompletedStakes;
