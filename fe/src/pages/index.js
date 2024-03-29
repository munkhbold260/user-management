import { nanoid } from "nanoid";
// import { useState, useEffect } from "react";
import React from "react";

export default function Home() {
  // const [list, setList] = useState([]);

  // console.log("bdfjsdhbfkjhsdfkjgs", datas);
  // console.log("liiiist", list);
  const be_url = "http://localhost:4000/add-user";
  const del_url = "http://localhost:4000/delete-user";
  const get_url = "http://localhost:4000/user-get";

  async function handleSubmit(e) {
    e.preventDefault();
    const newId = nanoid();
    const data = {
      name: e.target.username.value,
      id: newId,
      age: e.target.age.value,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    console.log("data", data);
    const fetched_data = await fetch(be_url, options);
    const fetched_json = await fetched_data.json();

    // setList(fetched_json.users);

    // console.log("feeeetched json", fetched_json.users);
    // console.log("liiiiiiiiiist", list);
  }
  async function handleDelete(e) {
    e.preventDefault();
    console.log("working delete btn");
    const data = { name: e.target.username.value };
    console.log(data);
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const fetched_data = await fetch(del_url, options);
    const fetched_json = await fetched_data.json();
  }

  async function handleGet(e) {
    e.preventDefault();
    console.log("working get btn");
    // const data = { name: e.target.username.value };
    // console.log(data);
    // const options = {
    //   method: "GET",
    //   // headers: { "Content-Type": "application/json" },
    //   // body: JSON.stringify(data),
    // };

    await fetch(get_url);
    // const fetched_json = await fetched_data.json();
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
        <label>
          Age:
          <input
            name="name"
            id="age"
            className="bg-red-300 rounded-[5px] w-1/3 h-10"
            type="text"
          />
        </label>
        <input
          type="submit"
          value="submit"
          className="bg-blue-300 w-1/3 h-10"
        />{" "}
      </form>
      <form onSubmit={handleDelete}>
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
          type="submit"
          value="delete"
          className="bg-blue-300 w-[100px] h-10"
        />
      </form>
      <form onSubmit={handleGet}>
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
          type="submit"
          value="get"
          className="bg-blue-300 w-[100px] h-10"
        />
      </form>

      {/* <div className=" bg-green-200 h-[400px] w-[600px] flex flex-col gap-5">
        end l fetch hiisnee haruulnadaa
        <div className="flex flex-col gap-5">
          {list.map((a, id) => {
            return (
              <div key={id} className="bg-orange-100 flex gap-5">
                <p className="bg-blue-200">name: {a.name}</p>
                <form className="flex gap-5">
                  <input className="bg-blue-200" value="delete" type="button" />
                  <input className="bg-blue-200" value="edit" type="submit" />
                </form>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

// export async function getServerSideProps() {
//   //////////
//   const response = await fetch("http://localhost:4000/users");
//   const datas = await response.json();
//   // console.log("data: ", datas);

//   // ////////

//   // ///////
//   return {
//     props: { datas },
//   };
// }
