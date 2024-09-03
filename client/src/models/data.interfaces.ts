export interface DateProps {
    startDate: string;
    endDate: string;
}

export interface DataI {
    kato: number;
    numberOfCalls: number;
    region: string;
}

export interface ArrivedDataI {
    region: string;
    arrived_time: string;
    numberOfCalls: number;
}

export interface ReasonDataI {
    reason: string;
    numberOfCalls: number;
}

export interface WeekdayDataI {
    weekday: string;
    numberOfCalls: number;
}

export interface PeriodData {
    day_percentage: number;
    holidays_percentage: number;
}
