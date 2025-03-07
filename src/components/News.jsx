import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Loading from "./Loading";

const News = (props) => {
  const articlesRef = useRef([]); // Holds articles without triggering re-renders
  // const [dataUpdated, setDataUpdated] = useState(false); // Controls re-renders for UI updates
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  // Fetch more data for infinite scroll
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      const parsedData = await fetch(url).then(res=> res.json())
                          .then(data => { return data; });
      // const parsedData = await data.json();
      const newArticles = parsedData.articles;

      // Update articles without triggering re-render
      articlesRef.current = [...articlesRef.current, ...newArticles];

      // Update state to reflect changes for UI updates
      setPages(Math.ceil(parsedData.totalResults / props.pageSize));
      setPage(nextPage);
      // setDataUpdated((prev) => !prev); // Toggle state to force UI re-render
    } catch (error) {
      console.error("Error fetching more data", error);
    }
  };

  // Fetch initial data when component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        const data = await fetch(url);
        props.setProgress(40);
        const parsedData = await data.json();
        props.setProgress(70);

        // Store articles in ref without triggering re-render
        articlesRef.current = parsedData.articles;
        setPages(Math.ceil(parsedData.totalResults / props.pageSize));
        props.setProgress(100);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <h2 className="text-center mt-2">Top Headlines:</h2>
      {loading && <Loading />}

      <InfiniteScroll
        dataLength={articlesRef.current.length} // Length of articles stored in ref
        next={fetchMoreData}
        hasMore={page < pages}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {pages !== 0 ? (
              articlesRef.current.map((element, index) => (
                <div className="col-md-3 my-3" key={index}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    urlToImage={element.urlToImage}
                    url={element.url}
                  />
                </div>
              ))
            ) : (
              <h2 className="text-center">
                <b>No Articles Found...!</b>
              </h2>
            )}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

// Default props for the News component
News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

// Prop type validation for News component
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func,
};

export default React.memo(News);
