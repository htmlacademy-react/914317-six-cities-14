import Offer from '../../components/offer/offer';
import PageHeader from '../../components/page-header/page-header';

function OfferPage(): JSX.Element {

  return (
    <div className="page">
      <PageHeader/>
      <Offer/>
    </div>

  );
}

export default OfferPage;
