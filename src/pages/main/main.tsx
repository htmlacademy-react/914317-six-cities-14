import Main from '../../components/Main/Main';
import PageHeader from '../../components/PageHeader/pageHeader';

type MainProps = {
  cardsCount: number;
}

function MainPage({ cardsCount }: MainProps): JSX.Element {


  return (
    <div className="page page--gray page--main">
      <PageHeader/>
      <Main
        cardsCount={cardsCount}
      />
    </div>
  );
}

export default MainPage;
