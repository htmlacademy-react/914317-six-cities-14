import PageHeaderNavigation from '../PageHeaderNavigation/pageHeaderNavigation';
import { Link } from 'react-router-dom';

function PageHeader(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="main.html">
              <Link to={'/'} >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </a>
          </div>
          <PageHeaderNavigation />
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
