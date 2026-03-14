import { toast } from "react-fox-toast";

//Utils
import { formatDate } from "@/utils/format";

const NotificationBox = ({ type, title, message, createdAt }: { type: string, title: string, message: string, createdAt: Date }) => {
    
    return (
        toast.drawer(
            <div className="flex flex-col pl-4">
                <p className="font-semibold capitalize">
                    New {type}
                </p>
                <p className="text-muted-foreground text-sm">{title}</p>
            </div>,
            {
                position: 'top-center',
                expandedContent: (
                    <div className="bg-primary p-4 rounded-lg max-w-md text-primary-foreground">
                        <p className="mb-2 font-bold">{message}</p>
                        <p className="text-muted-foreground">{formatDate(createdAt)}</p>
                    </div>
                ),
            }
        )
    );
}

export default NotificationBox;