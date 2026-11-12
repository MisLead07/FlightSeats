
"use client";

import { Seat as SeatType } from "@/types";

interface SeatProps {
    seat: SeatType;
    isAssigned: boolean;
    isActivePassengerSeat: boolean;
    onClick: () => void;
}

export default function Seat({
    seat,
    isAssigned,
    isActivePassengerSeat,
    onClick,
}: SeatProps) {
    const unavailable =
        seat.status === "occupied" ||
        (isAssigned && !isActivePassengerSeat);

    const getSeatStyle = () => {
        if (unavailable) return "bg-slate-300 border-slate-300 text-slate-500 cursor-not-allowed";

        if (isActivePassengerSeat)
            return "bg-blue-600 border-blue-600 text-white";

        if (isAssigned)
            return "bg-indigo-100 border-indigo-400 text-indigo-700";

        if (seat.price === 0)
            return "bg-green-50 border-green-300 text-green-700 hover:bg-green-100";

        if (seat.category === "extra-legroom")
            return "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100";

        return "bg-white border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50";
    };

    return (
        <button
            disabled={unavailable}
            onClick={onClick}
            title={`${seat.id} - ${seat.price === 0 ? "Free" : `₹${seat.price}`}`}
            className={`flex h-11 w-11 flex-col items-center justify-center rounded-lg border text-xs font-semibold transition ${getSeatStyle()}`}
        >
            {seat.column}
            <span className="text-[9px] font-normal">
                {seat.price === 0 ? "Free" : `₹${seat.price}`}
            </span>
        </button>
    );
}
