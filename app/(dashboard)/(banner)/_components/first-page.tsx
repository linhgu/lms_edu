/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';

export const FirstPage = () => {
  return (
    <>
      <div>
        <div className="text-leadingcolor text-lg font-bold">XÂY DỰNG VÀ HỌC KHÓA HỌC</div>
        <div className=" text-[44px] sm:text-[76px] font-bold text-white leading-snug">
          Tạo khóa học của riêng mình với Umy
        </div>
        <div className="text-xl text-white">
          Umy là mẫu hệ thống quản lý học tập (LMS) linh hoạt có mọi thứ bạn cần để bán nội dung video. Tạo toàn bộ danh
          mục hoặc chỉ một khóa học duy nhất và bán đăng ký một cách dễ dàng!
        </div>
        <div className="pt-6 space-y-6 sm:space-x-6">
          <Button className="rounded-full text-white bg-leadingcolor border-[2px] border-leadingcolor font-bold text-center leading-6 hover:bg-leadingcolor/50 h-12 text-xl">
            Truy cập khóa học
          </Button>
          <Button className="rounded-full  text-white bg-transparent border-[2px] border-white font-bold text-center leading-6 hover:bg-leadingcolor hover:text-landingpage h-12 text-xl">
            Mua ngay
          </Button>
        </div>
      </div>
      <div className="relative">
        <div
          className="absolute left-[0%] h-full w-[65%] rounded-full bg-[#7b3c9f]"
          style={{
            backgroundImage: 'linear-gradient(225deg, #0c2445, rgba(242, 247, 252, 0.3))',
          }}
        />
        <img
          className="relative rounded-l-full w-full align-middle max-w-full z-10 inline-block object-contain"
          src="https://assets.website-files.com/6279827ac63c5f7775cc5b91/62e6de8869c3f3c217c16539_coursekit-placeholder-6-p-1080.webp"
          alt="Course kit LMS"
        />
      </div>
    </>
  );
};
