'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // The default
import LeftBar from '../components/leftbar';

export type TableModel = {
  id: string;
  corditane: {
    x: number;
    y: number;
  };
};

export default function DragExample() {
  const [tables, setTables] = useState(null);
  const [addtable, setAddTable] = useState();

  useEffect(() => {
    // fetch setTables();
  }, []);

  function handleDrag(id: string, newPosition: { x: number; y: number }) {
    const index = tables.findIndex((table) => table._id === id);
    const newTables = [...tables];
    newTables[index].position = { x: newPosition.x, y: newPosition.y };
    setTables(newTables);
  }

  async function handleStop(_id: string, position: { x: number; y: number }) {
    const updateTable = tables.find((table) => table._id === _id);
    // fetch(`api/admin/tablesDetail`);
    // TODO //PUT

    setTimeout(async () => {
      await fetch(`/api/admin/tablesDetail/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          cordinate: updateTable?.position,
        }),
      });
      getTables();
    }, 1000);

    console.log(updateTable);
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

    setTables((prev) => [...prev, { _id: 'new', position: { x: 1, y: 1 } }]);
  };

  const [selectedId, setSelectedId] = useState();
  const deleteOneTable = async (_id: string) => {
    const select = tables.find((table) => table._id === setSelectedId(_id));

    await fetch(`/api/admin/tablesDetail${_id}`, {
      method: 'DELETE',
    });
    getTables();
  };

  return (
    <div className="max-w-[1440px] mx-auto flex gap-5">
      <LeftBar />
      <div className="flex gap-10 mt-5">
        <div className="w-[800px] h-[800px] bg-slate-400 relative">
          {tables &&
            tables.map((table: TableModel) => (
              <Draggable key={table._id} position={table.cordinate} onDrag={(e, newPosition) => handleDrag(table._id, newPosition)} onStop={() => handleStop(table._id)}>
                <div onClick={selectedId} className={`${table ? 'bg-green-400' : ''} absolute w-20 h-20`}></div>
              </Draggable>
            ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={createTable} className="">
            add table
          </Button>
          <Button onClick={deleteOneTable} className="">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
