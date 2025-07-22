const Form = () => {
  return (
    <form className="flex flex-col md:flex-row gap-4">
      <input
        className="w-full lg:w-[20rem] p-2 border rounded border-gray-400"
        type="email"
        placeholder="Email address"
        name="email"
        id=""
      />
      <button className="text-white text-[0.9rem] bg-cyan-800 w-full lg:w-[10rem] p-2 border rounded hover:bg-cyan-700 transition-all duration-300 ease-in-out">
        SUBSCRIBE
      </button>
    </form>
  );
};

export default Form;
