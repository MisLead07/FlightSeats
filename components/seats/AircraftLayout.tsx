
"use client";

import { AircraftConfiguration, Passenger, Seat as SeatType } from "@/types";
import Seat from "./Seat";

interface AircraftLayoutProps {
    seats: SeatType[];
    passengers: Passenger[];
    activePassengerId: string;
    configuration: AircraftConfiguration;
    onSeatClick: (seatId: string) => void;
}

export default function AircraftLayout({
    seats,
    passengers,
    activePassengerId,
    configuration,
    onSeatClick,
}: AircraftLayoutProps) {
    const seatGroups =
        configuration === "3-2"
            ? [["A", "B", "C"], ["D", "E"]]
            : [["A", "B"], ["D", "E", "F"], ["G", "H"]];

    const rows = [...new Set(seats.map((seat) => seat.row))];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Choose Your Seat
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Select an available seat for your passenger.
                </p>
            </div>

            {/* Aircraft front */}
            <div className="mx-auto mb-8 flex max-w-md flex-col items-center">
                <div className="h-8 w-32 rounded-t-full border-t-4 border-x-4 border-slate-300" />
                <div className="h-3 w-40 rounded-b-xl bg-slate-200" />
                <span className="mt-2 text-xs font-medium uppercase tracking-widest text-slate-400">
                    Front of Aircraft
                </span>
            </div>

            {/* Seat map */}
            <div className="mx-auto w-fit space-y-3">
                <div className="flex items-center gap-4">
                    <div className="w-6" />

                    {seatGroups.map((group, groupIndex) => (
                        <div
                            key={groupIndex}
                            className="flex gap-2"
                        >
                            {group.map((column) => (
                                <div
                                    key={column}
                                    className="flex h-8 w-11 items-center justify-center text-xs font-semibold text-slate-400"
                                >
                                    {column}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {rows.map((row) => (
                    <div key={row} className="flex items-center gap-4">
                        <span className="w-6 text-center text-xs font-medium text-slate-400">
                            {row}
                        </span>

                        {seatGroups.map((group, groupIndex) => (
                            <div
                                key={groupIndex}
                                className="flex gap-2"
                            >
                                {group.map((column) => {
                                    const seat = seats.find(
                                        (s) => s.row === row && s.column === column
                                    );

                                    if (!seat) return <div key={column} className="h-11 w-11" />;

                                    const assignedPassenger = passengers.find(
                                        (p) => p.assignedSeatId === seat.id
                                    );

                                    return (
                                        <Seat
                                            key={seat.id}
                                            seat={seat}
                                            isAssigned={!!assignedPassenger}
                                            isActivePassengerSeat={
                                                assignedPassenger?.id === activePassengerId
                                            }
                                            onClick={() => onSeatClick(seat.id)}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center text-xs text-slate-400">
                Rear of Aircraft
            </div>
        </div>
    );
}
