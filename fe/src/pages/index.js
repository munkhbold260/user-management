import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

export default function Home({ datas }) {
  const [list, setList] = useState({ datas });

  console.log("bdfjsdhbfkjhsdfkjgs", datas);
  console.log("liiiist", list);
  const be_url = "http://localhost:3001/add-user";
  const del_url = "http://localhost:3001/delete-user";
  async function handleSubmit(e) {
    e.preventDefault();
    const newId = nanoid();
    const data = { name: e.target.username.value, id: newId };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    // console.log("data", data);
    const fetched_data = await fetch(be_url, options);
    // const fetched_json = await fetched_data.text();
    // console.log("123123", fetched_data);
    // console.log(fetched_data);
  }
  async function handleDelete(b) {
    b.preventDefault();
    console.log("working delete btn");
    const options = { method: "POST" };

    const fetched_data = await fetch(del_url, options);
  }

  async function handleUpdate(c) {
    c.preventDefault();
    console.log("working edit button");
  }

  return (
    <div className="flex flex-col gap-10 p-[100px]">
      <form className=" bg-red-50 flex gap-4 w-[600px]" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            id="username"
            className="bg-red-300 rounded-[5px] w-1/3 h-10"
            type="text"
          />
        </label>
        <input
          // onClick={setList(list)}
          type="submit"
          value="submit"
          className="bg-blue-300 w-1/3 h-10"
        />
      </form>
      <div className=" bg-green-200 h-[400px] w-[600px] flex flex-col gap-5">
        end l fetch hiisnee haruulnadaa
        <div className="flex flex-col gap-5">
          {list.datas.user.map((a, id) => {
            return (
              <div key={id} className="bg-orange-100 flex gap-5">
                <p className="bg-blue-200">name: {a.name}</p>
                {/* <input className="bg-blue-200">delete</input> */}
                <form className="flex gap-5">
                  <input
                    onClick={handleDelete}
                    className="bg-blue-200"
                    value="delete"
                    type="button"
                    // name={newId}
                  />
                  <input
                    onClick={handleUpdate}
                    className="bg-blue-200"
                    value="edit"
                    type="submit"
                  />
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  //////////
  const response = await fetch("http://localhost:3001/users");
  const datas = await response.json();
  // console.log("data: ", datas);

  // ////////

  // ///////
  return {
    props: { datas },
  };
}
