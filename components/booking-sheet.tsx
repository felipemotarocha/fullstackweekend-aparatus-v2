"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn, formatCurrency, generateTimeSlots } from "@/lib/utils"
import type { BarbershopService } from "@/generated/prisma/client"

interface BookingSheetProps {
  service: BarbershopService
  barbershopName: string
}

const BookingSheet = ({ service, barbershopName }: BookingSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  )

  const timeSlots = useMemo(() => generateTimeSlots(), [])

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime(undefined)
  }

  const isConfirmDisabled = !selectedDate || !selectedTime

  const handleConfirm = () => {
    console.log({ selectedDate, selectedTime, service })
  }

  return (
    <SheetContent className="flex w-full flex-col overflow-y-auto p-0 sm:max-w-[27.5rem]">
      <SheetHeader className="border-b border-border px-5 py-6 text-left">
        <SheetTitle>Fazer Reserva</SheetTitle>
      </SheetHeader>

      <div className="flex flex-1 flex-col gap-6 px-5 py-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          locale={ptBR}
          disabled={{ before: new Date() }}
          classNames={{
            month_caption: "flex items-center justify-between",
            caption_label: "text-base font-bold capitalize",
            nav: "flex gap-3",
          }}
          showOutsideDays={false}
        />

        {selectedDate && (
          <>
            <div className="border-t border-border" />
            <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={cn(
                    "shrink-0 rounded-full",
                    selectedTime === time && "font-bold"
                  )}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </>
        )}

        {selectedDate && selectedTime && (
          <>
            <div className="border-t border-border" />
            <div className="flex flex-col gap-3 rounded-[0.625rem] border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="font-bold">{service.name}</p>
                <p className="text-sm font-bold">
                  {formatCurrency(service.priceInCents)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="text-sm">
                  {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Horário</p>
                <p className="text-sm">{selectedTime}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Barbearia</p>
                <p className="text-sm">{barbershopName}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <SheetFooter className="px-5 py-5">
        <SheetClose asChild>
          <Button
            className="w-full rounded-full"
            disabled={isConfirmDisabled}
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}

export default BookingSheet
