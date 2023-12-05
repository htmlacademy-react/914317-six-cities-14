import { locations } from '../../mocks/locations';
import { MouseEvent } from 'react';
import { useAppSelector } from '../Hooks/index';

type LocationProps = {
  onClick: (currentLocation: string) => void;
}

function getClassByCurrentLocation(stateLocation: string, currentItem : string) {
  switch (stateLocation) {
    case currentItem:
      return 'tabs__item--active';
    default:
      return '';
  }
}
function Locations({onClick}:LocationProps): JSX.Element {

  const currentCity = useAppSelector((state) => state.city);
  const currentCityName = currentCity.name;

  return (
    <>
      {locations.map((item) => (
        <li key={item.name} className="locations__item"
          onClick ={(evt: MouseEvent<HTMLLIElement>) => {
            evt.preventDefault();
            onClick(evt.target.outerText);
          }}
        >
          <a className={`locations__item-link tabs__item ${getClassByCurrentLocation(currentCityName,item.name)}`} href="#">
            <span>{item.name}</span>
          </a>
        </li>
      ))}
    </>
  );

}

export default Locations;
