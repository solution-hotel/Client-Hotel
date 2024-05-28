import useSWR from 'swr';

interface BookingItem {
    ProductName: string;
    ProductPrice: number;
    Item: Item[];
    Quantity: number;
    TotalPrice: number;
}

interface Item {
    BookingItem: string,
    Category: string,
    RoomTypeItem: string,
    Id: number,
    CreateAt: string,
    UpdateAt: string,
    ProductName: string,
    ProductPrice: number,
    CategoryId: number
}

interface Guest {
    Booking: any[];
    Id: number;
    CreateAt: string | null;
    UpdateAt: string | null;
    FirstName: string;
    LastName: string;
    Gender: string | null;
    Email: string;
    PhoneNumber: string;
    checkInDate: string;
    checkOutDate: string;
}

interface RoomType {
    Id: number,
    CreateAt: string,
    UpdateAt: string,
    Name: string,
    price: number,
    MaximumCapacity: number,
    NumberOfChildren: number,
    NumberOfAdults: number,
    Description: string,
    Quantity: number,
    checkInDate: string,
    checkOutDate: string,
}

interface BookingData {
    Id: number;
    bookingCode: string;
    customerName: string;
    // phoneNumber: string;
    // email: string;
    CreateAt: string;
    roomType: string;
    roomPrice: number;
    bookingTime: string;
    Status: string;
    BookingItem: BookingItem[];
    Guest: Guest[];
    RoomType: RoomType[];
    RoomCost: number;
    ServiceCost: number;
    TotalCost: number;
    notes: string[];
    contactPhone: string;
    contactEmail: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const useBookingData = (bookingId: number) => {
    // const { data, error } = useSWR<BookingData>(`https://api-pnv.bluejaypos.vn/booking/${bookingId}`, fetcher);
    const { data, error } = useSWR<BookingData>(`http://localhost:3001/Data`, fetcher);

    return {
        bookingData: data,
        isLoading: !error && !data,
        isError: error
    };
}

export default useBookingData;
