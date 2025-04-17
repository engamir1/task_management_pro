import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}

export function TimePicker({ date, setDate, className }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const [hour, setHour] = React.useState<number>(date?.getHours() || 0);
  const [minute, setMinute] = React.useState<number>(date?.getMinutes() || 0);
  const [isPM, setIsPM] = React.useState<boolean>(
    date ? date.getHours() >= 12 : false
  );

  React.useEffect(() => {
    if (date) {
      setHour(date.getHours() % 12 || 12);
      setMinute(date.getMinutes());
      setIsPM(date.getHours() >= 12);
    }
  }, [date]);

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) {
      setHour(0);
      return;
    }
    if (value > 12) {
      setHour(12);
    } else if (value < 0) {
      setHour(0);
    } else {
      setHour(value);
    }
    if (value.toString().length === 2) {
      minuteRef.current?.focus();
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) {
      setMinute(0);
      return;
    }
    if (value > 59) {
      setMinute(59);
    } else if (value < 0) {
      setMinute(0);
    } else {
      setMinute(value);
    }
  };

  const handleTimeChange = () => {
    const newDate = new Date();
    const hours = isPM ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour;
    newDate.setHours(hours);
    newDate.setMinutes(minute);
    setDate(newDate);
  };

  const toggleMeridiem = () => {
    setIsPM(!isPM);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {date ? (
            date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          ) : (
            <span>Pick a time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex items-end gap-2">
          <div>
            <Label>Hour</Label>
            <Input
              ref={hourRef}
              className="w-[50px]"
              value={hour}
              onChange={handleHourChange}
              type="number"
              max={12}
              min={1}
            />
          </div>
          <div className="text-xl pb-2">:</div>
          <div>
            <Label>Minute</Label>
            <Input
              ref={minuteRef}
              className="w-[50px]"
              value={minute}
              onChange={handleMinuteChange}
              type="number"
              max={59}
              min={0}
            />
          </div>
          <Button
            variant="outline"
            className="mb-2"
            onClick={toggleMeridiem}
            type="button"
          >
            {isPM ? "PM" : "AM"}
          </Button>
          <Button className="mb-2" onClick={handleTimeChange} type="button">
            Set
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}