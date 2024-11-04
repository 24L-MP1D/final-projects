"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Time = { id: number; value: string };
type Table = { id: number; name: string };
const reservedTables: Table[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Table-${i + 1}`,
}));
export default function TableBook() {
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useLocalStorage<Time | null>("selectedTime", null);
    const [reservedSeat, setReservedSeat] = useLocalStorage<number | null>("reservedSeat", null);
    const [selectedTable, setSelectedTable] = useLocalStorage<number | null>("selectedTable", null);
    const [day, setDay] = useLocalStorage("day", new Date().toISOString());
    const reset = () => {
        setSelectedTime(null);
        setReservedSeat(null);
        setSelectedTable(null);
        setDay(new Date().toISOString());

    };
    const handleSubmit = () => {
        if (!selectedTime || !selectedTable || !reservedSeat || reservedSeat <= 0) {
            alert("Бүх сонголтуудыг хийнэ үү!");
            return;
        }
        router.push("/tablebook-verify");
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
    }, []);
    return (
        <div className="flex flex-col justify-center gap-8 p-10 mx-auto">
            <div className="flex justify-between items-center">
                <div className="flex gap-8 p-3">
                    <div className="flex flex-col gap-4">
                        <p className="text-xl font-semibold">Өдөр сонгох</p>
                        <DatePicker
                            selected={new Date(day)}
                            onSelect={(val) => setDay(val ? new Date(val).toISOString() : new Date().toISOString())}
                            className="rounded-md border p-2"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-xl font-semibold">Цаг сонгох</p>
                        <input
                            type="time"
                            id="time"
                            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            min="10:00"
                            max="22:00"
                            value={selectedTime?.value || "00:00"}
                            required
                            onChange={(e) => setSelectedTime({ id: Date.now(), value: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-xl font-semibold">Хүний тоо</p>
                        <Input
                            placeholder="Хүний тоо"
                            type="number"
                            min="1"
                            value={reservedSeat || ''}
                            onChange={(e) => setReservedSeat(Number(e.target.value) || null)}
                            className="p-5"
                        />
                    </div>
                </div>
                <Button
                    className={`w-[200px] h-[40px] py-2 text-center bg-[#52071B] rounded-xl text-white text-base font-semibold hover:bg-[#52071b92] ${!selectedTime || !selectedTable || !reservedSeat ? "opacity-50 cursor-not-allowed" : ""}`}
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
                        className={`w-40 h-16 ${selectedTable === table.id ? "bg-[#52071B] text-white" : "bg-yellow-400 hover:bg-yellow-600"}`}
                        onClick={() => setSelectedTable(table.id)}
                    >
                        {table.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}
