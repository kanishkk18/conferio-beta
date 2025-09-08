import { ChevronDown, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { useStore } from "store/store";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { user, setAccessToken, setUser } = useStore();

  const onLogout = () => {
    setUser(null);
    setAccessToken(null);

    router.push("/");
  };

  return (
    <header className="flex min-h-12 pt-3 pb-4 shrink-0 items-center transition-[width,height] ease-linear">
      <div className="w-full flex items-center justify-between !px-4">
        <div>
         
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 !cursor-pointer">
              <Avatar className="!active:border-1 active:border-primary">
                <AvatarFallback className=" uppercase">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 !fill-black" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="!w-[280px] !rounded-[6px] !p-[8px_0] bg-white border border-[#D4E114]"
            style={{
              boxShadow: "0 1px 5px rgba(0, 74, 16, 0.15)",
            }}
          >
            <div
              role="menu"
              style={{
                maxHeight: "calc(100vh - 200px)",
                overflowY: "auto",
              }}
            >
              <Separator />
              <div className="!pt-2">
                
                <button
                  role="menuitem"
                  className="!p-[12px_16px] w-full cursor-pointer font-bold text-sm !text-[#0a2540] 
                  flex items-center gap-2 hover:!bg-[#e5efff]"
                  onClick={onLogout}
                >
                  <LogOutIcon className="w-4 h-4 transform rotate-180 !stroke-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
