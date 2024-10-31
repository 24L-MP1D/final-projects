"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useLocalStorage } from "@uidotdev/usehooks";

import { useRouter } from "next/navigation";

type Time = { id: string; value: string };
type PeopleCount = { value: string };
type Table = { id: number; name: string };


const times: Time[] = [
    { id: 1, value: "11:00" },
    { id: 3, value: "12:00" },
    { id: 4, value: "13:00" },
    { id: 5, value: "14:00" },
    { id: 6, value: "15:00" },
    { id: 7, value: "16:00" },
    { id: 8, value: "17:00" },
    { id: 9, value: "18:00" },
    { id: 10, value: "20:00" },
    { id: 11, value: "21:00" },
    { id: 12, value: "22:00" },
];

const reservedTable: Table[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Table-${i + 1}`,
}));

const reservedSeat: PeopleCount[] = [
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
    const [selectedTime, setSelectedTime] = useLocalStorage("selectedTime");
    const [number, setNumber] = useLocalStorage("number");
    const [selectedTable, setSelectedTable] = useLocalStorage("selectedTable");
    const [day, setDay] = useLocalStorage("day");

    // const formattedDay = formatInTimeZone(new Date(), 'Asia/Shanghai', 'yyyy-MM-dd')

    const reset = () => {
        setSelectedTime(null);
        setNumber("");
        setSelectedTable(null);
        setDay(new Date());
    };

    // console.log("TableBook", formattedDay)

    const handleSubmit = () => {
        if (selectedTime && selectedTable && number) {
            router.push("/tablebook-verify");
        } else {
            alert("Бүх сонголтуудыг хийнэ үү!");
        }
    };

    // async function CreateOrder() {
    //     try {
    //         const response = await fetch("/api/tablebook", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 time: selectedTime?.value,
    //                 nums: number,
    //                 calendar: day,
    //                 table: selectedTable,
    //                 day: format(day as Date, "yyyy-MM-dd"),
    //             }),
    //         });

    //         if (!response.ok) {
    //             throw new Error("Захиалга үүсгэхэд алдаа гарлаа.");
    //         }
    //         console.log("Захиалга амжилттай үүслээ.");
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    return (
        <div className="flex justify-center gap-10 p-10 mx-auto">
            <div className="grid grid-cols-4 gap-16">
                {reservedTable.map((table) => (
                    <Button
                        key={table.id}
                        className={`w-32 h-16 ${selectedTable === table.id
                            ? "bg-yellow-600"
                            : "bg-yellow-400 hover:bg-yellow-600"
                            }`}
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
                        selected={new Date(day)}
                        onSelect={(date) => setDay(date || undefined)}
                        className="rounded-md border"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Цаг сонгох</p>
                    <div className="grid grid-cols-3 gap-4">
                        {times.map((time) => (
                            <Button
                                variant={"amidos2"}
                                key={time.id}
                                className={`text-base font-semibold ${selectedTime?.id === time.id ? "bg-[#52071B] text-white" : ""
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
                    <div className="grid grid-cols-3 gap-4">
                        {reservedSeat.map((seat, index) => (
                            <Button
                                variant={"amidos2"}
                                key={index}
                                className={`text-base font-semibold ${number === seat.value ? "bg-[#52071B] text-white" : ""
                                    }`}
                                onClick={() => setNumber(seat.value)}
                            >
                                {seat.value}
                            </Button>
                        ))}
                    </div>
                </div>
                <Button
                    className={`w-[200px] h-[40px] py-2 text-center self-center bg-[#52071B] rounded-xl text-white text-base font-semibold hover:bg-[#52071b7c] ${!selectedTime || !selectedTable || !number ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={handleSubmit}
                    disabled={!selectedTime || !selectedTable || !number}
                >
                    Үргэлжлүүлэх
                </Button>
            </div>
        </div>
    );
}
