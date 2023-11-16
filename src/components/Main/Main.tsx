import OfferList from '../../components/OfferList/OfferList';
import MapProxy from '../../components/Map/MapProxy';
import { useState } from 'react';
import Locations from '../../components/Locations/Locations';
import { useAppDispatch, useAppSelector } from '../Hooks/index';
import { changeCity } from '../../store/action';

type MainProps = {
  cardsCount: number;
}

function Main({ cardsCount }: MainProps): JSX.Element {

  const dispatch = useAppDispatch();

  const filtredOffers = useAppSelector((state) => state.filtredOffers);

  const [hoveredOfferId, setHoveredOfferId] = useState('');

  const handleItemHover = (currentId: string) => {
    setHoveredOfferId(currentId);
  };

  const handleLocationClick = (currentLocation: string) => {
    dispatch(changeCity(currentLocation));
  };

  function getClassByIsOffersEmpty(isOffersEmpty: boolean) {
    switch (isOffersEmpty) {
      case false:
        return {
          divClass: '',

        };
      case true:
        return {
          divClass: 'page__main--index-empty',
        };
    }
  }

  function getMarkupByIsOffersEmpty(isOffersEmpty: boolean) {
    switch (isOffersEmpty) {
      case true: {
        return (
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        );
      }
      case false: {
        return (
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList
                cardsCount={cardsCount}
                listOffers={filtredOffers}
                isNeibourgh={false}
                onItemHover={handleItemHover}
              />
            </section>
            <div className="cities__right-section">
              <MapProxy
                listOffers={filtredOffers}
                hoveredOfferId={hoveredOfferId}
                className='cities__map'
              />
            </div>
          </div>
        );
      }
    }
  }
  const className = getClassByIsOffersEmpty(filtredOffers.length === 0);

  return (
    <main className={`page__main page__main--index ${className.divClass}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <Locations
              onClick={handleLocationClick}
            />
          </ul>
        </section>
      </div>
      <div className="cities">
        {getMarkupByIsOffersEmpty(filtredOffers.length === 0)}
      </div>
    </main>
  );
}

export default Main;
