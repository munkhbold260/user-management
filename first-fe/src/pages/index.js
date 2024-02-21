export default function Home() {
  const BE_URL = "http://localhost:3001/add-user";
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { username: e.target.username.value };
    console.log("userName:", data);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const fetched_data = await fetch(BE_URL, options);
    const fetched_json = await fetched_data.text();

    console.log(fetched_data);
  }

  return (
    <div className="flex flex-col gap-10 p-[100px]">
      <form className=" bg-red-50 flex gap-4 w-[600px]" onSubmit={handleSubmit}>
        <label for="username">
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
          value="submit"
          className="bg-blue-300 w-1/3 h-10"
        />
      </form>
      <div className=" bg-green-200 h-[400px] w-[600px] flex flex-col gap-5">
        end l fetch hiisnee haruulnadaa
        <div className="flex flex-col gap-5">
          {/* {data.user.map((a) => {
            return (
              <div className="bg-orange-300">
                <p>name:{a.name}</p>
                <p>age:{a.age}</p>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   //////////
//   const response = await fetch("http://localhost:3001/users");
//   const data = await response.json();
//   console.log("data: ", data);

//   // ////////

//   // ///////
//   return {
//     props: { data },
//   };
// }
