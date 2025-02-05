import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let image = "https://media.istockphoto.com/id/929047972/vector/world-news-flat-vector-icon-news-symbol-logo-illustration-business-concept-simple-flat.jpg?s=2048x2048&w=is&k=20&c=GlanUklo3y2edb_Di1DDEyETSW6GIhZEDBk-G_IcbPU=";
    let {title, description, urlToImage} = this.props;
    return (
      <>
        <div className="card" style={{width: "18rem"}}>
            <img src={urlToImage ?? image } className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </>
    )
  }
}

export default NewsItem
