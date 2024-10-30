"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@uidotdev/usehooks";
import { formatInTimeZone } from 'date-fns-tz';
import { useState } from "react";

export default function TableVerify() {
    const [name, setName] = useState<string>("");
    const [phonenumber, setPhonenumber] = useState<string>("");
    const [selectedTime, setSelectedTime] = useLocalStorage("selectedTime");
    const [number, setNumber] = useLocalStorage("number");
    const [selectedTable, setSelectedTable] = useLocalStorage("selectedTable");
    const [day, setDay] = useLocalStorage("day");

    const reset = () => {
        setName("");
        setPhonenumber("");
        setSelectedTime(null);
        setNumber("");
        setSelectedTable(null);
        setDay(new Date());
    };

    async function CreateOrder() {
        const formattedDay = new Date(day)
        // console.log("DAY: ", formattedDay)
        // console.log("DATE FORMAT: ", formatInTimeZone(new Date(), 'Asia/Shanghai', 'yyyy-MM-dd'))
        // 
        try {
            const response = await fetch("/api/tablebook-verify", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    phonenumber,
                    time: selectedTime?.value,
                    nums: number,
                    table: selectedTable,
                    day: formatInTimeZone(formattedDay, 'Asia/Shanghai', 'yyyy-MM-dd')
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Захиалга үүсгэхэд алдаа гарлаа:");
            alert("Захиалга амжилттай үүслээ.!");
            reset();
        } catch (error) {
            console.error("Захиалга үүсгэхэд алдаа гарлаа:", error);
        }
    }

    return (
        <div className="max-w-screen-sm items-center mx-auto py-32">
            <div className="flex flex-col gap-7 p-36">
                <div className="flex flex-col gap-3">
                    <p className="text-2xl font-semibold">Та мэдээллээ оруулна уу?</p>
                    <Input
                        placeholder="Нэр ээ оруулна уу?"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        placeholder="Утасны дугаар аа оруулна уу?"
                        type="text"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                </div>
                <Button variant={"amidos3"} onClick={CreateOrder} className="w-full hover:hover:bg-[#52071b7c]">Захиалга үүсгэх</Button>
                {day}
            </div>
        </div>
    );
}
