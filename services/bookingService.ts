import { supabase } from '@/lib/supabase'

export interface BookingData {
  service_id: string
  service_title: string
  location: string
  date: string
  time: string
  price: number
  first_name: string
  last_name: string
  date_of_birth: string
  email: string
  phone: string
  postcode: string
  license?: string
  vehicle_type?: string
  employer?: string
  voucher_code?: string
  hear_about_us: string
  marketing_consent: boolean
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
}

export async function createBooking(bookingData: BookingData) {
  try {
    // Convert date of birth from DD/MM/YYYY to YYYY-MM-DD
    const [day, month, year] = bookingData.date_of_birth.split('/');
    const formattedDateOfBirth = `${year}-${month}-${day}`;

    // Create a new booking data object with the formatted date
    const formattedBookingData = {
      ...bookingData,
      date_of_birth: formattedDateOfBirth,
      status: 'pending' as const
    };

    console.log('Sending booking data to Supabase:', formattedBookingData);
    
    const { data, error } = await supabase
      .from('bookings')
      .insert([formattedBookingData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Booking failed: ${error.message}`);
    }

    try {
      await sendConfirmationEmail(bookingData);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return data;
  } catch (error) {
    console.error('CreateBooking error:', error);
    throw error;
  }
}

async function sendConfirmationEmail(booking: BookingData) {
  // Implement email sending logic here
  // You can use services like SendGrid, AWS SES, or Resend
} 