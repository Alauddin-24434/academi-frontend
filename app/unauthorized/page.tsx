export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">401 - Unauthorized</h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        You do not have permission to access this page.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Homepage
      </a>
    </div>
  );
}
