interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div className="mb-4 p-3 bg-[--color-danger]/10 border border-[--color-danger] rounded-lg text-[--color-danger] text-sm">
      {message}
    </div>
  );
}
