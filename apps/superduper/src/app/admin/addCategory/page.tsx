import { useState } from 'react';
import { Input } from '../../components/ui/Input';

export default function addCategory() {
  const [name, setName] = useState('');
}
const create = async () => {
  try {
    const res = await fetch('/api/addCategory', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setName('');
    } else {
      console.error('Error on adding category type', res.statusText);
    }
  } catch (error) {
    console.error('Error on adding category type');
  }
};
function setName(arg0: string) {
  throw new Error('Function not implemented.');
}

return (
  <div>
    <Input placeholder="Please insert the type of the category" value={name} onChange={(e) => setName(e.target.value)} />

    <Input placeholder="Please insert description of the category" value={name} onChange={(e) => setName(e.target.value)} />

    <Button onClick={}>Add Category</Button>
    <Button onClick={}>Close</Button>
  </div>
);
}
