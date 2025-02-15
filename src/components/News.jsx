import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [ articles, setArticles ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ pages, setPages ] = useState(1);
  const [ page, setPage ] = useState(1);

  const updateComponent = async() => {
    console.log(props.apiKey_1);
    try {
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      // this.setState({articles: [], loading:true});
      let data = await fetch(url);
      props.setProgress(40);
      let parsedData = await data.json();
      props.setProgress(70);
      let pages = Math.ceil(parsedData.totalResults / props.pageSize);
      console.log(parsedData);
      props.setProgress(100);

      setLoading(false);
      setArticles([...parsedData.articles]);
      setPages(pages);
      // this.setState({ articles: parsedData.articles, pages, loading: false });
    } catch (error) {
      // this.setState({ articles: [], loading: false });
      console.log("Error in update");
    }
  }

  const fetchMoreData = async () => {
    try {
      const nextPage = page+1;
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      let pages = Math.ceil(parsedData.totalResults / props.pageSize);
      // console.log(parsedData);
      setArticles([...articles, ...parsedData.articles]);
      setPages(pages);
      setPage(nextPage);
    } catch (error) {
      // this.setState({ articles: [] });
    }
  };
  
  useEffect(() => {
    updateComponent();
  }, []);

  return (
    <>
      <h2 className="text-center">Top Headlines :</h2>
      {loading && <Loading/>}

      <InfiniteScroll
        dataLength={articles.length}
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
              articles?.map((element) => {
                return (
                  <div className="col-md-3 my-3" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      urlToImage={element.urlToImage}
                      item={element}
                      url={element.url}
                    />
                  </div>
                );
              })
            ) : (
              <h2 className="text-center">
                <b>No Articles Found...!</b>
              </h2>
            )}

            {/* <div className="container d-flex justify-content-between">
                <button type="button" disabled={page <= 1} onClick={()=>{this.handlePage(page-1)}} className="btn btn-dark">&larr; Previous</button>
                <button type="button" disabled={pages <= page} onClick={()=>{this.handlePage(page+1)}} className="btn btn-dark">Next &rarr;</button>
              </div> */}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey_1: PropTypes.string.isRequired,
}

export default News;
