
import { Passenger, Seat } from "@/types";

// Assign a seat to a passenger
export function assignSeat(
    passengers: Passenger[],
    passengerId: string,
    seatId: string,
    seats: Seat[]
): Passenger[] {
    const seat = seats.find((s) => s.id === seatId);

    if (!seat || seat.status === "occupied") return passengers;

    // Prevent assigning a seat already assigned to someone else
    const alreadyAssigned = passengers.some(
        (p) => p.id !== passengerId && p.assignedSeatId === seatId
    );

    if (alreadyAssigned) return passengers;

    return passengers.map((passenger) =>
        passenger.id === passengerId
            ? { ...passenger, assignedSeatId: seatId }
            : passenger
    );
}

// Remove a passenger's assigned seat
export function removeSeat(
    passengers: Passenger[],
    passengerId: string
): Passenger[] {
    return passengers.map((passenger) =>
        passenger.id === passengerId
            ? { ...passenger, assignedSeatId: null }
            : passenger
    );
}

// Calculate total seat selection cost
export function calculateTotal(
    passengers: Passenger[],
    seats: Seat[]
): number {
    return passengers.reduce((total, passenger) => {
        if (!passenger.assignedSeatId) return total;

        const seat = seats.find(
            (s) => s.id === passenger.assignedSeatId
        );

        return total + (seat?.price ?? 0);
    }, 0);
}
