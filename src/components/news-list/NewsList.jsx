import React, { useEffect, useState } from 'react';
import News from '../news/News';
import { NotFound } from '../../pages/NotFound';
import './NewsList.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  

  useEffect(() => {
    let newsData;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetch(`${apiUrl}`);
        newsData = await result.json();

        if(result.status === 404) setStatus(404)
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
  }, []);

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

  console.log('data for categories', data);
  const categories = data || [];
  return (
    <section className="news">
    { categories.length > 0 && categories.map((category, i) => {
      return (
        <News key={i} category={category.id}></News>
      )
    })}
    </section>
    
  )
  
}
