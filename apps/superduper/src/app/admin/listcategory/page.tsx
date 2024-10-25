'use client';

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger
} from "@/components/ui/menubar";
import { useEffect, useState } from 'react';

export default function DisplayCategories() {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data.map((category: { name: string }) => category.name));
        }
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto flex flex-col gap-30">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Categories1</MenubarTrigger>
                    <MenubarTrigger>Categories2</MenubarTrigger>
                    <MenubarTrigger>Categories3</MenubarTrigger>
                    <MenubarTrigger>Categories4</MenubarTrigger>
                    <MenubarTrigger>Categories5</MenubarTrigger>
                    <MenubarTrigger>Categories6</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
        </div>
    );
}