const Form = () => {
  return (
    <form className="flex flex-col md:flex-row gap-4">
      <input
        className="p-4 w-[95vw] md:w-[20rem] border-[1px] border-gray-400"
        type="email"
        placeholder="Email address"
        name="email"
        id=""
      />
      <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
        SUBSCRIBE
      </button>
    </form>
  );
};

export default Form;
