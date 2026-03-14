import { useState } from "react";
import { cn } from "@/lib/utils";

// Components
import { Button } from "@/components/ui/button";

interface PaginationProps {
    pageSize: number
    page?: number
    defaultPage?: number
    onPageChange?: (page: number) => void
    siblingCount?: number
    className?: string
}

export default function Pagination({ pageSize, page, defaultPage = 1, onPageChange, siblingCount = 1, className }: PaginationProps) {

    const totalPages = pageSize;
    const isControlled = page !== undefined

    const [internalPage, setInternalPage] = useState(defaultPage)
    const currentPage = isControlled ? page! : internalPage

    const setPage = (p: number) => {
        const next = Math.min(Math.max(p, 1), totalPages)
        if (!isControlled) setInternalPage(next)
        onPageChange?.(next)
    }

    const pages = getPageRange(currentPage, totalPages, siblingCount)

    return (
        <nav aria-label="Pagination" className={cn("flex justify-center items-center gap-1 my-4", className)}>
            <Button variant="ghost" size="sm" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
                Prev
            </Button>

            {pages.map((p, i) =>
                p === "…" ? (
                    <span key={i} className="px-2 text-muted-foreground select-none">
                        …
                    </span>
                ) : (
                    <Button key={p} variant={p === currentPage ? "default" : "ghost"} onClick={() => setPage(p)}>
                        {p}
                    </Button>
                )
            )}

            <Button variant="ghost" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
                Next
            </Button>
        </nav>
    )
}


function getPageRange(current: number, total: number, siblings: number): Array<number | "…"> {

    const range: Array<number | "…"> = []

    const start = Math.max(2, current - siblings)
    const end = Math.min(total - 1, current + siblings)

    range.push(1)

    if (start > 2) range.push("…")

    for (let i = start; i <= end; i++) {
        range.push(i)
    }

    if (end < total - 1) range.push("…")

    if (total > 1) range.push(total)

    return range
}