import Sidebar from "@/components/dashboard/Sidebar";

export default function Page() {
  return (
    <>
      <Sidebar />
      <main className="ml-64 p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Templates</h1>
          <p className="mt-2 text-sm text-slate-400">Placeholder page — templates UI will be added later.</p>
        </div>
      </main>
    </>
  );
}
