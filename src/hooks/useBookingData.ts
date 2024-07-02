import useSWR from 'swr';

interface BookingItem {
    ProductName: string;
    ProductPrice: number;
    Item: Item[];
    Quantity: number;
    TotalPrice: number;
}

interface Item {
    RoomTypeItem: [],
    BookingItem: [],
    // BookingItem: string,
    Category: string,
    // RoomTypeItem: string,
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
}

interface Room {
    Booking: [],
    CleaningRoom: [],
    Employee: null,
    RoomType: null,
    Id: number,
    CreateAt: string,
    UpdateAt: string,
    RoomNumber: string,
    RoomTypeId: number,
    Floor: string,
    Status: number,
    EmployeeId: number
}

interface RoomType {
    Booking: [],
    Room: [],
    RoomTypeItem: [],
    Id: number,
    CreateAt: string,
    UpdateAt: string,
    Name: string,
    Price: number,
    MaximumCapacity: number,
    NumberOfChildren: number,
    NumberOfAdults: number,
    Description: string,
    Quantity: number,
    checkInDate: string,
    checkOutDate: string,
}

interface BookingData {
    Data: any;
    Id: number;
    bookingCode: string;
    customerName: string;
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
    checkInDate: string;
    checkOutDate: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const useBookingData = (id: number) => {
    console.log("id of booking", id)
    const { data, error } = useSWR<BookingData>(`http://192.168.1.114:83/booking/36`, fetcher);

    console.log("Data of booking", data);
    
    return {
        bookingData: data,
        isLoading: !error && !data,
        isError: error
    };
}

export default useBookingData;
