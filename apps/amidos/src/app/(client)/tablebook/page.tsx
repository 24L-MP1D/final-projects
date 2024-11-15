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
  name: string,
  tableNumber: number,
  isReserved: boolean,
  coordinate: {
    x: number,
    y: number
  }
};

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <TableBook />;
}

function TableBook() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useLocalStorage<string | null>("selectedTime", null);
  const [reservedSeat, setReservedSeat] = useLocalStorage<number | null>("reservedSeat", null);
  const [selectedTable, setSelectedTable] = useLocalStorage<string | null>("selectedTable", null);
  const [day, setDay] = useLocalStorage("day", new Date().toISOString());
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);


  const reset = () => {
    setSelectedTime(null);
    setReservedSeat(null);
    setSelectedTable("");
    setDay(new Date().toISOString());
    setAlertMessage(null);
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

  const handleTableSelect = (table: Table) => {
    console.log("table", table)
    if (table.isReserved) {
      setAlertMessage(`Ширээ ${table.tableNumber} аль хэдийн захиалагдсан байна!`);
    } else {
      setSelectedTable(table._id);
      setAlertMessage(null);
    }
  };

  return (
    <div className="flex py-10 mx-auto max-w-screen-2xl gap-20 ">
      {loading ? (
        <div>Loading tables...</div>
      ) : (
        <div className="relative backgroundImage bg-cover bg-center h-[800px] w-[1200px]">
          {tables.map((table) => (
            <div
              style={{ top: table.coordinate.y, left: table.coordinate.x }}
              className={`absolute w-20 h-20 rounded-full
                          ${table.isReserved ? "bg-gray-400 cursor-not-allowed" :
                  selectedTable === table._id ? "bg-[#52071B] text-white" : "bg-yellow-400 hover:bg-yellow-600"}`}
              key={table._id}
              onClick={() => handleTableSelect(table)}
            >
              {table.tableNumber}
            </div>
          ))}
        </div>
      )}
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">Анхааруулга</h2>
            <p className="text-center mb-6">{alertMessage}</p>
            <Button
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              onClick={() => setAlertMessage(null)}
            >
              Хаах
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-8 p-3">
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
          <Button
            className={`w-[200px] h-[40px] py-2 text-center bg-[#52071B] rounded-xl text-white text-base font-semibold hover:bg-[#52071b92]
                        ${!selectedTime || !selectedTable || !reservedSeat ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={!selectedTime || !selectedTable || !reservedSeat}
          >
            Үргэлжлүүлэх
          </Button>
        </div>
      </div>
    </div>
  );
}