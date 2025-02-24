export default function DashboardContent({ title, children }) {
    return (
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {children}
      </div>
    );
  }
  