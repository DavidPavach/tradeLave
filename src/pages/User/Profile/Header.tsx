import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks
import { useUpdateProfilePicture } from "@/services/mutations.service";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { CircleCheckBig, Loader } from "lucide-react";

const Header = ({ profilePicture, userName, accountId, email }: { profilePicture: string, userName: string, accountId: string, email: string }) => {

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    // Update Profile Picture
    const changeProfilePicture = useUpdateProfilePicture();
    const updateProfilePicture = () => {
        if (!avatarFile) return toast.warning("Kindly select an Image");
        if (!avatarFile.type.startsWith("image/")) return toast.error("Please select an image file");
        if (avatarFile.size > 10 * 1024 * 1024) return toast.error("Image size must be less than 10MB");

        const formData = new FormData();
        formData.append("profilePicture", avatarFile);

        changeProfilePicture.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.message || "Profile picture updated successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Sorry, we couldn't change profile picture now.";
                toast.error(message);
                setAvatarFile(null);
            },
        });
    };

    return (
        <section className="flex items-center gap-5">
            <div className="relative">
                <Avatar className="rounded-full size-16 md:size-18 xl:size-20">
                    <AvatarImage src={avatarPreview || profilePicture} alt="default profile" />
                    <AvatarFallback>TL</AvatarFallback>
                </Avatar>
                {avatarFile === null ? <label className="-right-1 -bottom-1 absolute bg-primary hover:bg-primary/90 px-2 py-1 rounded-full text-primary-foreground text-xs transition cursor-pointer">
                    Change
                    <input disabled={changeProfilePicture.isPending} type="file" accept="image/*" className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0]; if (!file) return; setAvatarFile(file); setAvatarPreview(URL.createObjectURL(file))
                        }}
                    />
                </label> :
                    <button className="-right-1 -bottom-1 absolute bg-green-200 p-1 rounded-sm text-green-600 dark:text-green-700 cursor-pointer" onClick={updateProfilePicture}>
                        {changeProfilePicture.isPending ? <Loader className="size-4 md:size-5 xl:size-5 animate-spin" /> :
                            <CircleCheckBig className="size-4 md:size-5 xl:size-5" />
                        }
                    </button>
                }
            </div>

            <div>
                <h1 className="font-semibold text-lg md:text-xl xl:text-2xl capitalize">{userName}</h1>
                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{accountId}</p>
                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{email}</p>
            </div>
        </section>
    );
}

export default Header;