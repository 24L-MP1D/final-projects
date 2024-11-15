'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <TableVerify />;
}

function TableVerify() {
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [selectedTime, setSelectedTime] = useLocalStorage<string | null>('selectedTime', null);
  const [reservedSeat, setReservedSeat] = useLocalStorage<string | null>('reservedSeat', null);
  const [selectedTable, setSelectedTable] = useLocalStorage<string | null>('selectedTable', null);
  const [day, setDay] = useLocalStorage<Date | null>('day', new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const reset = () => {
    setPhonenumber('');
    setSelectedTime(null);
    setReservedSeat(null);
    setSelectedTable('');
    setDay(new Date());
    setErrorMessage('');
  };

  const isValidPhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{8}$/;
    return phoneRegex.test(number);
  };
  useEffect(() => {
    if (!isValidPhoneNumber(phonenumber)) {
      setErrorMessage('Утасны дугаар буруу байна.');
    } else {
      setErrorMessage('');
    }
  }, [phonenumber]);

  async function createOrder() {
    if (!phonenumber || !isValidPhoneNumber(phonenumber)) {
      setErrorMessage('Талбарыг зөв бөглөх шаардлагатай.');
      return;
    }
    setLoading(true);
    const formattedDay = formatInTimeZone(day!, 'Asia/Shanghai', 'yyyy-MM-dd');
    try {
      console.log(selectedTable)
      const response = await fetch('/api/tablebook', {
        method: 'POST',
        body: JSON.stringify({
          phonenumber,
          time: selectedTime,
          reservedSeats: reservedSeat,
          table: selectedTable,
          day: format(day as Date, 'yyyy-MM-dd'),
          isReserved: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Захиалга үүсгэхэд алдаа гарлаа.');
      toast('Захиалга амжилттай үүслээ!');
      reset();
    } catch (error) {
      console.error('Захиалга үүсгэхэд алдаа гарлаа:', error);
      setErrorMessage('Захиалга үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="max-w-screen-sm items-center mx-auto py-48">
      <div className="flex flex-col gap-7 p-36">
        <div>
          <Input
            placeholder="Утасны дугаар аа оруулна уу?"
            type="text"
            value={phonenumber}
            onChange={(ev) => setPhonenumber(ev.target.value)}
            disabled={loading}
            aria-label="Утасны дугаар"
            className={errorMessage.includes('утасны дугаар') ? 'border-red-500' : ''}
          />
        </div>
        {errorMessage && phonenumber && <p className="text-red-500">{errorMessage}</p>}
        <Button onClick={createOrder} className="w-full hover:hover:bg-[#52071b7c]" disabled={loading}>
          {loading ? 'Ажлын явц...' : 'Захиалга үүсгэх'}
        </Button>
      </div>
    </div >
  );
}
