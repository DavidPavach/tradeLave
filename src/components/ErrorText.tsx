const ErrorText = ({ message }: { message: string | undefined }) => {
    return (
        <p className="mt-1 text-destructive text-xs lg:text-sm">{message}</p>
    );
}

export default ErrorText;