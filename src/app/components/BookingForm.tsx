export default function BookingForm() {
  return (
    <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <input type="text" placeholder="Full Name" className="w-full border p-3 rounded" />
      <input type="email" placeholder="Email" className="w-full border p-3 rounded" />
      <input type="date" className="w-full border p-3 rounded" />
      <select className="w-full border p-3 rounded">
        <option>Select Package</option>
        <option>Family Safari</option>
        <option>Beach Escape</option>
        <option>Adventure Trek</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Book Now</button>
    </form>
  );
}
