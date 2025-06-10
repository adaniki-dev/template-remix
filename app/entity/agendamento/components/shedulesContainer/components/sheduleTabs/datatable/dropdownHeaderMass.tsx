import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  import { useGroupsContext } from '@/features/campanhas/context/groupsContext';
  
  interface RowData {
    id: string;
    instanceId: string;
  }
  
  interface GroupedData {
    instanceId: string;
    groupIds: string[];
  }
  
  export default function DropdownHeaderMass({ rows }: any) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex text-center items-center justify-center w-36 px-2 py-1 bg-muted rounded-md border border-primary text-primary">
            Opções
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  