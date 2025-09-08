import { Calendar, MessageSquare, FileText, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Contact {
  id: string;
  name: string;
  role: string;
  department: string;
  hiredDate: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface ContactDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
  onScheduleMeeting: (contactId: string) => void;
  onStartChat: (contactId: string) => void;
  onShareFile: (contactId: string) => void;
}

export function ContactDetailsModal({ 
  open, 
  onOpenChange, 
  contact, 
  onScheduleMeeting,
  onStartChat,
  onShareFile 
}: ContactDetailsModalProps) {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Contact Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xl">
              {contact.avatar ? (
                <Image height={1000} width={1000} src={contact.avatar} alt={contact.name} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{contact.role}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{contact.department}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white">{contact.email}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white">{contact.phone}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Hired Date</span>
              <span className="text-gray-900 dark:text-white font-medium">{contact.hiredDate}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <Button
              onClick={() => onScheduleMeeting(contact.id)}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto space-y-2 border-gray-300 dark:border-gray-600"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Schedule Meeting</span>
            </Button>
            
            <Button
              onClick={() => onStartChat(contact.id)}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto space-y-2 border-gray-300 dark:border-gray-600"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Start Chat</span>
            </Button>
            
            <Button
              onClick={() => onShareFile(contact.id)}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto space-y-2 border-gray-300 dark:border-gray-600"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">Share File</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
