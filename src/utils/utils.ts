import {ListOffers, City} from '../types/offer';

function filterOffersByCity(city : City,offers: ListOffers){
  return offers.filter((item)=>item.city.name === city);
}

export {filterOffersByCity};
