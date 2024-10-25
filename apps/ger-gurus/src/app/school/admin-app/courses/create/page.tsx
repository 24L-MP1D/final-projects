'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
const CLOUDINARY_CLOUD_NAME = 'dw85vgzlk';
const CLOUDINARY_UPLOAD_PRESET = 'zojuemkn';
export default function Page() {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // const [images, setImages] = useState<string[]>([]);
  // const [files, setFiles] = useState<FileList[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function createCourse() {
    // const images = await handleUpload();
    await fetch(`/api/courses`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        author,
        description,
        thumbnail: imageUrl,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    await reset();
  }

  function reset() {
    setTitle(''), setAuthor(''), setDescription('');
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      setLoading(true);

      fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.secure_url);
          setLoading(false);
        })
        .catch((err) => {
          alert('An Error Occured While Uploading');
        });
    }
  };

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const imageUrls: string[] = [];
  //     const newFiles = event.currentTarget.files;
  //     Array.from(newFiles ?? []).forEach((file) => {
  //         const imageUrl = URL.createObjectURL(file);
  //         imageUrls.push(imageUrl);
  //     });
  //     setImages((s) => [...s, ...imageUrls]);

  //     if (newFiles) {
  //         setFiles([...files, newFiles]);
  //     }
  // };

  // const handleUpload = async () => {
  //     if (!files) return;
  //     const formData = new FormData();
  //     files.forEach((fileList) => {
  //         Array.from(fileList ?? []).forEach((file) => {
  //             formData.append("image", file, file.name);
  //         });
  //     })
  //     console.log(formData);
  //     try {
  //       const response = await fetch("/api/upload", {
  //         method: "POST",
  //         body: formData,
  //       });
  //       const data = await response.json();

  //       return data;
  //     } catch (error) {
  //       console.error("error uploading file:", error);
  //     }
  // };

  return (
    <div className="flex flex-col gap-4 w-[50%]">
      <Input placeholder="course title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="course author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <Input placeholder="Write description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input id="picture" disabled={loading} type="file" onChange={handleUpload} />
        {imageUrl && <img src={imageUrl} alt="" />}
      </div>
      <Button onClick={createCourse}>Continue</Button>
    </div>
  );
}
