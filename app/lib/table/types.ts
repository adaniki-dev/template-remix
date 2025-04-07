import {
  ColumnDef,
  Row,
  Table as ReactTable,
  HeaderGroup as ReactTableHeaderGroup,
} from '@tanstack/react-table';

// Definição do tipo para as props da tabela virtualizada
export interface TableVirtualizedProps<T> {
  table: ReactTable<T>;
  columnsLength: number;
  onClickRow?: (row: T) => void;
}

// Definição do tipo para as props do DataTableIntegrationsHooks
export interface DataTableIntegrationsHooksProps {
  columns: ColumnDef<IntegrationsHooksProps>[];
}

// Definição do tipo para os dados de IntegrationsHooks
export interface IntegrationsHooksProps {
  id: number;
  uuid: string;
  integration_id: string;
  key: string;
  message: string;
  is_enabled: boolean;
  variables: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

// Definição do tipo para o contexto de integração
export interface IntegrationHooksContext {
  query: {
    data: IntegrationsHooksProps[];
  };
}

// Tipo para o virtualizer
export interface VirtualizerItem {
  index: number;
  start: number;
  size: number;
  key: string | number;
}

// Tipo para o useWindowVirtualizer
export interface WindowVirtualizerOptions {
  count: number;
  estimateSize: () => number;
  scrollMargin: number;
}

// Tipo para o HeaderGroup do react-table
export type HeaderGroup<T> = ReactTableHeaderGroup<T>;

// Estendendo o tipo Cell do react-table
export interface ExtendedCell {
  column: {
    id: string;
    columnDef: ColumnDef<any>;
    getSize: () => number;
  };
}

// Corrigindo a extensão da interface Row
export interface ExtendedRow<T> extends Omit<Row<T>, 'getVisibleCells'> {
  getVisibleCells: () => ExtendedCell[];
  original: T;
}
