export interface List {
  id: string;
  name: string;
  items: ListItem[];
  archived: boolean;
  userIDsWithAccess: string[];
  hostId: string;
}

export interface ContentSharer {
  id: string; // host user ID
  username: string;
}

export type NewList = Omit<List, "id">;

export interface ListItem {
  id: string;
  name: string;
  price: number;
  vendor: string;
  quantity: number;
  notes: string;
  checked: boolean;
}

export interface OrderTableDoc {
  id: string; // table name
  order: string[]; // doc IDs
}

export type DataConfig = {
  APICall: () => Promise<any>;
  localItemName: string;
};
