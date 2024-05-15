/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const FooterPage = () => {
  const socialList = [
    {
      id: 1,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/62e6e9682cf39708fb5d159c_FacebookLogo.webp',
    },
    {
      id: 2,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/62e6e968438313555340ad35_InstagramLogo.webp',
    },
    {
      id: 3,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/62e6e9682fdfe1c2f179d169_YoutubeLogo.webp',
    },
    {
      id: 4,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/62e6e9681cbbc74dcf378000_TwitterLogo.webp',
    },
    {
      id: 5,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/62e6e9680f9b3a53337f3fc2_EnvelopeSimple.png',
    },
    {
      id: 6,
      imageUrl: 'https://assets.website-files.com/6279827ac63c5f7775cc5b91/62e6e9682f9d22e369075707_TiktokLogo.webp',
    },
  ];
  const router = [
    {
      id: 1,
      title: 'Trang chủ',
    },
    {
      id: 2,
      title: 'Trang',
    },
    {
      id: 3,
      title: 'Các phần',
    },
    {
      id: 4,
      title: 'Chủ đề',
    },
    {
      id: 5,
      title: 'Thiết kế',
    },
    {
      id: 6,
      title: 'Mua ngay',
    },
  ];
  return (
    <div className="text-center space-y-8">
      <h2 className="text-[#ffc2c0] font-bold text-[24px]">Umy</h2>
      <div className="flex flex-col items-center justify-center  gap-x-4 px-4 py-4 md:flex-row">
        {router.map((item) => (
          <Button
            key={item.id}
            className=" rounded-full text-base font-bold bg-transparent hover:bg-[#0e2d58] hover:text-[#ffc2c0]"
          >
            {item.title}
          </Button>
        ))}
      </div>
      <div className="flex flex-col items-center text-base justify-between md:flex-row">
        <div>
          Powered by <span className="font-bold hover:underline cursor-pointer">@NVLinh</span>,built by{' '}
          <span className="font-bold hover:underline cursor-pointer">Linh Nguyen</span> |{' '}
          <span className="font-bold hover:underline cursor-pointer">Licensing</span>
        </div>
        <div className="flex gap-x-4 p-6 md:pt-0">
          {socialList.map((item) => (
            <div key={item.id}>
              <Link href={'#'}>
                <img src={item.imageUrl} className="h-8 w-8" alt="#" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
