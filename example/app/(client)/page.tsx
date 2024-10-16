import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{},[
    fetch('/api/categories')
  ]);

  return (
    <div className="">
     CLIENT
    </div>
  );
}
