'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";



export default function Page() {
  const [domain, setDomain] = useState('')

  function create(){
    fetch(`/api/schools`, {
      method: 'POST',
      body: JSON.stringify({ domain }),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <div className="">
        <div>
          <Input onChange={(e) => setDomain(e.target.value)} type="text"/>
        </div>
        <Button onClick={create}>Create</Button>
    </div>
  );
}
