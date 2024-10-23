"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

type Time = {
    id: number,
    value: string
}
const times = [
    {
        id: 1,
        value: "11:00"
    },
    {
        id: 2,
        value: "12:00"
    },
    {
        id: 3,
        value: "13:00"
    },
    {
        id: 4,
        value: "14:00"
    },
    {
        id: 5,
        value: "15:00"
    },
    {
        id: 6,
        value: "16:00"
    },
    {
        id: 7,
        value: "17:00"
    },
    {
        id: 8,
        value: "18:00"
    },
    {
        id: 9,
        value: "19:00"
    },
    {
        id: 10,
        value: "20:00"
    },
    {
        id: 11,
        value: "21:00"
    },
    {
        id: 12,
        value: "22:00"
    },

];

const nums = [
    {
        value: "1 хүн"
    },
    {
        value: "2 хүн"
    },
    {
        value: "2-4 хүн"
    },
    {
        value: "4-6 хүн"
    },
    {
        value: "6-10 хүн"
    },
    {
        value: "10-с дээш хүн"
    },
];

export default function TableBook() {
    const [calendar, setCalendar] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<Time>();
    const [number, setNumber] = useState<string>("");
    const [tablebook, setTablebook] = useState();
    console.log(selectedTime);
    console.log(number)

    // function CreatOrder() {
    //     fetch("http://localhost:3000")
    //         .then(res => res.json())
    //         .then(data => setTablebook(data));
    // }

    return (
        <div className="flex gap-10 p-10 mx-auto">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-16">
                    <Button className="w-32 h-16 bg-yellow-400 hover:bg-yellow-600">9</Button>
                    <Button className="w-24 h-16 bg-yellow-400 hover:bg-yellow-600">10</Button>
                    <Button className="w-24 h-16 bg-yellow-400 hover:bg-yellow-600">11</Button>
                </div>
                <div className="flex gap-36">
                    <div className="grid col-span-6 gap-6">
                        <Button className="w-32 h-16 bg-yellow-400 hover:bg-yellow-600">8</Button>
                        <Button className="w-32 h-16 bg-yellow-400 hover:bg-yellow-600">7</Button>
                        <Button className="w-32 h-16 bg-yellow-400 hover:bg-yellow-600">6</Button>
                        <Button className="w-32 h-16 bg-yellow-400 hover:bg-yellow-600">5</Button>
                        <Button className="w-32 h-16 bg-yellow-400 hover:bg-yellow-600">4</Button>
                    </div>
                    <div className="grid col-span-6 gap-6">
                        <Button className="w-24 h-16 bg-yellow-400 hover:bg-yellow-600">12</Button>
                        <Button className="w-24 h-16 bg-yellow-400 hover:bg-yellow-600">13</Button>
                        <Button className="w-24 h-16 bg-yellow-400 hover:bg-yellow-600">14</Button>
                        <Button className="w-24 h-16 bg-yellow-400 hover:bg-yellow-600">15</Button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-16">
                    <Button className="w-32 h-16 bg-yellow-400 hover:bg-yellow-600">3</Button>
                    <Button className="w-24 h-16 bg-yellow-400 hover:bg-yellow-600">2</Button>
                    <Button className="w-24 h-16 bg-yellow-400 hover:bg-yellow-600">1</Button>
                </div>
            </div>
            <div className="bg-slate-300 p-4 flex flex-col gap-6">
                <div className="self-center">
                    <Calendar />
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Цаг сонгох</p>
                    <div className="grid grid-cols-4 gap-4">
                        {times.map((time) => (
                            <Button key={time.id} variant={"outline"} className="text-base font-semibold" onClick={() => setSelectedTime(time)}>
                                {time.value}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Хүний тоо</p>
                    <div className="grid grid-cols-2 gap-4">
                        {nums.map((num, index) => (
                            <Button key={index} variant={"outline"} className="text-base font-semibold" onClick={() => setNumber(num.value)}>
                                {num.value}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
