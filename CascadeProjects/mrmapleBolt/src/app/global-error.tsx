'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="container mx-auto min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Something went wrong!
            </h1>
            <p className="text-gray-600 mb-4">
              A critical error occurred on the server
            </p>
            <button
              onClick={() => reset()}
              className="text-blue-500 hover:text-blue-600"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
