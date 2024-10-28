'use client';

import { SetStateAction, useEffect, useState } from 'react';

type Data = {
  _id: string;
  name: string;
  email: string;
};

export default function Index() {
  const [data, setData] = useState<Data[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [create, setCreate] = useState(false);

  function reset() {
    setName(''), setEmail('');
  }

  function loadUser() {
    fetch(`/api/user`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    loadUser();
  }, []);
  function createUser() {
    fetch(`/api/user`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
      }),
      headers: {
        'Content-type': 'Application/json; charset=UTF-8',
      },
    }).then(() => {
      setCreate(false);
      loadUser();
    });
  }
  function deleteUser(_id: string) {
    fetch(`/api/user/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'Application/json; charset=UTF-8',
      },
    }).then(() => {
      loadUser();
    });
  }
  function editName(_id: string) {
    fetch(`/api/user/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: {
        'Content-type': 'Application/json; charset=UTF-8',
      },
    }).then(() => {
      loadUser();
      setUpdateName('');
    });
  }
  function editEmail(_id: string) {
    fetch(`/api/user/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({ email }),
      headers: {
        'Content-type': 'Application/json; charset=UTF-8',
      },
    }).then(() => {
      loadUser();
    });
  }
  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setName(e.target.value);
  };
  return (
    <div className="flex flex-col gap-3 ml-10 mt-10">
      test
      {data.map((data) => (
        <div className="flex justify-between w-[500px] h-12 items-center" key={data._id}>
          <div className="flex flex-col gap-1">
            {updateName === data._id ? <input className="border border-black" onChange={handleInputChange} /> : <div>Name: {data.name}</div>}
            {updateEmail === data._id ? <input className="border border-black" onChange={(e) => setEmail(e.target.value)} /> : <div>Email: {data.email}</div>}
          </div>
          <div className="flex gap-4">
            {updateName === data._id ? (
              <button onClick={() => editName(data._id)}>Update</button>
            ) : (
              <button onClick={() => setUpdateName(data._id)} className="border border-black rounded-lg">
                Edit Name
              </button>
            )}
            <button onClick={() => setUpdateEmail(data._id)} className="border border-black rounded-lg">
              Edit email
            </button>
            <button onClick={() => deleteUser(data._id)} className="border border-black rounded-lg">
              Delete
            </button>
          </div>
        </div>
      ))}
      {!create && <button onClick={() => setCreate(true)}>Create user</button>}
      {create && (
        <>
          <input onChange={(e) => setName(e.target.value)} className="border border-black rounded-lg outline-none p-1" placeholder="Name" type="text" />
          <input onChange={(e) => setEmail(e.target.value)} className="border border-black rounded-lg outline-none p-1" placeholder="Email" type="text" />
          <button onClick={createUser}>Create</button>
        </>
      )}
    </div>
  );
}
