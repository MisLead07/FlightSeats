
"use client";

import { useMemo, useState } from "react";
import {
  Plane,
  ArrowRight,
  Users,
  Armchair,
} from "lucide-react";

import { AircraftConfiguration, Passenger } from "@/types";
import { initialPassengers } from "@/data/passengers";
import { generateSeats } from "@/data/seats";

import PassengerList from "@/components/passengers/PassengerList";
import AircraftLayout from "@/components/seats/AircraftLayout";
import SeatLegend from "@/components/seats/SeatLegend";
import BookingSummary from "@/components/booking/BookingSummary";

import {
  assignSeat,
  removeSeat,
  calculateTotal,
} from "@/lib/seat-utils";

export default function Home() {
  const [passengers, setPassengers] =
    useState<Passenger[]>(initialPassengers);

  const [activePassengerId, setActivePassengerId] =
    useState("P1");

  const [configuration, setConfiguration] =
    useState<AircraftConfiguration>("3-2");

  const seats = useMemo(
    () => generateSeats(configuration),
    [configuration]
  );

  const total = useMemo(
    () => calculateTotal(passengers, seats),
    [passengers, seats]
  );

  const handleSeatClick = (seatId: string) => {
    setPassengers((current) =>
      assignSeat(current, activePassengerId, seatId, seats)
    );
  };

  const handleRemoveSeat = (passengerId: string) => {
    setPassengers((current) =>
      removeSeat(current, passengerId)
    );
  };

  const handlePassengerCount = (count: number) => {
    setPassengers((current) => {
      if (count < current.length) {
        return current.slice(0, count);
      }

      const additionalPassengers = Array.from(
        { length: count - current.length },
        (_, index) => {
          const id = `P${current.length + index + 1}`;

          return {
            id,
            name: `Passenger ${current.length + index + 1}`,
            assignedSeatId: null,
          };
        }
      );

      return [...current, ...additionalPassengers];
    });

    if (count < passengers.length) {
      const remainingPassengers = passengers.slice(0, count);

      if (!remainingPassengers.some(
        (p) => p.id === activePassengerId
      )) {
        setActivePassengerId(remainingPassengers[0].id);
      }
    }
  };

  const handleConfigurationChange = (
    nextConfiguration: AircraftConfiguration
  ) => {
    if (nextConfiguration === configuration) return;

    const nextSeats = generateSeats(nextConfiguration);
    const nextSeatIds = new Set(nextSeats.map((seat) => seat.id));

    const incompatible = passengers.filter(
      (p) => p.assignedSeatId && !nextSeatIds.has(p.assignedSeatId)
    );

    if (
      incompatible.length > 0 &&
      !window.confirm(
        "Some assigned seats do not exist in the new aircraft layout. Switching configurations will remove those assignments. Continue?"
      )
    ) {
      return;
    }

    setPassengers((current) =>
      current.map((p) =>
        p.assignedSeatId && !nextSeatIds.has(p.assignedSeatId)
          ? { ...p, assignedSeatId: null }
          : p
      )
    );

    setConfiguration(nextConfiguration);
  };

  const selectedPassenger = passengers.find(
    (p) => p.id === activePassengerId
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2.5">
              <Plane className="text-white" size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                FlightSeats
              </h1>
              <p className="text-xs text-slate-500">
                Flight seat selection
              </p>
            </div>
          </div>

          <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
            STEP 2 OF 3 · SEAT SELECTION
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        {/* Flight information */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Your flight
              </p>

              <div className="flex items-center gap-5">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    BOM
                  </h2>
                  <p className="text-xs text-slate-500">Mumbai</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-slate-400">
                    2h 10m
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-px w-12 bg-slate-300" />
                    <Plane size={16} className="rotate-90 text-blue-600" />
                    <div className="h-px w-12 bg-slate-300" />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    DIRECT FLIGHT
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    DEL
                  </h2>
                  <p className="text-xs text-slate-500">New Delhi</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-xs text-slate-400">Flight</p>
                <p className="font-semibold text-slate-800">SS 204</p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Date</p>
                <p className="font-semibold text-slate-800">25 Nov 2026</p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Aircraft</p>
                <p className="font-semibold text-slate-800">Airbus A320</p>
              </div>
            </div>
          </div>
        </section>

        {/* Page heading */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Select your seats
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose comfortable seats for everyone travelling with you.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <Users size={17} className="text-slate-500" />

              <select
                value={passengers.length}
                onChange={(e) =>
                  handlePassengerCount(Number(e.target.value))
                }
                className="bg-transparent text-sm font-medium text-slate-700 outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "Passenger" : "Passengers"}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={configuration}
              onChange={(e) =>
                handleConfigurationChange(
                  e.target.value as AircraftConfiguration
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none"
            >
              <option value="3-2">3–2 Configuration</option>
              <option value="2-3-2">2–3–2 Configuration</option>
            </select>
          </div>
        </div>

        {/* Main content */}
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
          <div>
            <PassengerList
              passengers={passengers}
              activePassengerId={activePassengerId}
              onSelect={setActivePassengerId}
            />
          </div>

          <div className="min-w-0 space-y-5">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center gap-3">
                <Armchair size={20} className="text-blue-600" />

                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Selecting seat for {selectedPassenger?.name}
                  </p>
                  <p className="text-xs text-blue-700">
                    {selectedPassenger?.assignedSeatId
                      ? `Currently assigned: ${selectedPassenger.assignedSeatId}. Select another seat to change it.`
                      : "Choose an available seat from the aircraft layout."}
                  </p>
                </div>
              </div>
            </div>

            <AircraftLayout
              seats={seats}
              passengers={passengers}
              activePassengerId={activePassengerId}
              configuration={configuration}
              onSeatClick={handleSeatClick}
            />

            <SeatLegend />
          </div>

          <div className="space-y-5">
            <BookingSummary
              passengers={passengers}
              seats={seats}
              total={total}
              onRemoveSeat={handleRemoveSeat}
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Seats assigned
                </span>

                <span className="font-semibold text-slate-900">
                  {passengers.filter((p) => p.assignedSeatId).length}
                  /{passengers.length}
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${(passengers.filter((p) => p.assignedSeatId).length /
                      passengers.length) *
                      100
                      }%`,
                  }}
                />
              </div>

              <button
                disabled={passengers.some((p) => !p.assignedSeatId)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                onClick={() => alert("Seat selection completed!")}
              >
                Continue <ArrowRight size={17} />
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Assign seats to all passengers to continue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
