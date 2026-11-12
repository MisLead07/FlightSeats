
const legendItems = [
    { label: "Available (Free)", color: "bg-green-100 border-green-300" },
    { label: "Available (Paid)", color: "bg-amber-100 border-amber-300" },
    { label: "Your Selection", color: "bg-blue-600 border-blue-600" },
    { label: "Other Passenger", color: "bg-indigo-100 border-indigo-400" },
    { label: "Occupied", color: "bg-slate-300 border-slate-300" },
];

export default function SeatLegend() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                    <span
                        className={`h-4 w-4 rounded border ${item.color}`}
                    />
                    <span className="text-xs text-slate-600">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
