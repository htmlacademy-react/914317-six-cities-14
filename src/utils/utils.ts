import { ListOffers, City } from '../types/offer';

function filterOffersByCity(city: City, offers: ListOffers) {
  return offers.filter((item) => item.city.name === city);
}

function sortOffers(id: number, offers: ListOffers, startStateFiltredOffers: ListOffers) {

  switch (id) {
    case 1:
      return startStateFiltredOffers;
    case 2:
      return offers.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
    case 3:
      return offers.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
    case 4:
      return offers.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
    default: return offers;
  }

}


export { filterOffersByCity, sortOffers };
