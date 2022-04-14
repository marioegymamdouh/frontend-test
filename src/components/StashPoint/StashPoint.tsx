import {Stashpoint} from '../../Data';
import styles from './StashPoint.module.css';
import {getPriceString} from '../../util/getPriceString';

interface IStashPointProps {
  stashPoint: Stashpoint,
  selected?: boolean,
  clickHandler?: () => void
}

const StashPoint = ({
  stashPoint,
  selected,
  clickHandler
}: IStashPointProps) => {
  const liClasses = [
    styles.stashPoint,
    ...(selected ? [styles.selected] : [])
  ].join(' ')

  return (
    <li
      className={liClasses}
      onClick={clickHandler ? clickHandler : () => {}}
    >
      <span>
        <strong>Name: </strong>
        {stashPoint.name}
      </span>
      <span>
        <strong>Address: </strong>
        {stashPoint.address}
      </span>
      <span>
        <strong>Bag Per Day Price: </strong>
        {getPriceString(stashPoint)}
      </span>
      <span>
        <strong>Rating: </strong>
        {stashPoint.rating}
      </span>
    </li>
  )
};

export default StashPoint;