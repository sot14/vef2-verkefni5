import { NavLink } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <p>Error 404: Síða finnst ekki</p>
      <NavLink to="/">Til baka</NavLink>
    </div>
    
  )
  
}
