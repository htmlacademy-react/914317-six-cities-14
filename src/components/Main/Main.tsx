import OfferList from '../../components/offer-list/offer-list';
import MapProxy from '../../components/map/map-proxy';
import { useState } from 'react';
import Locations from '../../components/locations/locations';
import SortVariants from '../../components/sort-variants/sort-variants';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import { changeCity, changeSort } from '../../store/action';
import { filterOffersByCity } from '../../utils/utils';


function Main(): JSX.Element {

  const dispatch = useAppDispatch();

  const sortedOffers = useAppSelector((state) => filterOffersByCity(state.city.name,state.filtredOffers));
  const currentCity = useAppSelector((state) => state.city);

  const currentCityname = currentCity.name;

  const [hoveredOfferId, setHoveredOfferId] = useState('');
  const [isHovered, setHoveredSort] = useState(false);


  const onHandleSortHover = (isHover: boolean) => {
    setHoveredSort(isHover);
  };

  const onHandleItemHover = (currentId: string) => {
    setHoveredOfferId(currentId);
  };

  const onHandleLocationClick = (currentLocation: string) => {
    dispatch(changeCity(currentLocation));
  };

  const onHandleSortClick = (currentId: number) => {
    dispatch(changeSort(currentId));
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

  function getPlaceByOffers(placesCount: number) {
    switch (placesCount > 1) {
      case false:
        return (
          'place'
        );
      case true:
        return ('places');
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
              <b className="places__found">{`${sortedOffers.length} ${getPlaceByOffers(sortedOffers.length)} to stay in ${currentCityname}`}</b>
              <SortVariants
                onItemHover={onHandleSortHover}
                onClick={onHandleSortClick}
                isHovered = {isHovered}
              />
              <OfferList
                listOffers={sortedOffers}
                isNeibourgh={false}
                onItemHover={onHandleItemHover}
              />
            </section>
            <div className="cities__right-section">
              <MapProxy
                listOffers={sortedOffers}
                hoveredOfferId={hoveredOfferId}
                className='cities__map'
              />
            </div>
          </div>
        );
      }
    }
  }
  const className = getClassByIsOffersEmpty(sortedOffers.length === 0);

  return (
    <main className={`page__main page__main--index ${className.divClass}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <Locations
              onClick={onHandleLocationClick}
            />
          </ul>
        </section>
      </div>
      <div className="cities">
        {getMarkupByIsOffersEmpty(sortedOffers.length === 0)}
      </div>
    </main>
  );
}

export default Main;
