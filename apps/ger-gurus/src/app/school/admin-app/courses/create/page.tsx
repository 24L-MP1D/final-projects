"use client"
import { Button } from "@/src/app/components/ui/button";
import { Input } from "@/src/app/components/ui/input";
import { Label } from "@/src/app/components/ui/label";
import { ChangeEvent, useState } from "react";

export default function Page() {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<FileList[]>([]);


    async function createCourse() {
        const images = await handleUpload();
        await fetch(`/api/courses`, {
            method: "POST",
            body: JSON.stringify({
                title,
                author,
                description,
                thumbnail: images
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        await reset();
    }

    function reset() {
        setTitle(""),
            setAuthor(""),
            setDescription("")
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const imageUrls: string[] = [];
        const newFiles = event.currentTarget.files;
        Array.from(newFiles ?? []).forEach((file) => {
            const imageUrl = URL.createObjectURL(file);
            imageUrls.push(imageUrl);
        });
        setImages((s) => [...s, ...imageUrls]);

        if (newFiles) {
            setFiles([...files, newFiles]);
        }
    };

    const handleUpload = async () => {
        if (!files) return;
        const formData = new FormData();
        files.forEach((fileList) => {
            Array.from(fileList ?? []).forEach((file) => {
                formData.append("image", file, file.name);
            });
        })
        console.log(formData);
        try {
        //   setLoading(true);
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          // console.log(data.secure_url)
        //   setLoading(false);
    
          return data;
        } catch (error) {
          console.error("error uploading file:", error);
        }
    };


        return (<div className="flex flex-col gap-4 w-[50%]">
            <Input placeholder="course title" value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="course author" value={author}
                onChange={(e) => setAuthor(e.target.value)} />
            <Input placeholder="Write description" value={description}
                onChange={(e) => setDescription(e.target.value)} />
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Thumbnail Picture</Label>
                <Input id="picture" type="file" onChange={handleFileChange}/>
            </div>
            <Button onClick={createCourse}>Continue</Button>

        </div>)
    }