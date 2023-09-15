import Buttons from "./Buttons";
import { useGlobalContex } from "./ContextProvider";

function Article() {
  const { state, handeleRemove } = useGlobalContex();
  return (
    <>
      <div className="main">
        {state.isLoading ? (
          <div className="loader"></div>
        ) : (
          state.data.map((hits) => {
            const { objectID, title, num_comments, url, points, author } = hits;
            return (
              <div className="article" key={objectID}>
                <h5>{title}</h5>
                <p>
                  {points} points by <span>{author} | </span> {num_comments}{" "}
                  comments
                </p>
                <a href={url}>Read More</a>
                <button
                  className="remove"
                  onClick={() => handeleRemove(objectID)}
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
        {!state.isLoading && <Buttons />}
      </div>
    </>
  );
}

export default Article;
