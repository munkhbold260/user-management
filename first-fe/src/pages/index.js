export default function Home({ datas }) {
  const be_url = "http://localhost:3001/add-user";
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { name: e.target.username.value };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    console.log("data", data);
    const fetched_data = await fetch(be_url, options);
    const fetched_json = await fetched_data.text();
    // console.log("123123", fetched_data);
    // console.log(fetched_data);
  }
  async function handleDelete(b) {
    const options = { method: "DELETE" };
  }

  return (
    <div className="flex flex-col gap-10 p-[100px]">
      <form className=" bg-red-50 flex gap-4 w-[600px]" onSubmit={handleSubmit}>
        <label for="name">
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
          {datas.user.map((a) => {
            return (
              <div className="bg-orange-100 flex gap-5">
                <p className="bg-blue-200">name:{a.name}</p>
                {/* <input className="bg-blue-200">delete</input> */}
                <input className="bg-blue-200" value="delete" />
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
  console.log("data: ", datas);

  // ////////

  // ///////
  return {
    props: { datas },
  };
}
