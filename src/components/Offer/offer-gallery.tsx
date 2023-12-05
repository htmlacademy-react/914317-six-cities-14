
type OfferGalleryProps = {
  images: [string];
}

function OfferGallery({ images }: OfferGalleryProps): JSX.Element {

  const imagesForPage = images.slice(0,6);

  function createId (){
    return Math.random();
  }

  return (
    <>
      {imagesForPage.map((item) => (
        <div key = {createId()} className="offer__image-wrapper">
          <img
            className="offer__image"
            src={`${item}`}
            alt="Photo studio"
          />
        </div>
      ))}
    </>
  );
}

export default OfferGallery;
