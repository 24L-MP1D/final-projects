"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Table = {
  _id: string,
  name: string
  coordinate: {
    x: number,
    y: number
  }
};


export default function Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) {
    return null;
  }

  return <TableBook />
}

function TableBook() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useLocalStorage<string | null>("selectedTime", null);
  const [reservedSeat, setReservedSeat] = useLocalStorage<number | null>("reservedSeat", null);
  const [selectedTable, setSelectedTable] = useLocalStorage<string | null>("selectedTable", null);
  const [day, setDay] = useLocalStorage("day", new Date().toISOString());
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  const reset = () => {
    setSelectedTime(null);
    setReservedSeat(null);
    setSelectedTable("");
    setDay(new Date().toISOString());
  };

  const handleSubmit = () => {
    if (!selectedTime || !selectedTable || !reservedSeat || reservedSeat <= 0) {
      alert("Please complete all fields!");
      return;
    }
    const selectedHour = Number(selectedTime.split(":")[0]);
    if (selectedHour < 10 || selectedHour > 23) {
      alert("Please select a time between 10:00 and 23:00.");
      return;
    }
    if (reservedSeat > 50) {
      alert("The maximum number of people per table is 50.");
      return;
    }
    router.push("/tablebook-verify");
  };

  useEffect(() => {
    const getTablesDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/tablesDetail");
        if (!res.ok) throw new Error("Failed to fetch tables");
        const data = await res.json();
        setTables(data);
      } catch (error) {
        console.error("Error fetching tables:", error);
        alert("Failed to load table details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    reset();
    getTablesDetail();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-8 p-20 mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-8 p-3">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">Өдөр сонгох</p>
            <DatePicker
              selected={new Date(day)}
              onSelect={(val) => setDay(val ? new Date(val).toISOString() : new Date().toISOString())}
              className="rounded-md border p-2"
              minDate={new Date()}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">Цаг сонгох</p>
            <input
              type="time"
              id="time"
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              min="10:00"
              max="23:00"
              value={selectedTime || "10:00"}
              required
              onChange={(ev) => setSelectedTime(ev.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">Хүний тоо</p>
            <Input
              placeholder="Хүний тоо"
              type="number"
              min="1"
              value={reservedSeat || ''}
              onChange={(ev) => setReservedSeat(Number(ev.target.value) || null)}
              className="p-5"
            />
          </div>
        </div>
        <Button
          className={`w-[200px] h-[40px] py-2 text-center bg-[#52071B] rounded-xl text-white text-base font-semibold hover:bg-[#52071b92] 
                        ${!selectedTime || !selectedTable || !reservedSeat ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleSubmit}
          disabled={!selectedTime || !selectedTable || !reservedSeat}
        >
          Continue
        </Button>
      </div>
      {loading ? (
        <div>Loading tables...</div>
      ) : (
        <div className="relative h-[800px] w-[800px]">
          {tables.map((table) => (
            <div style={{ top: table.coordinate.y, left: table.coordinate.x }}
              className={`absolute w-20 h-20 rounded-full ${selectedTable === table._id ? "bg-[#52071B] text-white" : "bg-yellow-400 hover:bg-yellow-600"}`}
              key={table._id}
              onClick={() => setSelectedTable(table._id)}>
              {table.name}
            </div>
          ))}
        </div>
      )}
    </div >
  );
}
