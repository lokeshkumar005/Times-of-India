import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
// import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const capitalizeLetter = (string) => {
    return string.toUpperCase();
  };

  const setProgress = (progress) => {
    if (page === 1) {
      props.setProgress(progress);
    }
  };

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5fd453896f904a79bca71c70488879c8&page=${page}&pagesize=${props.pageSize}`;
    const data = await fetch(url);
    setProgress(30);
    const parsedData = await data.json();
    setProgress(70);
    if (parsedData.articles?.length > 0) {
      setArticles((currentArticles) =>
        currentArticles.concat(parsedData.articles)
      );
      setTotalResults(parsedData.totalResults);
    }
    setLoading(false);
    setProgress(100);
  };

  useEffect(() => {
    // eslint-disable-next-line
    document.title = `${capitalizeFirstLetter(props.category)} - TOI`;
    // eslint-disable-next-line
    updateNews();
    // eslint-disable-next-line
  }, [page]);

  const fetchMoreData = async () => {
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "80px" }}>
        Times Of India{" "}
        <span className="badge bg-danger">
          Top Headlines | {capitalizeLetter(props.category)}
        </span>
      </h1>
      {loading && <Spinner />}
      {/* {!loading || <Spinner />}
      {loading ? <Spinner /> : <></>}
      {loading ? <Spinner /> : null} */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-3">
            {articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ?? ""} // null, undefined
                    description={element.description ?? ""}
                    // title={element ? element.title.slice(0, 30) : ""}
                    // description={element ? element.description.slice(0, 90) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

// News.defaultProps = {
//   country: "in",
//   pageSize: 12,
//   category: "general",
// };
// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// };

export default News;
