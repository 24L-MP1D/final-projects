"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

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

const reservedSeats: PeopleCount[] = [
    { value: "1 хүн" },
    { value: "2 хүн" },
    { value: "2-4 хүн" },
    { value: "4 хүн" },
    { value: "4-6 хүн" },
    { value: "6-8 хүн" },
    { value: "8-10 хүн" },
    { value: "10-с дээш хүн" },
];

export default function TableBook() {
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useLocalStorage<Time | null>("selectedTime", null);
    const [reservedSeat, setReservedSeat] = useLocalStorage<string | null>("reservedSeat", null);
    const [selectedTable, setSelectedTable] = useLocalStorage<number | null>("selectedTable", null);
    const [day, setDay] = useLocalStorage<Date | null>("day", new Date());

    const reset = () => {
        setSelectedTime(null);
        setReservedSeat(null);
        setSelectedTable(null);
        setDay(new Date());
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

    return (
        <div className="flex justify-center gap-8 p-10 mx-auto">
            <div className="grid grid-cols-4 gap-16">
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
            <div className="p-4 flex flex-col gap-6">
                <div className="self-center">
                    <Calendar
                        mode="single"
                        selected={new Date()}
                        onSelect={(date) => setDay(day)}
                        className="rounded-md border"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Цаг сонгох</p>
                    <div className="grid grid-cols-3 gap-4">
                        {times.map((time) => (
                            <Button
                                key={time.id}
                                variant={"amidos2"}
                                className={`text-base font-semibold ${selectedTime?.id === time.id ? "bg-[#52071B] text-white" : ""}`}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time.value}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Хүний тоо</p>
                    <div className="grid grid-cols-3 gap-4">
                        {renderButtons(reservedSeats, setReservedSeat, reservedSeat)}
                    </div>
                </div>
                <Button
                    className={`w-[200px] h-[40px] py-2 text-center self-center bg-[#52071B] rounded-xl text-white text-base font-semibold hover:bg-[#52071b7c] ${!selectedTime || !selectedTable || !reservedSeat ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleSubmit}
                    disabled={!selectedTime || !selectedTable || !reservedSeat}
                >
                    Үргэлжлүүлэх
                </Button>
            </div>
        </div>
    );
}
