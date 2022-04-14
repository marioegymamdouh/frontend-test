import {useState} from 'react';
import {Booking, PriceQuote} from '../../Data';
import Loading from '../Loading/Loading';
import {getPriceString} from '../../util/getPriceString';
import styles from './PriceQuoteCTA.module.css';
import * as Data from './../../Data'

interface IPriceQuotePriceQuoteCTAProps {
  priceQuote: PriceQuote | undefined,
  isLoading: boolean
}

const PriceQuoteCTA = ({
  priceQuote,
  isLoading
}: IPriceQuotePriceQuoteCTAProps) => {
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingId, setBookingId] = useState<Booking['id']>();

  const payHandler = async () => {
    setIsBookingLoading(true);
    const booking = await fetchBooking(priceQuote);
    const payment = await fetchPayment(booking);
    if (payment && payment.id && booking) setBookingId(booking.id);
    setIsBookingLoading(false);
  };
  const fetchBooking = async (priceQuote: PriceQuote | undefined) => {
    if (!priceQuote) return;
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(Data.PriceQuote.encode(priceQuote))
    });
    const formattedResponse = await response.json();
    const [errors, booking] = Data.Booking.decode(formattedResponse);
    if (errors) {
      alert(errors);
      return undefined;
    }
    return booking
  };
  const fetchPayment = async (booking: Booking | undefined) => {
    if (!booking) return;
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({bookingId: booking.id})
    });
    const formattedResponse = await response.json();
    const [errors, payment] = Data.Payment.decode(formattedResponse);
    if (errors) {
      alert(errors);
      return undefined;
    }
    return payment
  };

  if (!priceQuote) return <div/>
  if (isLoading) return <Loading/>

  return (
    <div className={styles.PriceQuoteCTA}>
      <strong>Total amount: </strong>
      {getPriceString(priceQuote)}
      <button
        className={styles.btn}
        type='button'
        onClick={payHandler}
        disabled={!priceQuote}
      >
        Pay
      </button>
      <div>
        {isBookingLoading && <Loading/>}
        {
          !isBookingLoading &&
          bookingId &&
          <div>
            Congrats successful booking with id: #{bookingId}
          </div>
        }
      </div>
    </div>
  )
};

export default PriceQuoteCTA;