# FlightSeats – Flight Seat Selection

A responsive flight seat selection and passenger management application built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Passenger Management:** Dynamically manage 1–6 passengers and switch between passengers.
- **Aircraft Configurations:** Supports 3–2 and 2–3–2 seating arrangements.
- **Interactive Seat Selection:** Assign, replace, and remove seats for individual passengers.
- **Seat Availability:** Differentiates available, occupied, and passenger-assigned seats.
- **Dynamic Pricing:** Supports free seats and multiple paid seating categories.
- **Live Cost Calculation:** Automatically calculates total seat selection charges.
- **Responsive Interface:** Adapts to different screen sizes.

## Technology Stack

- Next.js (App Router)
- React.js
- TypeScript
- Tailwind CSS
- Lucide React

## Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── passengers/
│   │   └── PassengerList.tsx
│   ├── seats/
│   │   ├── AircraftLayout.tsx
│   │   ├── Seat.tsx
│   │   └── SeatLegend.tsx
│   └── booking/
│       └── BookingSummary.tsx
├── data/
│   ├── passengers.ts
│   └── seats.ts
├── types/
│   └── index.ts
└── lib/
    └── seat-utils.ts
```

## State Management

The application uses React's built-in state management through `useState` and `useMemo`.

- Passenger assignments and passenger count are maintained in application state.
- The currently active passenger and aircraft configuration are tracked independently.
- Seat data is generated according to the selected aircraft configuration.
- The total seat selection cost is derived from passenger assignments rather than stored separately.

## Seat Assignment Logic

Each passenger can have one assigned seat, identified by a unique seat ID.

The assignment utility validates seat availability and prevents multiple passengers from being assigned the same seat. Assigning another seat to an existing passenger replaces their previous assignment.

Seat removal and reassignment update the passenger state, automatically reflecting changes in the booking summary and total cost.

When switching aircraft configurations, incompatible seat assignments are cleared after user confirmation.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/MisLead07/FlightSeats
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Data

This project uses mock passenger and aircraft seat data. No backend integration or actual flight booking functionality is implemented.
