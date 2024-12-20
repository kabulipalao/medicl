'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import BookingLayout from '@/components/booking/bookingLayout'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  
  const bookingDetails = {
    service: searchParams.get('title'),
    location: searchParams.get('location'),
    date: searchParams.get('date'),
    time: searchParams.get('time'),
    name: searchParams.get('name'),
    email: searchParams.get('email')
  }

  return (
    <BookingLayout
      currentStep={5}
      title="Booking Confirmed"
      description="Your appointment has been successfully scheduled"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        
        <div className="max-w-md mx-auto bg-secondary/30 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
          <div className="space-y-2 text-left">
            <p><span className="font-medium">Service:</span> {decodeURIComponent(bookingDetails.service || '')}</p>
            <p><span className="font-medium">Location:</span> {decodeURIComponent(bookingDetails.location || '')}</p>
            <p><span className="font-medium">Date:</span> {bookingDetails.date}</p>
            <p><span className="font-medium">Time:</span> {bookingDetails.time}</p>
            <p><span className="font-medium">Name:</span> {bookingDetails.name}</p>
            <p><span className="font-medium">Email:</span> {bookingDetails.email}</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-8">
          A confirmation email has been sent to your email address with all the details.
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline">
            <Link href="/booking/services">Book Another Appointment</Link>
          </Button>
        </div>
      </div>
    </BookingLayout>
  )
}
