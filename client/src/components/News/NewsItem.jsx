import React, { forwardRef } from "react";

const NewsItem = forwardRef(({ title, description, url, newsUrl, author, publishedAt, source }, ref) => {

  let date = new Date(publishedAt);
  let timeDiff = new Date() - date;
  let timeDiffInHours = timeDiff / (3600 * 1000);
  let timeDiffInDays = timeDiff / (3600 * 1000 * 24);
  let formattedDate = "";

  if (timeDiffInHours < 24) {
    formattedDate = `${timeDiffInHours.toFixed(0)} hours ago`;
  } else {
    if (timeDiffInDays < 2) {
      formattedDate = "Yesterday";
    } else if (timeDiffInDays >= 2 && timeDiffInDays < 5) {
      formattedDate = `${timeDiffInDays} days ago`;
    } else {
      formattedDate = date.toDateString();
    }
  }

  return (
    <div className="card" style={{ width: "30%" }} ref={ref}>
      <span className="position-absolute top-0 end-0 translate-middle-y badge rounded-pill bg-danger">
        {source}
      </span>
      <a href={newsUrl}>
        <img
          src={
            url ??
            "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"
          }
          className="card-img-top"
          alt="..."
        />
      </a>
      <div className="card-body">
        <h5 className="card-title">{title ?? "No Title"}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-body-secondary">
            By {author ?? "unknown"}, {formattedDate}
          </small>
        </p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-primary"
        >
          Read More
        </a>
      </div>
    </div>
  );
});

export default NewsItem;
