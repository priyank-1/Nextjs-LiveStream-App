
import {create} from "zustand";

interface CreatorSidebarStore{
    collapsed : boolean;
    onExpand: () => void;
    onCollapse: () => void
};

export const useCreatorSidebar = create<CreatorSidebarStore>((set)=>({
    collapsed:true,
    onExpand:() => set(() =>({collapsed:false})),
    onCollapse : () => set(() =>({collapsed:true}))
}));