import React from "react";
import PropTypes from "prop-types";

const NewsItem = ({ title, description, urlToImage, url, item }) => {
  return (
    <div className="card">
      <img
        src={urlToImage || "https://via.placeholder.com/150"} // Default placeholder image if urlToImage is missing
        className="card-img-top"
        alt="News Thumbnail"
      />
      <div className="card-body">
        <h5 className="card-title">{title || "No Title Available"}</h5>
        <p className="card-text">{description || "No Description Available"}</p>
        <p className="card-text">
          <small className="text-muted">
            {item?.source?.name || "Unknown Source"} {/* Handle missing source */}
          </small>
        </p>
        <a href={url} className="btn btn-primary" target="_blank" rel="noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  urlToImage: PropTypes.string,
  url: PropTypes.string,
  item: PropTypes.object.isRequired,
};

export default NewsItem;
