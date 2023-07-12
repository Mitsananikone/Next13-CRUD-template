/** @format */

export { Spinner };

function Spinner() {
  return (
    <div className="text-center p-4">
      <span className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></span>
    </div>
  );
}
