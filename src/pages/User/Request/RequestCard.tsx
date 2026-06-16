import { useState } from "react";

// Utils, Enums
import { formatCurrency, formatDate } from "@/utils/format";
import { cn } from "@/lib/utils";
import { stockMeta } from "@/enum";

// Components
import { Button } from "@/components/ui/button";
import UpdateForm from "./UpdateForm";

// Icons
import { ArrowDown3, ArrowUp3, type Icon, Clock, CloseSquare, Lock, TickSquare, Edit, ClipboardText, TagUser, ShieldSecurity } from "iconsax-reactjs";

const STATUS_CONFIG: Record<string, { label: string, icon: Icon, class: string }> = {
    pending: { label: "Pending", icon: Clock, class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    successful: { label: "Successful", icon: TickSquare, class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    failed: { label: "Failed", icon: CloseSquare, class: "bg-red-500/10 text-red-400 border-red-500/20" },
    closed: { label: "Closed", icon: Lock, class: "bg-muted text-muted-foreground border-border/40" },
};

function StatusBadge({ status }: { status: string }) {

    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
    const Icon = cfg.icon;
    return (
        <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 border rounded-full font-semibold text-[11px] md:text-xs xl:text-sm", cfg.class)}>
            <Icon className="size-3 md:size-3.5 xl:size-4" /> <span className="hidden sm:block">{cfg.label}</span>
        </span>
    );
}

function DetailEntry({ role, message }: { role: "admin" | "user"; message: { message: string; at: string; file?: string; } }) {

    const RoleIcon = role === "admin" ? ShieldSecurity : TagUser;
    const roleColour = role === "admin" ? "text-secondary" : "text-primary";

    return (
        <div className={`flex gap-x-2 ${role === "user" ? "bg-primary/20" : "bg-secondary/20"} w-[90%] md:w-[80%] xl:w-[70%] p-4 border-border/20 last:border-0 border-b rounded-md`}>
            <div className={cn("mt-0.5 shrink-0", roleColour)}>
                <RoleIcon className="size-4 md:size-3.5 xl:size-4" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className={cn("font-semibold text-xs capitalize", roleColour)}>
                        {role === "user" ? "Me" : role}
                    </span>

                    <span className="text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px]">
                        {formatDate(message.at)}
                    </span>
                </div>
                <p className="text-[11px] text-foreground/90 md:text-xs xl:text-sm leading-relaxed">
                    {message.message}
                </p>

                {message.file && (
                    <a href={message.file} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-[10px] text-primary md:text-[11px] xl:text-xs hover:underline">
                        <ClipboardText className="size-3 md:size-3.5 xl:size-4" />
                        View Attachment
                    </a>
                )}
            </div>
        </div>
    );
}

export default function RequestCard({ request }: { request: StockRequest }) {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const canEdit = request.status === "pending";
    const metaDetails = stockMeta[request.stockSymbol]
    const hasDetails = (request.details?.admin?.length ?? 0) > 0 || (request.details?.user?.length ?? 0) > 0;

    // Functions
    const toggleEdit = () => setEditing((prev) => !prev);

    return (
        <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
            {/* Main row */}
            <div className="flex justify-between items-center hover:bg-muted/10 px-5 py-4 transition-colors cursor-pointer" onClick={() => setExpanded((v) => !v)}>

                <div className="flex gap-x-2 min-w-0">
                    <img src={metaDetails.logo} alt={`${metaDetails.name} logo`} className="rounded-md size-8 md:size-9 xl:size-10" />

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2">
                            <span className="font-semibold text-[11px] md:text-xs xl:text-sm montserrat">
                                {request.stockSymbol}
                            </span>
                            <StatusBadge status={request.status} />
                            {request.hasPaid && (
                                <span className="inline-flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded-full font-semibold text-[11px] text-emerald-400 md:text-xs xl:text-sm">
                                    <TickSquare className="size-3 md:size-3.5 xl:size-4" />
                                    Paid
                                </span>
                            )}
                        </div>

                        <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                            {request.shares} shares · {formatCurrency(request.usdAmount)} · {formatDate(request.createdAt)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-4 shrink-0">
                    {canEdit && (
                        <Button size="sm" variant="outline" className="gap-1.5 hover:bg-primary/10 border-primary/30 h-8 text-[11px] text-primary md:text-xs xl:text-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleEdit();
                                setExpanded(false);
                            }}>
                            {editing ?
                                <>
                                    <CloseSquare className="size-3 md:size-3.5 xl:size-4" />
                                    Close
                                </>
                                :
                                <>
                                    <Edit className="size-3 md:size-3.5 xl:size-4" />
                                    Update
                                </>
                            }

                        </Button>
                    )}

                    {expanded ? (
                        <ArrowUp3 className="size-4 md:size-4.5 xl:size-5 text-muted-foreground" />
                    ) : (
                        <ArrowDown3 className="size-4 md:size-4.5 xl:size-5 text-muted-foreground" />
                    )}
                </div>
            </div>

            {/* Expanded details */}
            {expanded && !editing && (
                <div className="p-2 md:p-3 xl:p-4 border-border/30 border-t">
                    {!hasDetails ? (
                        <p className="py-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm text-center">
                            No detail notes yet.
                        </p>
                    ) : (
                        <div >
                            <p className="mb-2 text-[11px] text-muted-foreground uppercase">
                                Details Log
                            </p>

                            {/* Admin Messages */}
                            <section className="flex flex-col gap-y-2 my-2">
                                {request.details?.admin?.map((message, index) => (
                                    <DetailEntry key={`admin-${index}`} role="admin" message={message} />
                                ))}
                            </section>

                            <section className="flex flex-col items-end gap-y-2 my-2">
                                {request.details?.user?.map((message, index) => (
                                    <DetailEntry key={`user-${index}`} role="user" message={message} />
                                ))}
                            </section>
                        </div>
                    )}
                </div>
            )}

            {/* Update form inline */}
            {editing && (
                <div className="p-4 border-border/30 border-t">
                    <UpdateForm
                        request={request}
                        onClose={toggleEdit}
                    />
                </div>
            )}
        </div>
    );
}