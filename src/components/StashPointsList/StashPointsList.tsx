import React, {useEffect, useState} from 'react';
import * as Data from './../../Data'
import {Stashpoints} from '../../Data';
import StashPoint from '../StashPoint/StashPoint';
import styles from './StashPointsList.module.css'
import {DraftCart} from '../../Data';
import Loading from "../Loading/Loading";

interface IStashPointsListProps {
  selectedStashPointId: DraftCart['stashpointId'],
  stashPointIdChangeHandler: (id: DraftCart['stashpointId']) => void
}

const StashPointsList = ({
  selectedStashPointId,
  stashPointIdChangeHandler
}: IStashPointsListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stashPoints, setStashPoints] = useState<Stashpoints>([]);

  useEffect(() => {
    fetchStashPoints().then((stashPoints: Stashpoints) => {
      setStashPoints(stashPoints);
    })
  }, []);

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
      <ul className={styles.stashPointsList}>
        {
          stashPoints.map(stashPoint =>
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