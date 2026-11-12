import { Seat, AircraftConfiguration } from "@/types";

const seatPricing = {
    A: { category: "extra-legroom", price: 350 },
    B: { category: "standard", price: 0 },
    C: { category: "standard", price: 0 },
    D: { category: "premium", price: 250 },
    E: { category: "standard", price: 0 },
    F: { category: "extra-legroom", price: 350 },
    G: { category: "standard", price: 0 },
    H: { category: "premium", price: 250 },
} as const;

const occupiedSeats = ["1B", "2D", "3A", "4E", "5C"];

export function generateSeats(
    configuration: AircraftConfiguration
): Seat[] {
    const rows = 8;

    const columns =
        configuration === "3-2"
            ? ["A", "B", "C", "D", "E"]
            : ["A", "B", "D", "E", "F", "G", "H"];

    return Array.from({ length: rows }, (_, rowIndex) =>
        columns.map((column) => {
            const id = `${rowIndex + 1}${column}`;
            const pricing = seatPricing[column as keyof typeof seatPricing];

            const status: Seat["status"] = occupiedSeats.includes(id)
                ? "occupied"
                : "available";

            return {
                id,
                row: rowIndex + 1,
                column,
                category: pricing.category,
                price: pricing.price,
                status
            };
        })
    ).flat();
}