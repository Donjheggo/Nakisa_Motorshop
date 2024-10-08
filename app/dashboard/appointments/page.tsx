import SearchBar from "@/components/search-bar";
import AppointmentsTable from "@/components/admin/appointments/table";
import CreateAppointmentDialog from "@/components/admin/appointments/create-dialog";

export default function Residents({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto">
      <h1 className="text-center text-2xl">Appointments</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          <CreateAppointmentDialog />
        </div>
        <div className="mt-2">
          <AppointmentsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
