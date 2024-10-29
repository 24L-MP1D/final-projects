"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


export default function TableVerify() {
    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<string>("");

    const reset = () => {
        setName("");
        setNumber("");
    };

    async function CreateOrder() {
        try {
            const response = await fetch("/api/tablebook-verify", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    number,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to create order");
            alert("Order created successfully!");
            reset();
        } catch (error) {
            console.error("Order creation failed:", error);
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
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <Button variant={"amidos3"} onClick={CreateOrder} className="w-full hover:hover:bg-[#52071b7c]">Захиалга үүсгэх</Button>
            </div>
        </div>
    );
}
