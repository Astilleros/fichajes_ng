import { workerModes } from "./mode.enum";
import { workerStatus } from "./status.enum";

export interface Worker {
    _id: string,
    name: string;
    dni: string;
    email: string;
    mobile: string;
    seguridad_social: string;
    eventsMonth: any[];
    calendar: string;
    status: workerStatus,
    mode: workerModes
}
