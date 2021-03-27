import { NavLink } from 'react-router-dom';

export function NotFound({status}) {
  if(status === 404) {
    return (
      <div>
        <p>Error 404: Síða finnst ekki</p>
        <NavLink to="/">Til baka</NavLink>
      </div>
    
    )
  } else {
      return (
        <div>
          <p>Error 500: Mistókst að ná í efni</p>
          <NavLink to="/">Til baka</NavLink>
        </div>
      )
    }
  
}
