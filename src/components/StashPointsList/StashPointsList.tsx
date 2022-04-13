import React, {useEffect, useState} from "react";
import * as Data from './../../Data'
import {Stashpoints} from "../../Data";
import StashPoint from "../StashPoint/StashPoint";
import styles from "./StashPointsList.module.css"
import {DraftCart} from "../../Data";

interface IStashPointsListProps {
  cart: DraftCart,
  setCart: React.Dispatch<React.SetStateAction<Data.DraftCart>>
}

const StashPointsList = ({
  cart,
  setCart
}: IStashPointsListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stashPoints, setStashPoints] = useState<Stashpoints>([]);

  useEffect(() => {
    fetchStashPoints().then((stashPoints) => {
      setStashPoints(stashPoints);
      setIsLoading(false);
    })
  }, []);

  const fetchStashPoints = async () => {
    setIsLoading(true);
    const response = await fetch('/api/stashpoints');
    const formattedResponse = await response.json();
    const [errors, stashPoints] = Data.Stashpoints.decode(formattedResponse);
    if (errors) {
      alert(errors);
      return [];
    }
    return stashPoints;
  };

  const stashPointClickHandler = (id: DraftCart["stashPointId"]) => {
    setCart(oldState => ({
      ...oldState,
      stashPointId: id
    }))
  };

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <ul className={styles.stashPointsList}>
        {
          stashPoints.map(stashPoint =>
            <StashPoint
              key={stashPoint.id}
              stashPoint={stashPoint}
              selected={cart.stashPointId === stashPoint.id}
              clickHandler={() => stashPointClickHandler(stashPoint.id)}
            />
          )
        }
      </ul>
    </div>
  )
}

export default StashPointsList;