//Component
import { ThemeToggle } from "@/components/ThemeToggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex justify-center items-center bg-background p-4 min-h-dvh">
            <div className="top-4 right-4 z-[2] absolute">
                <ThemeToggle />
            </div>
            {children}
        </main>
    );
}

export default AuthLayout;