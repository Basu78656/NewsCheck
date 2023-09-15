import { useGlobalContex } from "./ContextProvider";

const Buttons = () => {
  const { isLoading, state, handlePage } = useGlobalContex();

  return (
    <div className="btn-container">
      <button disabled={isLoading} onClick={() => handlePage("dec")}>
        prev
      </button>
      <p>
        {state.page + 1} of {+state.nbPages}
      </p>
      <button disabled={isLoading} onClick={() => handlePage("inc")}>
        next
      </button>
    </div>
  );
};

export default Buttons;
