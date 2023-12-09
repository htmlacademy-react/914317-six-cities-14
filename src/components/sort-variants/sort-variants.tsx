import { sortVariants } from '../../const';
import { useAppSelector } from '../hooks';

type SortVariantsProps = {
  onItemHover: (isHover: boolean) => void;
  onClick: (currentId: number) => void;
  isHovered: boolean;
}

function SortVariants({ onItemHover, onClick, isHovered }: SortVariantsProps): JSX.Element {

  const currentSort = useAppSelector((state)=> state.currentSort);

  function getSortName(){
    const sortName = sortVariants.filter((item)=> item.id === currentSort);
    return sortName[0].name;
  }

  function getClassByIsHovered(isHover: boolean) {
    switch (isHover) {
      case false:
        return '';
      case true:
        return 'places__options--opened';
    }
  }

  return (
    <form className="places__sorting" action="#" method="get"
      onMouseEnter={(evt) => {
        evt.preventDefault();
        onItemHover(true);
      }}
      onMouseLeave={(evt) => {
        evt.preventDefault();
        onItemHover(false);
      }}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {`${getSortName()}`}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${getClassByIsHovered(isHovered)}`}>
        {sortVariants.map((item) => (
          <li key={item.id} className="places__option places__option--active" tabIndex={0}
            onClick={(evt) => {
              evt.preventDefault();
              onClick(item.id);
            }}
          >{item.name}
          </li>
        ))}
      </ul>
    </form>
  );

}

export default SortVariants;
