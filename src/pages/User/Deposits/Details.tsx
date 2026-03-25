import { useState, useRef } from "react";
import { toast } from "react-fox-toast";

// Utils and Hooks
import { formatDate } from "@/utils/format";
import { usePatchDepositDetails } from "@/services/mutations.service";

// Components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Icons
import { Send } from "lucide-react"
import { CardTick1 } from "iconsax-reactjs";

export default function DepositRequestDetails({ request }: DepositRequestDetailsProps) {

    const [updateMessage, setUpdateMessage] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [hasPaid, setHasPaid] = useState<boolean>(request.hasPaid)

    const adminMessages = Array.isArray(request.details?.admin) ? request.details.admin : []
    const userMessages = Array.isArray(request.details?.user) ? request.details.user : []

    const allMessages = [
        ...adminMessages.map((msg) => ({
            ...msg,
            sender: "admin" as const,
        })),
        ...userMessages.map((msg) => ({
            ...msg,
            sender: "user" as const,
        })),
    ].sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());

    // Functions
    const reset = () => {
        setUpdateMessage("");
    }

    const handleHasPaid = () => {
        setHasPaid(true);
        setUpdateMessage("I have completed the payment. This is my payment confirmation ID: [ENTER PAYMENT ID]");
    }

    const updateRequest = usePatchDepositDetails();
    const handleSendUpdate = () => {
        const formData = new FormData();

        formData.append("depositId", request._id);
        formData.append("message", updateMessage.trim());
        formData.append("role", "user");

        if (hasPaid) formData.append("hasPaid", "true");
        if (file) formData.append("file", file);

        updateRequest.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.message || "Updated!");
                reset();
                setFile(null);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Failed");
            },
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h4 className="mb-4 font-semibold">Conversation</h4>
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto hide-scrollbar">
                    {allMessages.length > 0 ? (
                        <div className="space-y-4">
                            {allMessages.map((msg, idx) => {
                                const isAdmin = msg.sender === "admin";

                                return (
                                    <div key={idx} className={`flex items-end gap-2 ${isAdmin ? "justify-start" : "justify-end"}`}>
                                        {/* Admin avatar */}
                                        {isAdmin && (
                                            <div className="flex justify-center items-center bg-primary/15 border border-primary/30 rounded-full size-8 font-semibold text-[11px] text-primary shrink-0">
                                                A
                                            </div>
                                        )}

                                        <div className={`group relative max-w-[85%] sm:max-w-xs md:max-w-sm px-4 py-3 shadow-sm ${isAdmin
                                            ? "rounded-2xl rounded-bl-md border border-primary/20 bg-card text-foreground" : "rounded-2xl rounded-br-md bg-primary text-primary-foreground"}`}>
                                            {/* Sender label */}
                                            <p className={`mb-1 text-[11px] font-semibold ${isAdmin ? "text-primary/80" : "text-primary-foreground/80"}`}>
                                                {isAdmin ? "Admin" : "You"}
                                            </p>

                                            {/* Message */}
                                            <p className={`leading-relaxed text-[11px] md:text-xs xl:text-sm ${isAdmin ? "text-foreground" : "text-primary-foreground"}`}>
                                                {msg.message}
                                            </p>
                                            {msg.file && (
                                                <div className="mt-2">
                                                    {msg.file.endsWith(".pdf") ? (
                                                        <a href={msg.file} target="_blank" className="text-blue-500 underline">
                                                            View PDF
                                                        </a>
                                                    ) : (
                                                        <img src={msg.file} alt="attachment" className="rounded-md max-w-[200px]" />
                                                    )}
                                                </div>
                                            )}

                                            {/* Timestamp */}
                                            <div className={`mt-2 flex ${isAdmin ? "justify-start" : "justify-end"}`}>
                                                <p className={`text-[10px] md:text-[11px] ${isAdmin ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
                                                    {formatDate(msg.at)}
                                                </p>
                                            </div>

                                            {/* Bubble tail */}
                                            <span className={`absolute bottom-0 size-3 rotate-45 ${isAdmin ? "-left-1 bg-card border-l border-b border-primary/20"
                                                : "-right-1 bg-primary"}`} />
                                        </div>

                                        {/* User avatar */}
                                        {!isAdmin && (
                                            <div className="flex justify-center items-center bg-primary rounded-full size-8 font-semibold text-[11px] text-primary-foreground shrink-0">
                                                Y
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="py-4 text-destructive text-center">No messages yet</p>
                    )}
                </div>
            </div>

            {/* Update form */}
            {request.status !== "closed" && (
                <div className="space-y-4 pt-6 border-border border-t">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <label className="font-semibold">Send Update</label>

                        <label className="bg-muted hover:bg-muted/70 px-3 py-1 rounded-md text-[11px] md:text-xs xl:text-sm cursor-pointer">
                            Attach Image/PDF
                            <input ref={fileInputRef} type="file" accept="image/*,application/pdf"
                                onChange={(e) => {
                                    const selected = e.target.files?.[0] || null;
                                    setFile(selected);
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = "";
                                    }
                                }} disabled={updateRequest.isPending} className="hidden" />
                        </label>
                    </div>

                    {/* File Preview */}
                    {file && (
                        <div className="flex items-center gap-3 bg-muted/40 p-2 border border-border rounded-lg">
                            {/* Image Preview */}
                            {file.type.startsWith("image/") ? (
                                <img src={URL.createObjectURL(file)} alt="preview" className="border border-border rounded-md size-10 md:size-12 xl:size-14 object-cover" />
                            ) : (
                                /* PDF Preview */
                                <div className="flex justify-center items-center bg-background border border-border rounded-md size-10 md:size-12 xl:size-14 font-semibold text-xs">
                                    PDF
                                </div>
                            )}

                            {/* File Info */}
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm truncate">{file.name}</p>
                                <p className="text-muted-foreground text-xs">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>

                            {/* Remove */}
                            <button disabled={updateRequest.isPending} onClick={() => {
                                setFile(null); if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }}
                                className="text-destructive text-xs hover:underline cursor-pointer">
                                Remove
                            </button>
                        </div>
                    )}

                    {/* Paid Toggle */}
                    {!request.hasPaid && (
                        <div className="flex justify-between items-center">
                            <p className="w-4/5 text-[11px] md:text-xs xl:text-sm">Tap the card icon once you've paid. You may also attach an image or PDF 👉</p>
                            <CardTick1 onClick={handleHasPaid} variant="Bold"
                                className="size-6 md:size-7 xl:size-8 text-green-600 dark:text-green-400 cursor-pointer" />
                        </div>
                    )}

                    {/* Input + Send */}
                    <div className="flex gap-2">
                        <Textarea placeholder="Write your update here..." value={updateMessage} onChange={(e) => setUpdateMessage(e.target.value)}
                            className="h-24 resize-none" disabled={updateRequest.isPending} />

                        <Button onClick={handleSendUpdate} disabled={!updateMessage.trim() || updateRequest.isPending}
                            size="icon" className="h-24">
                            <Send className="size-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
