import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

import { Category, Chapter, Course, LockChapter, Profile, Purchase, UserProgress } from "@prisma/client";
import { DateRange } from "react-day-picker";

export type ChaptersWithProfiles = Chapter & {
  profile: Profile[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
export type StatisticCoursePageProps = {
  categories: {
    id: string;
    name: string;
    courses: Course[];
  }[];
  dayRange?: {} | DateRange;
};

export type CourseWithChapter = {
  course: Course & {
    chapters: (Chapter & {
      LockChapter: LockChapter[];
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export type CourseWithPurchases= {
    course: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    isPublished: boolean;
    categoryId: string | null;
    profileId: string;
    createdAt: Date;
    updatedAt: Date;
    purchases: Purchase[];
    }[];
    dayRange?: {} | DateRange;
  }
