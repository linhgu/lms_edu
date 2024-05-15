import axios from 'axios';
import qs from 'query-string';
import { addDays } from 'date-fns';
import { create } from 'zustand'
import { DateRange } from 'react-day-picker';

import { Course, Purchase } from '@prisma/client';
/* import { CourseWithPurchases } from '@/type'; */

type StatisticCourse = {
    categories: {
      id: string;
      name: string;
      courses: Course[];
    }[];
    dayRange?: {} | DateRange;
  }[];

type CourseWithPurchases = Course & {
    purchases: Purchase[];
    dayRange?: {} | DateRange;
} | []




type Store = {
    progressVideo:number
    categories: StatisticCourse,
    coursePurchase:CourseWithPurchases,
    dayRange:DateRange ,
    setProgressVideo: (progressVideo:number) => void,
    setDayRange:(dayRange:DateRange)=> void,
    fetchModes:(dayRange:DateRange)=> void,
    fetchCoursePurchase:(dayRange:DateRange)=> void,
}

export const useStore = create<Store>((set) => ({
    dayRange:{ from: new Date(2024, 0, 20),
        to: addDays(new Date(2024, 0, 20), 300),},
    progressVideo: 0,
    categories: [],
    coursePurchase:[],
    setDayRange:(dayRange:DateRange)=> set({dayRange}),
    setProgressVideo: (progressVideo:number) => set({ progressVideo }),
    fetchModes: async (dayRange:DateRange) => {
        try {
            const url = qs.stringifyUrl({
                url: '/api/courses/statistic' || '',
                query: {
                    dayRange: JSON.stringify(dayRange)
                },
              });
             await axios.get(url)
                .then(response => {
                    const categories = response.data;
                    set({ categories });                 
                })
        } catch (error) {
            console.log(error);
        }
    },

    fetchCoursePurchase: async(dayRange:DateRange)=> {
        try {
            const url = qs.stringifyUrl({
                url: '/api/courses/purchase' || '',
                query: {
                    dayRange: JSON.stringify(dayRange)
                },
              });
             await axios.get(url)
                .then(response => {
                    const coursePurchase = response.data;
                    set({ coursePurchase });                 
                })
        } catch (error) {
            console.log(error);
        }
    }
})) 