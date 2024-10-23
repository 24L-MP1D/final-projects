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
  const [password, setPassword] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [create, setCreate] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    fetch(`/api/user`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        'Content-type': 'Application/json; charset=UTF-8',
      },
    }).then(() => {
      setCreate(false);
      setLoading(true);
      loadUser();
      reset();
    });
  }
  function deleteUser(_id: string) {
    setLoading(true);
    fetch(`/api/user/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'Application/json; charset=UTF-8',
      },
    }).then(() => {
      loadUser();
      setLoading(false);
    });
  }
  function editName(_id: string) {
    setLoading(true);
    fetch(`/api/user/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: nameValue }),
      headers: {
        'Content-type': 'Application/json; charset=UTF-8',
      },
    }).then(() => {
      loadUser();
      setUpdateName('');
      setLoading(false);
    });
  }
  function editEmail(_id: string) {
    setLoading(true);
    fetch(`/api/user/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({ email: emailValue }),
      headers: {
        'Content-type': 'Application/json; charset=UTF-8',
      },
    }).then(() => {
      loadUser();
      setUpdateEmail('');
      setLoading(false);
    });
  }
  const handleNameInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setNameValue(e.target.value);
  };
  const handleEmailInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setEmailValue(e.target.value);
  };

  function nameID(_id: string, _name: string) {
    setUpdateName(_id);
    setNameValue(_name);
  }

  function emailID(_id: string, _email: string) {
    setUpdateEmail(_id);
    setEmailValue(_email);
  }
  function cancelName() {
    setUpdateName('');
  }
  function cancelEmail() {
    setUpdateEmail('');
  }
  return (
    <div>
      <div className="flex flex-col gap-3 ml-10 mt-10">
        test
        {data.map((data) => (
          <div className="flex justify-between w-[500px] h-12 items-center" key={data._id}>
            <div className="flex flex-col gap-1">
              {updateName === data._id ? <input value={nameValue} className="border border-black" onChange={handleNameInputChange} /> : <div>Name: {data.name}</div>}
              {updateEmail === data._id ? <input value={emailValue} className="border border-black" onChange={handleEmailInputChange} /> : <div>Email: {data.email}</div>}
            </div>
            <div className="flex gap-4">
              {updateName === data._id ? (
                <>
                  <button onClick={() => editName(data._id)} className="border border-black rounded-lg">
                    Update
                  </button>
                  <button onClick={cancelName} className="border border-black rounded-lg">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => nameID(data._id, data.name)} className="border border-black rounded-lg">
                  Edit Name
                </button>
              )}
              {updateEmail === data._id ? (
                <>
                  <button onClick={() => editEmail(data._id)} className="border border-black rounded-lg">
                    Update
                  </button>
                  <button onClick={cancelEmail} className="border border-black rounded-lg">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => emailID(data._id, data.email)} className="border border-black rounded-lg">
                  Edit email
                </button>
              )}
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
            <input onChange={(e) => setPassword(e.target.value)} className="border border-black rounded-lg outline-none p-1" placeholder="Password" type="text" />
            <button onClick={createUser}>Create</button>
          </>
        )}
      </div>
    </div>
  );
}
