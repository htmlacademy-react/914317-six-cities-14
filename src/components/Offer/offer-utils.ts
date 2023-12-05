import { ListOffers, OffersInNeibourghood } from '../../types/offer';

function getDateForMarkup(stringDate: string) {
  const currentDate = new Date(stringDate);
  const formatter = Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const formattedDate = formatter.formatToParts(currentDate);

  const year = formattedDate[4].value;
  const month = formattedDate[0].value;
  const day = formattedDate[2].value;

  return `${year}-${month}-${day}`;
}

function getDateForComment(stringDate: string) {
  const currentDate = new Date(stringDate);
  const formatter = Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
  });
  const formattedDate = formatter.formatToParts(currentDate);

  const year = formattedDate[2].value;
  const month = formattedDate[0].value;

  return `${month} ${year}`;
}


function sortComments(dateA: string, dateB: string){
  const convertedDateA = new Date(dateA).valueOf();
  const convertedDateB = new Date(dateB).valueOf();
  return convertedDateB - convertedDateA;
}

function addCurrentOffer(offersForAdd: OffersInNeibourghood, allOffers:ListOffers, offerForAddId: string){

  const offersForMarkup = offersForAdd.slice(0,3);
  const findedOffer = allOffers.filter((item) => item.id === offerForAddId);
  const offersForMarkupConcat = offersForMarkup.concat(findedOffer);

  return offersForMarkupConcat;
}


export {getDateForMarkup,getDateForComment,sortComments, addCurrentOffer};
