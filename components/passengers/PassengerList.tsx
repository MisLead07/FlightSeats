
"use client";

import { Passenger } from "@/types";
import { Check, UserRound } from "lucide-react";

interface PassengerListProps {
    passengers: Passenger[];
    activePassengerId: string;
    onSelect: (id: string) => void;
}

export default function PassengerList({
    passengers,
    activePassengerId,
    onSelect,
}: PassengerListProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Passengers
            </h2>

            <div className="space-y-3">
                {passengers.map((passenger) => {
                    const active = passenger.id === activePassengerId;

                    return (
                        <button
                            key={passenger.id}
                            onClick={() => onSelect(passenger.id)}
                            className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${active
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-slate-100 p-2">
                                    <UserRound size={18} className="text-slate-600" />
                                </div>

                                <div>
                                    <p className="font-medium text-slate-900">
                                        {passenger.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {passenger.assignedSeatId
                                            ? `Seat ${passenger.assignedSeatId}`
                                            : "No seat assigned"}
                                    </p>
                                </div>
                            </div>

                            {passenger.assignedSeatId && (
                                <Check size={18} className="text-green-600" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
