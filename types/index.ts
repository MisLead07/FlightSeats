export type SeatCategory = "standard" | "premium" | "extra-legroom";

export type AircraftConfiguration = "3-2" | "2-3-2";

export interface Passenger {
    id: string;
    name: string;
    assignedSeatId: string | null;
}

export interface Seat {
    id: string;
    row: number;
    column: string;
    category: SeatCategory;
    price: number;
    status: "available" | "occupied";
}