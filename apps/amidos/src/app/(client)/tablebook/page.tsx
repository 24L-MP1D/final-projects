"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { useState } from "react";


type Time = {
    id: number;
    value: string
};
type Number = {
    value: string
}
type Calendar = {
    value: number
}
type Table = {
    id: number;
    name: string
}

const times: Time[] = [
    { id: 1, value: "11:00" },
    { id: 2, value: "12:00" },
    { id: 3, value: "13:00" },
    { id: 4, value: "14:00" },
    { id: 5, value: "15:00" },
    { id: 6, value: "16:00" },
    { id: 7, value: "17:00" },
    { id: 8, value: "18:00" },
    { id: 9, value: "19:00" },
    { id: 10, value: "20:00" },
    { id: 11, value: "21:00" },
    { id: 12, value: "22:00" },
];
const tables = [
    {
        id: 1,
        name: "Table-1"
    },
    {
        id: 2,
        name: "Table-2"
    },
    {
        id: 3,
        name: "Table-3"
    },
    {
        id: 4,
        name: "Table-4"
    },
    {
        id: 5,
        name: "Table-5"
    },
    {
        id: 6,
        name: "Table-6"
    },
    {
        id: 7,
        name: "Table-7"
    },
    {
        id: 8,
        name: "Table-8"
    },
    {
        id: 9,
        name: "Table-9"
    },
    {
        id: 10,
        name: "Table-10"
    },
    {
        id: 11,
        name: "Table-11"
    },
    {
        id: 12,
        name: "Table-12"
    },
    {
        id: 13,
        name: "Table-13"
    },
    {
        id: 14,
        name: "Table-14"
    },
    {
        id: 15,
        name: "Table-15"
    },
]

const nums = [
    { value: "1 хүн" },
    { value: "2 хүн" },
    { value: "2-4 хүн" },
    { value: "4-6 хүн" },
    { value: "6-10 хүн" },
    { value: "10-с дээш хүн" },
];

export default function TableBook() {
    const [selectedCalendarDay, setSelectedCalendarDay] = useState<number | undefined>();
    const [selectedTime, setSelectedTime] = useState<Time | null>(null);
    const [number, setNumber] = useState<string>("");
    const [selectTable, setSelectedTable] = useState<number | null>(null);
    const [day, setDay] = useState<Date | undefined>(new Date());

    const reset = () => {
        setSelectedTime(null);
        setNumber("");
        setSelectedCalendarDay(undefined);
        setSelectedTable(null);
    };
    async function CreateOrder() {
        try {
            const response = await fetch("/api/tablebook", {
                method: "POST",
                body: JSON.stringify({
                    time: selectedTime?.value,
                    nums: number,
                    calendar: selectedCalendarDay,
                    table: selectTable,
                    day: format(day as Date, "yyyy-MM-dd")
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to create order");
            reset();
        } catch (error) {
            console.error("Order creation failed:", error);
        }
    }
    // day: format(day as Date, "yyyy-MM-DD")
    return (
        <div className="flex justify-center gap-10 p-10 mx-auto">
            <div className="grid grid-cols-4 gap-16">
                {tables.map((table) => (
                    <Button
                        key={table.id}
                        className={`w-32 h-16 bg-yellow-400 hover:bg-yellow-600 ${selectTable === table.id ? "bg-yellow-600" : ""
                            }`}
                        onClick={() => setSelectedTable(table.id)}
                    >
                        {table.name}
                    </Button>
                ))}
            </div>
            <div className="bg-slate-300 p-4 flex flex-col gap-6">
                <div className="self-center">
                    <Calendar
                        mode="single"
                        selected={day}
                        onSelect={(date) => setDay(date || undefined)}
                        className="rounded-md border"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Цаг сонгох</p>
                    <div className="grid grid-cols-4 gap-4">
                        {times.map((time) => (
                            <Button
                                key={time.id}
                                variant={"outline"}
                                className={`text-base font-semibold ${selectedTime?.id === time.id ? "bg-black text-white" : ""
                                    }`}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time.value}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Хүний тоо</p>
                    <div className="grid grid-cols-2 gap-4">
                        {nums.map((num, index) => (
                            <Button
                                key={index}
                                variant={"outline"}
                                className={`text-base font-semibold ${number === num.value ? "bg-black text-white" : ""}`}
                                onClick={() => setNumber(num.value)}
                            >
                                {num.value}
                            </Button>
                        ))}
                    </div>
                </div>
                <Button onClick={CreateOrder}>Үргэлжлүүлэх</Button>
            </div>
        </div>
    );
}
