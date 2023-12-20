import React, { useEffect, useState, useRef, useContext } from "react";
import NewsItem from "./NewsItem";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import { usePrevious, capitalize } from "../../utils";
import { countryContext } from "../../context/CountryContext";

const News = ({ pageSize = 5, category = "general", setProgress }) => {
  // State and refs initialization
  const [articles, setArticles] = useState([]);
  const prevArticles = usePrevious(articles);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [observer, setObserver] = useState(null);
  const page = useRef(1);
  const newsContainerRef = useRef(null);
  const { country } = useContext(countryContext);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL

  // Set document title based on the selected category
  document.title = `BREKKIN!  Stay Updated - ${capitalize(category)}`;

  // Function to construct API URL
  const getApiUrl = (pageOffset = 0) => {
    return `http://${SERVER_URL}?limit=${pageSize}&offset=${pageOffset * pageSize}&categories=${category}&countries=${country}`;
  };

  // Initial data loading effect
  useEffect(() => {
    const loadArticles = async () => {
      const url = getApiUrl();

      // Fetch data and handle loading state
      const data = await fetchData(url);
      if (data) data.length ? setArticles(data) : setAlert("No Data Found");

      // Update progress and loading state
      setProgress(100);
      setLoading(false);
    };

    // Check if country is selected before loading articles
    if (country) {
      setProgress(20);
      setLoading(true);
      setAlert(null);
      loadArticles();
      page.current = 1;
    }
  }, [country]);

  // Effect to handle Intersection Observer for lazy loading more articles
  useEffect(() => {
    if (articles.length && articles.length !== prevArticles.length) {
      if (observer !== null) {
        observer.disconnect();
      }
      initializeIntersectionObserver();
    }
  }, [articles, observer]);

  // Initialize Intersection Observer
  const initializeIntersectionObserver = () => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };
    setObserver(new IntersectionObserver(handleObserver, options));
  };

  // Effect to start observing the news container
  useEffect(() => {
    if (observer) observer.observe(newsContainerRef.current);
  }, [observer]);

  // Handle Intersection Observer callback
  const handleObserver = async (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && !loading) {
      setProgress(20);
      await fetchMoreNews();
      setProgress(100);
    }
  };

  // Fetch additional news articles
  const fetchMoreNews = async () => {
    if (alert) {
      return;
    }

    page.current = page.current + 1;
    const url = getApiUrl(page.current);
    setLoading(true);

    // Fetch data and append to existing articles
    const data = await fetchData(url);
    setArticles([...articles, ...data]);

    // Update loading state
    setLoading(false);
  };

  // Fetch data from the specified URL
  const fetchData = async (url) => {
    try {
      let response = await fetch(url);
      setProgress(50);

      // Handle errors and parse response data
      if (!response.ok) {
        setAlert("Something went wrong");
        return null;
      }

      let parsedData = await response.json();
      return parsedData.data || [];
    }
    catch (e) {
      setAlert(e.toString());
      return null;
    }
  };

  // Render component
  return (
    <div className="container flex-grow-1">
      <h2 className="text-center py-5 mt-5">
        Top {capitalize(category)} Headlines
      </h2>

      <section id="news-wrapper" className="d-flex flex-wrap gap-5 pb-1">
        {alert ? (
          // Render alert if present
          <p>{alert}</p>
        ) : (
          // Map through articles and render NewsItem components
          articles.map((news, index) => (
            <NewsItem
              key={news.title}
              title={news.title}
              description={news.description}
              url={news.image}
              newsUrl={news.url}
              author={news.author}
              publishedAt={news.published_at}
              source={news.source}
              // Set the reference for the last news item
              ref={index === articles.length - 1 ? newsContainerRef : null}
            />
          ))
        )}
      </section>

      {loading && <Spinner />}
    </div>
  );
};

// Prop types validation
News.propTypes = {
  country: PropTypes.array,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
