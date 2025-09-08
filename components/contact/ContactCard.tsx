import { Mail, Phone, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContactCardProps {
  id: string;
  name: string;
  role: string;
  department: string;
  hiredDate: string;
  email: string;
  phone: string;
  avatar?: string;
  onClick?: () => void;
}

export function ContactCard({
  name,
  role,
  department,
  hiredDate,
  email,
  phone,
  avatar,
  onClick,
}: ContactCardProps) {
  return (
    <Card 
      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
              {avatar ? (
                <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                name.split(' ').map(n => n[0]).join('').slice(0, 2)
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                {name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {role}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 z-50">
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                Edit Contact
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400">
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Department</span>
            <span className="text-gray-900 dark:text-white font-medium">{department}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Hired Date</span>
            <span className="text-gray-900 dark:text-white font-medium">{hiredDate}</span>
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white">{email}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white">{phone}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
