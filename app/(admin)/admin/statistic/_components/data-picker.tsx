'use client';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useStore } from '@/hooks/use-store';

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { setDayRange, dayRange, fetchModes, fetchCoursePurchase } = useStore();

  const [date, setDate] = React.useState<DateRange | undefined>(dayRange);
  React.useEffect(() => {
    fetchModes(date as DateRange);
    fetchCoursePurchase(date as DateRange);
  }, [date, fetchCoursePurchase, fetchModes, setDayRange]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Chọn ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
