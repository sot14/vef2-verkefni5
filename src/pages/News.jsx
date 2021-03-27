import React from 'react';
import { useParams } from 'react-router';
import News from '../components/news/News';

export function NewsPage() {
  const category = useParams().id;
  console.log(category);
  return ( 
    <News category={category} showAll={true}></News>
  )
  
}