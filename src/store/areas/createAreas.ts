import { StateCreator } from "zustand";
import { AreaState } from "./types";

export const createAreas: StateCreator<AreaState> = ()=> ({
    areas: [
        { id: '067498ee-1932-464c-9bfe-1950134551e2', name: 'ПК', type: 'pc' },
        { id: '73a63133-7b09-4c0f-a4b7-71a424fc62b9', name: 'Консоль', type: 'console' },
        { id: '647d971d-6cb5-4c8a-b88b-9ddb4c180aeb', name: 'VR', type: 'vr' },
    ],
    subAreas: [
        { id: '6c0a780a-8762-4521-98d2-8d2c17fef34f', name: 'Test', type: 'test' },
        { id: 'adee1e7e-1701-422d-aa7e-c907157f104d', name: 'PC', type: 'pc' },
    ],
    devices: [
        { id: 'c2b64ea7-4a55-40ef-8dae-6b8cc42df19b', name: 'CM-PC3ред', type: 'pc' },
        { id: 'ad1dadd8-2cff-4150-b97e-5aef870fcfa9', name: 'CM1-PC', type: 'pc' },
        { id: '1b3446a3-8dde-4c5a-bf94-eac1017b6b66', name: 'ПК', type: 'pc' },
        { id: 'b873d96f-4678-421c-b202-362beb20b92a', name: 'CM-PC', type: 'pc' },
        { id: '437ba538-381c-4216-a596-a59e0fa6396f', name: 'Консоль-PS2', type: 'console' },
        { id: 'a13c79d4-f4c5-478a-ba10-c74d2674600c', name: 'Консоль-PS1', type: 'console' },
        { id: '6c4c2fc4-ba5e-418c-b548-58bc39bf4a65', name: 'Консоль-PS3', type: 'console' },
        { id: 'f3fe555a-51e5-4fcd-a92d-06d3671345f1', name: 'VR-C1', type: 'vr' },
        { id: 'c6b2de45-6908-4180-bb9f-ede7635a23db', name: 'VR-C2', type: 'vr' },
    ]
})