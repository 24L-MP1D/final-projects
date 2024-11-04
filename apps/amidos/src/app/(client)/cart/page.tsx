"use client";
import { Button } from "@/components/ui/button";
import { Food } from "@/lib/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CartCard() {
    const [food, setFood] = useState<Food[]>([]);

    return (
        <div className="border rounded-lg shadow-md p-4 max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Your Cart</h2>
                
            </div>
            <div className="flex gap-4 mb-4">
                <img src="/pasta.jpg" alt="Delicious food" className="w-20 h-20 object-cover rounded" />
                <div className="flex-none">
                    <div className="flex justify-between mb-2 gap-5">
                        <p className="font-bold">Broccoli and Sweet Potato</p>
                        <p>$72.00</p>
                    </div>
                    <p className="pt-1">Variation: Regular</p>
                    <div className="flex items-center pt-2">
                        <div className="flex gap-2">
                            <Button variant="outline"><Minus /></Button>
                            <p className="mt-2">7</p>
                            <Button variant="outline"><Plus /></Button>
                            <Trash2 className="mt-2 ml-16" />
                        </div>
                    </div>
                </div>
            </div>
            <Button className="w-full mt-4" type="submit">Continue to Cart</Button>
        </div>
    );
}
