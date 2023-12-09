import { ListOffers} from '../types/offer';
import { locations } from '../const';

function filterOffersByCity(city: string, offers: ListOffers) {
  return offers.filter((item) => item.city.name === city);
}

function sortOffers(id: number, offers: ListOffers) {

  const offersToSort = offers.slice();

  switch (id) {
    case 1:
      return offersToSort;
    case 2:
      return offersToSort.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
    case 3:
      return offersToSort.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
    case 4:
      return offersToSort.sort((firstItem, secondItem) => secondItem.rating - firstItem.rating);
    default: return offersToSort;
  }

}

function findCity(city: string){
  return locations.filter((item) => item.name === city)[0];
}


export { filterOffersByCity, sortOffers, findCity };
