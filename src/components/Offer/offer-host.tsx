
type OfferHostProps = {
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
}

function OfferHost({ host }: OfferHostProps): JSX.Element {

  function getMarkupStatusByisPro(isPro: boolean) {

    switch (isPro) {
      case true:
        return (<span className="offer__user-status">Pro</span>);
      case false: return '';
    }

  }

  function getMarkupHeadByisPro(isPro: boolean) {

    switch (isPro) {
      case true:
        return ('offer__avatar-wrapper--pro');
      case false: return '';
    }

  }

  return (
    <div className="offer__host-user user">
      <div className={`offer__avatar-wrapper ${getMarkupHeadByisPro(host.isPro)} user__avatar-wrapper`}>
        <img
          className="offer__avatar user__avatar"
          src={`${host.avatarUrl}`}
          width={74}
          height={74}
          alt="Host avatar"
        />
      </div>
      <span className="offer__user-name">{`${host.name}`}</span>
      {getMarkupStatusByisPro(host.isPro)}
    </div>
  );
}

export default OfferHost;
