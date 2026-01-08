export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

