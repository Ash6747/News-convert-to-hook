import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      pages: 1,
      page: 1,
    };
  }
  async updateComponent() {
    console.log("cdm");
    try {
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=64ca58d2977c4b1ea84bd203d8185d06&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // this.setState({articles: [], loading:true});
      let data = await fetch(url);
      this.props.setProgress(40);
      let parsedData = await data.json();
      this.props.setProgress(70);
      let pages = Math.ceil(parsedData.totalResults / this.props.pageSize);
      // console.log(parsedData);
      this.props.setProgress(100);
      this.setState({ articles: parsedData.articles, pages, loading: false });
    } catch (error) {
      this.setState({ articles: [], loading: false });
      
    }
  }
  async componentDidMount() {
    this.updateComponent();
  }
  // handlePage = async (page) =>{
  //   this.setState({page});
  //   this.updateComponent();
  //   window.scrollTo(0, 0);
  // }

  fetchMoreData = async () => {
    try {
      this.setState({
        page: this.state.page + 1,
      });
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=64ca58d2977c4b1ea84bd203d8185d06&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      let pages = Math.ceil(parsedData.totalResults / this.props.pageSize);
      // console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        pages,
      });
    } catch (error) {
      this.setState({ articles: [] });
    }
  };
  render() {
    return (
      <>
        <h2 className="text-center">Top Headlines :</h2>
        {this.state.loading && <Loading/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.page < this.state.pages}
          loader={<Loading />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="container">
            <div className="row">
              {this.state.pages !== 0 ? (
                this.state.articles?.map((element) => {
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
                  <button type="button" disabled={this.state.page <= 1} onClick={()=>{this.handlePage(this.state.page-1)}} className="btn btn-dark">&larr; Previous</button>
                  <button type="button" disabled={this.state.pages <= this.state.page} onClick={()=>{this.handlePage(this.state.page+1)}} className="btn btn-dark">Next &rarr;</button>
                </div> */}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
