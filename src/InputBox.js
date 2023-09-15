import { useGlobalContex } from "./ContextProvider";

function InputBox() {
  const { query, handelSearch } = useGlobalContex();
  return (
    <>
      <div className="search">
        <input
          value={query}
          onChange={(e) => handelSearch(e.target.value)}
          type="text"
        />
      </div>
    </>
  );
}

export default InputBox;
