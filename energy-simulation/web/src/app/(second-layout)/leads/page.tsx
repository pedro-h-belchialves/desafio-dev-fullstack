import { Filter } from "./_components/filter";
import { ListWrapper } from "./_components/list";
import { ListLeadsProvider } from "@/src/contexts/list-leads-context";
import { Pagination } from "./_components/pagination";
import Image from "next/image";

export default function LeadsList() {
  return (
    <ListLeadsProvider>
      <div className="space-y-6 px-4 py-6 bg-linear-to-br h-screen from-background-from to-background-to">
        <Filter />
        <ListWrapper />
        <Pagination />
      </div>
    </ListLeadsProvider>
  );
}
