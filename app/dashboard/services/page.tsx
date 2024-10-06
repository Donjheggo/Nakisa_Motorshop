import SearchBar from "@/components/search-bar";
import ServicesTable from "@/components/admin/services/table";
import CreateDialog from "@/components/admin/services/create-dialog";
export default function Residents({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-md mx-auto">
      <h1 className="text-center text-2xl">Services</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          <CreateDialog />
        </div>
        <div className="mt-2">
          <ServicesTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
