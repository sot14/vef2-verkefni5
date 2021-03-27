import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';
import './News.scss';
//import fetch from 'node-fetch';

const apiUrl = process.env.REACT_APP_API_URL;


export default function News({category, showAll}) {
  // TODO sækja fréttir fyrir flokk
  console.log(category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  

  useEffect(() => {
    console.log('fetching news for category', category);
    let newsData;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetch(`${apiUrl}${category}`);

        if(result.status === 404) setStatus(404);
        newsData = await result.json();
      } catch(e) {
        setError('villa við að sækja fréttir');
        return;
      } finally {
        setLoading(false);
      }

      setData(newsData);
    }
    console.log('fetch data');
    fetchData();
  }, [category]);

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  if(status === 404) {
    return (
      <NotFound></NotFound>
    )
  }
  
  console.log(data);
  let title = '';
  const articles = [];
  if(data) {
    title = data.title;
    const news = (data && data.items) || [];
    if(showAll) {
      for (let i = 0; i < news.length; i++) {
        const articleTitle = news[i].title;
        const articleLink = news[i].link;
        articles.push(<li key={i}><a href={articleLink}>{articleTitle}</a></li>);
      }
    }
    else {
      for (let i = 0; i < 5; i++) {
        const articleTitle = news[i].title;
        const articleLink = news[i].link;
        articles.push(<li key={i}><a href={articleLink}>{articleTitle}</a></li>);
      }
    }
    
  }
  return (
    <div className="newsCategory">
      <h3>{title}</h3>
      <ul className="newsItems">
        {articles}
      </ul>
      {showAll === true && (
        <p><NavLink to="/" className="bottomLink"><strong>Til baka</strong></NavLink></p>
      )}
      {!showAll && (
        <p><NavLink to={`/${category}`} className="bottomLink"><strong>Allar fréttir</strong></NavLink></p>
      )}
      
    </div>
    
    
  )
}