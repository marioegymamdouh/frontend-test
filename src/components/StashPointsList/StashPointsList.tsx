import React, {useEffect, useState} from 'react';
import * as Data from './../../Data'
import {Stashpoints} from '../../Data';
import StashPoint from '../StashPoint/StashPoint';
import styles from './StashPointsList.module.css'
import {DraftCart} from '../../Data';
import Loading from '../Loading/Loading';

interface IStashPointsListProps {
  selectedStashPointId: DraftCart['stashpointId'],
  stashPointIdChangeHandler: (id: DraftCart['stashpointId']) => void
}
type SortType = "default" | "rating" | "bagPerDayPrice";

const StashPointsList = ({
  selectedStashPointId,
  stashPointIdChangeHandler
}: IStashPointsListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stashPoints, setStashPoints] = useState<Stashpoints>([]);
  const [sortedStashPoints, setSortedStashPoints] = useState<Stashpoints>([]);
  const [sortType, setSortType] = useState<SortType>("default");

  useEffect(() => {
    fetchStashPoints().then((stashPoints: Stashpoints) => {
      setStashPoints(stashPoints);
    })
  }, []);
  useEffect(() => {
    const tempSortedStashPoints = [...stashPoints];
    switch (sortType) {
      case "bagPerDayPrice":
        tempSortedStashPoints.sort(
          (a, b) =>
            Number(Data.Price.encode(b.bagPerDayPrice)) - Number(Data.Price.encode(a.bagPerDayPrice))
        );
        break;
      case "rating":
        tempSortedStashPoints.sort((a, b) => b.rating - a.rating);
        break;
      case "default":
      default:
    }
    setSortedStashPoints(tempSortedStashPoints);
  }, [stashPoints, sortType]);

  const fetchStashPoints = async (): Promise<Stashpoints> => {
    setIsLoading(true);
    const response = await fetch('/api/stashpoints');
    const formattedResponse = await response.json();
    const [errors, stashPoints] = Data.Stashpoints.decode(formattedResponse);
    setIsLoading(false);
    if (errors) {
      alert(errors);
      return [];
    }
    return stashPoints;
  };

  if (isLoading) return <Loading />

  return (
    <div>
      <select
        className={styles.sort}
        value={sortType}
        onChange={(e) => setSortType(e.target.value as SortType)}
      >
        <option value='default'>Default</option>
        <option value='rating'>Rating</option>
        <option value='bagPerDayPrice'>Bag Per Day Price</option>
      </select>
      <ul className={styles.stashPointsList}>
        {
          sortedStashPoints.map(stashPoint =>
            <StashPoint
              key={stashPoint.id}
              stashPoint={stashPoint}
              selected={selectedStashPointId === stashPoint.id}
              clickHandler={() => stashPointIdChangeHandler(stashPoint.id)}
            />
          )
        }
      </ul>
    </div>
  )
}

export default StashPointsList;