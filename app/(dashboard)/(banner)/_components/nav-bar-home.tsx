'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { NavbarMobile } from './navbar-mobile';
interface NavbarHomeProps {
  userId: string | null;
}

export const NavbarHome = ({ userId }: NavbarHomeProps) => {
  const router = useRouter();
  const routerIntroducing = [
    {
      id: 1,
      label: 'Trang chủ',
      href: '/home',
    },
    {
      id: 2,
      label: 'Khóa học',
      href: '/search',
    },
    {
      id: 3,
      label: 'Giá',
      href: '/search',
    },
    {
      id: 4,
      label: 'FAQ',
      href: '/',
    },
    {
      id: 5,
      label: 'Kết nối',
      href: '/',
    },
  ];
  return (
    <div className="flex items-center justify-between px-4 sm:px-14 h-[84px] bg-landingpage">
      <span className="text-[#ffc2c0] font-bold text-[44px] cursor-pointer select-none">Umy</span>

      <div className="md:flex text-lg text-white font-semibold hidden">
        {routerIntroducing.map((item) => (
          <div key={item.id}>
            <Link href={item.href} className="p-4 rounded-full hover:bg-[#0e2d58] hover:text-[#ffc2c0]">
              {item.label}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex space-x-4 items-center">
        {userId ? (
          <>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <Button
            onClick={() => {
              router.push('/sign-in');
            }}
            className="rounded-full text-lg font-semibold hover:bg-leadingcolor hover:text-[#ffc2c0] text-white"
            variant={'link'}
            size={'lg'}
          >
            Log in
          </Button>
        )}
        <div className="md:hidden">
          <NavbarMobile data={routerIntroducing} />
        </div>
      </div>
    </div>
  );
};
