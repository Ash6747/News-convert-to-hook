import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles : [],
            loading : true,
            pages : 1,
            page : 1
        };
    }
    async componentDidMount(){
      // console.log("cdm");
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=64ca58d2977c4b1ea84bd203d8185d06&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data  = await fetch(url);
      let parsedData = await data.json();
      let pages = Math.ceil(parsedData.totalResults / 20);
      // console.log(parsedData);
      this.setState({articles: parsedData.articles, pages, loading: false});
      
      // .then((data)=>{
      //     // console.log(data.json());
      //     let parsedData = data.json();
      //     console.log(parsedData.article);
          
      //     // this.setState(parsedData.article)
      // });
        
    }
    handlePage = async (page) =>{
      this.setState({loading:true});
      // console.log(this.state);
      
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=64ca58d2977c4b1ea84bd203d8185d06&page=${page}&pageSize=${this.props.pageSize}`;
      let data  = await fetch(url);
      let parsedData = await data.json();
      let pages = Math.ceil(parsedData.totalResults / 20);
      this.setState({articles: parsedData.articles, pages, page, loading: false});
      // console.log(this.state);
    }
  render() {
    
    return (
      <div className='container my-3'>
        <h2 className='text-center'>Top Headlines :</h2>
        {this.state.loading && <Loading/>}
        <div className="row">
            {this.state.articles?.map((element)=>{
                return(
                    <div className="col-md-3 my-3" key={element.url}>
                        <NewsItem 
                        title={element.title} 
                        description={element.description}
                        urlToImage={element.urlToImage}
                        />
                    </div>);
                    
            })}

            <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} onClick={()=>{this.handlePage(this.state.page-1)}} className="btn btn-dark">&larr; Previous</button>
            <button type="button" disabled={this.state.pages <= this.state.page} onClick={()=>{this.handlePage(this.state.page+1)}} className="btn btn-dark">Next &rarr;</button>
            </div>
            
        </div>
      </div>
    )
  }
}

export default News
