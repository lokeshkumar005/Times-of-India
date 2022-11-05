import React, {useState, useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const capitalizeLetter = (string) => {
    return string.toUpperCase();
  }
  

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?${props.country}&category=${props.category}&apiKey=5fd453896f904a79bca71c70488879c8&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

    useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - TOI`;
      updateNews();
    }, [])

  const fetchMoreData = async() =>{
    const url = `https://newsapi.org/v2/top-headlines?${props.country}&category=${props.category}&apiKey=5fd453896f904a79bca71c70488879c8&page=${page+1}&pagesize=${props.pageSize}`;
    
    setPage(page +1)
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults); 
  }
    return (
      <>
        <h1 className="text-center" style={{marginTop: "80px"}}>
          Times Of India <span className="badge bg-danger">Top Headlines | {capitalizeLetter(props.category)}</span>
        </h1>
        {loading && <Spinner />}

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
                    title={element.title?element.title:""}
                    description={element.description?element.description:""}
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
}

// News.defaultProps = {
//   country: "in",
//   pageSize: 12,
//   category:'general' 
// };
// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string
// };


export default News;
