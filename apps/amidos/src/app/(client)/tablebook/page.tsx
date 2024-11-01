"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
type Time = { id: number; value: string };
type PeopleCount = { value: string };
type Table = { id: number; name: string };

const times: Time[] = [
    { id: 1, value: "11:00" },
    { id: 2, value: "12:00" },
    { id: 3, value: "13:00" },
    { id: 4, value: "14:00" },
    { id: 5, value: "15:00" },
    { id: 6, value: "16:00" },
    { id: 7, value: "17:00" },
    { id: 8, value: "18:00" },
    { id: 9, value: "20:00" },
    { id: 10, value: "21:00" },
    { id: 11, value: "22:00" },
];
const reservedTables: Table[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Table-${i + 1}`,
}));
// const reservedSeats: PeopleCount[] = [
//     { value: "1 хүн" },
//     { value: "2 хүн" },
//     { value: "2-4 хүн" },
//     { value: "4 хүн" },
//     { value: "4-6 хүн" },
//     { value: "6-8 хүн" },
//     { value: "8-10 хүн" },
//     { value: "10-с дээш хүн" },
// ];
export default function TableBook() {
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useLocalStorage<Time | null>("selectedTime", null);
    const [reservedSeat, setReservedSeat] = useLocalStorage<number | null>("reservedSeat", null);
    const [selectedTable, setSelectedTable] = useLocalStorage<number | null>("selectedTable", null);
    const [day, setDay] = useLocalStorage("day", new Date().toISOString());
    const [value, onChange] = useState('10:00');
    const reset = () => {
        setSelectedTime(null);
        setReservedSeat(null);
        setSelectedTable(null);
        setDay(new Date().toISOString());
    };
    const handleSubmit = () => {
        if (selectedTime && selectedTable && reservedSeat) {
            router.push("/tablebook-verify");
        } else {
            alert("Бүх сонголтуудыг хийнэ үү!");
        }
    };
    const renderButtons = (items: Array<{ value: string }>, setter: (value: string) => void, selectedValue: string | null) => (
        items.map((item, index) => (
            <Button
                key={index}
                variant={"amidos2"}
                className={`text-base font-semibold ${selectedValue === item.value ? "bg-[#52071B] text-white" : ""}`}
                onClick={() => setter(item.value)}
            >
                {item.value}
            </Button>
        ))
    );
    useEffect(() => {
        reset();
    }, [])
    return (
        <div className="flex flex-col justify-center gap-8 p-10 mx-auto">
            <div className="p-4 flex  gap-6">
                <div className="flex flex-col gap-4">
                    <p className="text-xl font-bold">Өдөр сонгох</p>
                    <DatePicker
                        selected={new Date(day)}
                        onSelect={(val) => {
                            setDay(val ? new Date(val).toISOString() : new Date().toISOString())
                        }}
                        className="rounded-md border p-2"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-xl font-bold">Цаг сонгох</p>
                    <div className="grid grid-cols-3 gap-4">
                        {/* {times.map((time) => (
                            <Button
                                key={time.id}
                                variant={"amidos2"}
                                className={`text-base font-semibold ${selectedTime?.id === time.id ? "bg-[#52071B] text-white" : ""}`}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time.value}
                            </Button>
                        ))} */}
                        <TimePicker onChange={onChange} value={value} />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-xl font-bold">Хүний тоо</p>
                    <div className="grid grid-cols-3 gap-4">
                        {/* {renderButtons(reservedSeats, setReservedSeat, reservedSeat)} */}
                        <Input placeholder="Хүний тоо" type="number" value={reservedSeat}
                            onChange={(e) => setReservedSeat(e.target.value)} />
                    </div>
                </div>
                <Button
                    className={`w-[200px] h-[40px] py-2 text-center bg-[#52071B] rounded-xl text-white text-base font-semibold hover:bg-[#52071b7c] ${!selectedTime || !selectedTable || !reservedSeat ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleSubmit}
                    disabled={!selectedTime || !selectedTable || !reservedSeat}
                >
                    Үргэлжлүүлэх
                </Button>
            </div>
            <div className="grid grid-cols-5 gap-10">
                {reservedTables.map((table) => (
                    <Button
                        variant={"amidos2"}
                        key={table.id}
                        className={`w-32 h-16 ${selectedTable === table.id ? "bg-[#52071B] text-white" : "bg-yellow-400 hover:bg-yellow-600"}`}
                        onClick={() => setSelectedTable(table.id)}
                    >
                        {table.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}
