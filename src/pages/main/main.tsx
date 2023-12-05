import Main from '../../components/Main/main';
import PageHeader from '../../components/PageHeader/page-header';

function MainPage(): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <PageHeader/>
      <Main />
    </div>
  );
}

export default MainPage;
