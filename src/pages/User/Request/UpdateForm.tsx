import { useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Icons
import { Loader2 } from "lucide-react";
import { Send2, GalleryImport, CloseSquare, ToggleOffCircle, ToggleOnCircle } from "iconsax-reactjs";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateRequest } from "@/services/mutations.service";
import { toast } from "react-fox-toast";

const UpdateForm = ({ request, onClose }: { request: StockRequest, onClose: () => void; }) => {

    const [hasPaid, setHasPaid] = useState(request.hasPaid ?? false);
    const [message, setMessage] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    // Constants
    const canToggle = request.status === "pending";

    // Functions
    const togglePaid = () => setHasPaid((prev) => !prev);

    const reset = () => {
        setMessage("");
        setFile(null);
    }

    const update = useUpdateRequest()
    const handleSave = () => {
        if (!message.trim()) return toast.error("Kindly enter a message to continue.")

        const formData = new FormData();

        formData.append("purchaseId", request._id);
        formData.append("message", message.trim());
        formData.append("role", "user");

        if (hasPaid) formData.append("hasPaid", "true");
        if (file) formData.append("file", file);

        update.mutate(formData, {
            onSuccess: (response) => {
                toast.success(response.message || "Request Updated!");
                reset();
                setFile(null);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Failed to Update Request");
            },
        });
    }

    return (
        <main className="bg-card/60 backdrop-blur-sm p-4 md:p-5 xl:p-6 border border-border/40 rounded-2xl">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="font-bold text-sm md:text-base xl:text-lg montserrat">Update Request</h2>
                    <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                        <span className="font-semibold text-primary">{request.stockSymbol}</span>
                        {" · "}{request.shares} shares · ${request.usdAmount?.toLocaleString()}
                    </p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
                        <CloseSquare className="size-4 md:size-4.5 xl:size-5" />
                    </button>
                )}
            </header>

            <section className="space-y-6 mb-6">
                {/* Has Paid Toggle */}
                <div className="flex justify-between items-center bg-background/30 p-4 border border-border/30 rounded-xl">
                    <div>
                        <p className="font-semibold text-[11px] md:text-xs xl:text-sm">Payment Confirmed</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Mark this request as paid</p>
                    </div>
                    {canToggle && (
                        <p className="cursor-pointer" onClick={togglePaid}>
                            {hasPaid ? <ToggleOnCircle variant="Bold" size={26} className="text-green-500" />
                                : <ToggleOffCircle size={26} variant="Bold" className="text-muted-foreground" />
                            }
                        </p>
                    )}
                </div>

                {/* Add a detail message */}
                <div className="space-y-4">

                    {/* File upload */}
                    <div className="space-y-1.5">
                        <Label>Attachment (optional)</Label>
                        <label className="flex items-center gap-3 bg-background/30 px-4 py-3 border border-border/50 hover:border-primary/40 border-dashed rounded-xl transition-colors cursor-pointer">
                            <GalleryImport className="size-3 md:size-3.5 xl:size-4 text-muted-foreground shrink-0" />
                            <span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm truncate">
                                {file ? file.name : "Click to upload an image…"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            />
                        </label>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                        <Label htmlFor="detail-message">Message</Label>
                        <Textarea
                            id="detail-message"
                            placeholder="Type your note here…"
                            className="bg-background/50"
                            value={message}
                            maxLength={200}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {200 - message.length <= 10 && <p className="text-[10px] text-destructive md:text-[11px] xl:text-xs montserrat">{200 - message.length} Chars Left</p>}
                    </div>
                </div>
            </section>
            <Button onClick={handleSave} disabled={update.isPending || !message.trim()} className="gap-x-2 bg-primary hover:bg-primary/90 w-full text-primary-foreground">
                {update.isPending ? (
                    <><Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" /> Saving…</>
                ) : (
                    <><Send2 className="size-4 md:size-4.5 xl:size-5" /> Save Update</>
                )}
            </Button>
        </main>
    );
}

export default UpdateForm;