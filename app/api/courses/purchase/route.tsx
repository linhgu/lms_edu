import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { DateRange } from 'react-day-picker';

export async function GET(req: Request) {
  const profile = currentProfile();

  if (!profile) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const { searchParams } = new URL(req.url);

  const data = searchParams.get('dayRange');
  const dayRange: DateRange = JSON.parse(data!);
  try {
    const coursePurchase = await db.course.findMany({
      where: {
        isPublished: true,
        purchases: {
          some: {},
        },
      },
      include: {
        purchases: {
          where: {
            createdAt: {
              gte: new Date(dayRange?.from!).toISOString(),
              lte: new Date(dayRange?.to!).toISOString(),
            },
          },
        },
      },
    });

    return NextResponse.json(coursePurchase);
  } catch (error) {
    console.log('[COURSES]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
