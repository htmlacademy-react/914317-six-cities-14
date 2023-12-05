
type OfferGoodProps = {
  goods: [string];
}

function OfferGood({ goods }: OfferGoodProps): JSX.Element {

  function createId (){
    return Math.random();
  }

  return (
    <>
      {goods.map((item) => (
        <li key={createId()} className="offer__inside-item">{item}</li>
      ))}
    </>
  );
}

export default OfferGood;
