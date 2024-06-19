import { AreaState } from "./areas/types";
import { RoomsState } from "./rooms/types";
import { TablesState } from "./tables/types";

export type RootStoreState = RoomsState & TablesState & AreaState