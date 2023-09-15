import { createContext, useContext, useEffect, useReducer } from "react";

const NewsContext = createContext();
const BASE_URL = "https://hn.algolia.com/api/v1/search?";
const initialState = {
  data: [],
  isLoading: true,
  query: "REACT",
  error: "",
  page: 0,
  nbPages: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "SET_DATA":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        nbPages: action.payload.nbPages,
      };
    case "HANDEL_SEARCH":
      return { ...state, query: action.payload, page: 0 };
    case "HANDEL_REMOVE":
      return {
        ...state,
        data: state.data.filter((news) => news.objectID !== action.payload),
      };
    case "HANDLE_PAGE":
      if (action.payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      }
      if (action.payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }
    default:
      throw new Error(`no mathching "${action.type}" action type`);
  }
}
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  async function fetchNews(url) {
    try {
      dispatch({ type: "SET_LOADING" });
      const res = await fetch(url);
      const data = await res.json();
      dispatch({
        type: "SET_DATA",
        payload: { data: data.hits, nbPages: data.nbPages },
      });
      console.log(state.data);
    } catch (err) {
      console.log(err);
    }
  }
  function handeleRemove(id) {
    dispatch({ type: "HANDEL_REMOVE", payload: id });
  }
  function handelSearch(query) {
    dispatch({ type: "HANDEL_SEARCH", payload: query.toUpperCase() });
  }
  const handlePage = (value) => {
    dispatch({ type: "HANDLE_PAGE", payload: value });
  };
  useEffect(
    function () {
      fetchNews(`${BASE_URL}query=${state.query}&page=${state.page}`);
    },
    [state.query, state.page]
  );
  return (
    <NewsContext.Provider
      value={{ state, handeleRemove, handelSearch, handlePage }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export const useGlobalContex = () => {
  return useContext(NewsContext);
};
export { AppProvider, NewsContext };
