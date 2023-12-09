import Main from '../../components/main/main';
import PageHeader from '../../components/page-header/page-header';

function MainPage(): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <PageHeader/>
      <Main />
    </div>
  );
}

export default MainPage;
