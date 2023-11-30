import Offer from '../../components/Offer/Offer';
import { FullOffers, Comments,OffersInNeibourghood } from '../../types/offer';
import PageHeader from '../../components/PageHeader/pageHeader';

type OfferPageProps = {
  fullOffers: FullOffers;
  comments: Comments;
  offersInNeibourghood: OffersInNeibourghood;
}

function OfferPage({ fullOffers, comments, offersInNeibourghood }: OfferPageProps): JSX.Element {
  return (
    <div className="page">
      <PageHeader/>
      <Offer
        fullOffers={fullOffers}
        comments={comments}
        offersInNeibourghood = {offersInNeibourghood}
      />
    </div>

  );
}

export default OfferPage;
