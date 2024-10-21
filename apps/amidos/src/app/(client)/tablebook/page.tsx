"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";


export default function TableBook() {
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
            <div className="flex-1">
                <div>
                    <Calendar />
                </div>
                <div>
                    Time
                </div>
                <div>
                    Hunii too
                </div>
            </div>
        </div>
    );
}
