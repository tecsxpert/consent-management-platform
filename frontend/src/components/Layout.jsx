export default function Layout({ children }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Consent Tool</h1>
      {children}
    </div>
  );
}