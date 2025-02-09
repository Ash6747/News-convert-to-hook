import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let image = "https://media.istockphoto.com/id/929047972/vector/world-news-flat-vector-icon-news-symbol-logo-illustration-business-concept-simple-flat.jpg?s=2048x2048&w=is&k=20&c=GlanUklo3y2edb_Di1DDEyETSW6GIhZEDBk-G_IcbPU=";
    let {title, description, urlToImage, item} = this.props;
    return (
      <>
        <div className="card" >
                  <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                    {item.source.name ?? "Third Party"}
                  </span>
            <img src={urlToImage ?? image } className="card-img-top" alt="News visual"/>
            <div className="card-body">
                <h5 className="card-title">{title}
                </h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">News by {item.author ?? 'Unknown'} on {new Date(item.publishedAt).toGMTString()}</small></p>
                <a href={this.props.url} target='_blank' rel="noreferrer" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </>
    )
  }
}

export default NewsItem
