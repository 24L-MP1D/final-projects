'use client';

import { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // The default
import LeftBar from '../components/leftbar';

const mockTables = [
  {
    _id: '1',
    position: { x: 100, y: 100 },
  },
  {
    _id: '2',
    position: { x: 300, y: 400 },
  },
  {
    _id: '3',
    position: { x: 500, y: 200 },
  },
  {
    _id: '4',
    position: { x: 600, y: 578 },
  },
];

export default function DragExample() {
  const [tables, setTables] = useState(mockTables);

  useEffect(() => {
    // fetch setTables();
  }, []);

  function handleDrag(id: string, newPosition: { x: number; y: number }) {
    const index = tables.findIndex((table) => table._id === id);
    const newTables = [...tables];
    newTables[index].position = { x: newPosition.x, y: newPosition.y };
    setTables(newTables);
  }

  function handleStop(_id: string) {
    const updateTable = tables.find((table) => table._id === _id);

    // TODO
    console.log(updateTable);
  }

  return (
    <div>
      <LeftBar />
      <div className="w-[800px] h-[800px] bg-slate-400 m-10 relative">
        {tables.map((table) => (
          <Draggable key={table._id} position={table.position} onDrag={(e, newPosition) => handleDrag(table._id, newPosition)} onStop={() => handleStop(table._id)}>
            <div className="absolute bg-green-400 w-20 h-20"></div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}
