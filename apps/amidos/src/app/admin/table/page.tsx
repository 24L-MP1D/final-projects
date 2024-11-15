'use client';

import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

export type TableModel = {
  _id: string;
  coordinate: {
    x: number;
    y: number;
  };
};

export default function Table() {
  const [tables, setTables] = useState<TableModel[]>([]);
  const [deletedId, setDeletedId] = useState<string>('');

  const deleteOneTable = async () => {
    if (!deletedId) {
      console.error('No table selected for deletion');
      return;
    }

    try {
      const response = await fetch(`/api/admin/tablesDetail/${deletedId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Optionally refresh the table list after deletion
        setTables(tables.filter((table) => table._id !== deletedId));
        setDeletedId('');
      } else {
        const errorText = await response.text();
        console.error('Failed to delete table:', errorText);
      }
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  useEffect(() => {
    // fetch setTables();
  }, []);

  function handleDrag(index: number, newPosition: { x: number; y: number }) {
    const newTables = [...tables];
    newTables[index].coordinate = { x: newPosition.x, y: newPosition.y };
    setTables(newTables);
  }

  async function handleStop(index: number) {
    const current = tables[index];

    await fetch(`/api/admin/tablesDetail/${current._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        coordinate: current?.coordinate,
      }),
    });
  }

  const getTables = async () => {
    const response = await fetch(`/api/admin/tablesDetail`);
    const data = await response.json();

    setTables(data);
  };

  useEffect(() => {
    getTables();
  }, []);

  const createTable = async () => {
    await fetch(`/api/admin/tablesDetail`, {
      method: 'POST',
      body: JSON.stringify({
        position: { x: 1, y: 1 },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    getTables();
  };

  return (
    <div className="max-w-[1440px] mx-auto flex gap-5 ">
      <div className="flex gap-10 mt-5">
        <div className="bg-cover bg-center h-[800px] w-[1200px] relative backgroundImage">

          {tables &&
            tables.map((table: TableModel, index: number) => (
              <Draggable
                key={table._id}
                position={table.coordinate}
                onDrag={(e, newPosition) => handleDrag(index, newPosition)}
                onStop={() => {
                  handleStop(index);
                }}
              >
                {/* <div className={`${table ? 'bg-green-400' : ''} absolute w-20 h-20`}></div> */}
                <div onClick={() => setDeletedId(table._id)} className={` ${deletedId === table._id ? 'bg-emerald-100 border border-white' : ''} bg-emerald-600 rounded-full absolute w-20 h-20`}></div>
              </Draggable>
            ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={createTable} className="bg-black text-white">
            add
          </Button>
          <Button onClick={deleteOneTable} className="bg-black text-white">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
