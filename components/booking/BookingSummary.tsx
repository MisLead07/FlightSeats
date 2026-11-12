
"use client";

import { Passenger, Seat } from "@/types";
import { Armchair, Trash2, IndianRupee } from "lucide-react";

interface BookingSummaryProps {
    passengers: Passenger[];
    seats: Seat[];
    total: number;
    onRemoveSeat: (passengerId: string) => void;
}

export default function BookingSummary({
    passengers,
    seats,
    total,
    onRemoveSeat,
}: BookingSummaryProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
                Booking Summary
            </h2>

            <div className="mt-5 space-y-4">
                {passengers.map((passenger) => {
                    const seat = seats.find(
                        (s) => s.id === passenger.assignedSeatId
                    );

                    return (
                        <div
                            key={passenger.id}
                            className="flex items-center justify-between border-b border-slate-100 pb-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-blue-50 p-2">
                                    <Armchair size={18} className="text-blue-600" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        {passenger.name}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {seat ? `Seat ${seat.id}` : "No seat selected"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-slate-800">
                                    {seat ? `₹${seat.price}` : "—"}
                                </span>

                                {seat && (
                                    <button
                                        onClick={() => onRemoveSeat(passenger.id)}
                                        title="Remove seat"
                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-5 flex items-center justify-between">
                <span className="font-medium text-slate-600">
                    Total Seat Charges
                </span>

                <span className="flex items-center text-xl font-bold text-slate-900">
                    <IndianRupee size={19} />
                    {total}
                </span>
            </div>

            <p className="mt-2 text-xs text-slate-400">
                All prices are inclusive of applicable seat selection charges.
            </p>
        </div>
    );
}
