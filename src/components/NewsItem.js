import React from 'react'

const NewsItem = (props) => {
  let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
     <div>
        <div className="card my-2" style={{width: '18rem' }}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left: '90%', zIndex:'1'}}>{source}</span>
          <img src={!imageUrl ? "https://images.moneycontrol.com/static-mcnews/2021/07/Sensex-770x433.jpg" : imageUrl} className="img-thumbnail" style={{maxHeight: '150px' }} alt="..." />
          <div className="card-body">
              <h5 className="card-title" style={{ color: '#002B5B'}}>{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">by {author ? author : "Unknown"} on {new Date (date).toGMTString()} </small></p>
              <a href={newsUrl} target="blank" className="btn btn-sm btn-outline-danger">Read More...</a>
          </div>
        </div> 
      </div>
    )
  }

export default NewsItem;