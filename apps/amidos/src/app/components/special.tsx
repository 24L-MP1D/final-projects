import { useEffect, useState } from 'react';

export function Special() {
  const [special, setspecialFoods] = useState();
  useEffect(() => {
    fetch('/api/special')
      .then((res) => res.json())
      .then((data) => {
        setspecialFoods(data);
      });
  });
}
