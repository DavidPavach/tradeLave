// Components
import Summary from "./Summary";
import Widget from "./Widget";
import Quick from "./Quick";
import History from "./History";

const Index = () => {

    return (
        <main className="space-y-5">
            <Summary />
            <section className="flex min-[600px]:flex-row flex-col-reverse gap-5">
                <div className="space-y-5 w-full md:w-[50%] lg:w-[60%]">
                    <div className="bg-card p-4 border border-card rounded-2xl h-fit">
                        <Widget />
                    </div>
                    <History />
                </div>
                <div className="w-full md:w-[50%] lg:w-[40%]">
                    <Quick />
                </div>
            </section>
        </main>
    );
}

export default Index;