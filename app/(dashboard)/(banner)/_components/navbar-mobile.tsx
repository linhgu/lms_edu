import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
interface NavbarMobileProps {
  data: {
    id: number;
    label: string;
    href: string;
  }[];
}

export function NavbarMobile({ data }: NavbarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent border-transparent hover:bg-[#ffc2c0] hover:text-landingpage">
          <Menu className="md:hidden" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        {data.map((item: any) => (
          <button
            key={item.id}
            type="button"
            className="flex w-full items-center h-14 gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-white hover:bg-[#ffc2c0]"
          >
            <div className="flex items-center gap-x-2 py-4">{item.label}</div>
          </button>
        ))}
      </SheetContent>
    </Sheet>
  );
}
