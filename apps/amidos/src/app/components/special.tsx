import { useEffect, useState } from "react";

export function Special() {
const [special,setSpecial]=useState();
useEffect(()=>

  const special = specialFoods();
  fetch('/api/special')
  .then((res) => res.json())
  .then((data) => {
    specialFoods(data);
)
}
}