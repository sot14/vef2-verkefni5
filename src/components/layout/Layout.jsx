
import React from 'react';
import './Layout.scss';

export function Layout({ children, title }) {
  return (
    <body>
      <main>
        <h2 className="title">{title}</h2>
        { children }
      </main>
      <hr></hr>
      <footer>
        <p>Fréttir frá <a href="www.ruv.is">RÚV</a></p>
      </footer>
    </body>
   
  )
}
