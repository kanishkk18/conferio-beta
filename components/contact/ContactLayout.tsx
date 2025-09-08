import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContactCard } from "./ContactCard";
import { AddCandidateModal } from "./AddCandidateModal";
import { ContactDetailsModal } from "./ContactDetailsModal";
import { FilterModal, FilterOptions } from "./FilterModal";
import { useToast } from "../../hooks/use-toast";
import Mainsidebar from "../ui/mainSideBar";

const mockContacts = [
  {
    id: "1",
    name: "Bessie Cooper",
    role: "Project Manager",
    department: "Design Team",
    hiredDate: "7/2/19",
    email: "RonaldRich@gmail.com",
    phone: "(229) 555-0109"
  },
  {
    id: "2",
    name: "Theresa Webb",
    role: "Project Manager",
    department: "Marketing",
    hiredDate: "10/28/19",
    email: "RonaldRich@gmail.com",
    phone: "(406) 555-0120"
  },
  {
    id: "3",
    name: "Bessie Cooper",
    role: "Project Manager",
    department: "SEO",
    hiredDate: "9/6/19",
    email: "RonaldRich@gmail.com",
    phone: "(684) 555-0102"
  },
  {
    id: "4",
    name: "Eleanor Pena",
    role: "Project Manager",
    department: "Data Team",
    hiredDate: "6/5/19",
    email: "RonaldRich@gmail.com",
    phone: "(229) 555-0109"
  },
  {
    id: "5",
    name: "Guy Hawkins",
    role: "Project Manager",
    department: "Product Design",
    hiredDate: "1/5/19",
    email: "RonaldRich@gmail.com",
    phone: "(406) 555-0120"
  },
  {
    id: "6",
    name: "Jenny Wilson",
    role: "Project Manager",
    department: "UI/UX Design",
    hiredDate: "7/27/19",
    email: "RonaldRich@gmail.com",
    phone: "(684) 555-0102"
  }
];

export function ContactLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState(mockContacts);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [filters, setFilters] = useState<FilterOptions>({ departments: [], roles: [] });
  const { toast } = useToast();

  // Filter and search contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filters.departments.length === 0 || filters.departments.includes(contact.department);
    const matchesRole = filters.roles.length === 0 || filters.roles.includes(contact.role);
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const handleAddCandidate = (newCandidate: any) => {
    setContacts(prev => [...prev, newCandidate]);
    toast({
      title: "Candidate Added",
      description: `${newCandidate.name} has been added successfully.`,
    });
  };

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
    setDetailsModalOpen(true);
  };

  const handleScheduleMeeting = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    toast({
      title: "Meeting Scheduled",
      description: `Meeting with ${contact?.name} has been scheduled.`,
    });
    setDetailsModalOpen(false);
  };

  const handleStartChat = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    toast({
      title: "Chat Started",
      description: `Chat with ${contact?.name} has been initiated.`,
    });
    setDetailsModalOpen(false);
  };

  const handleShareFile = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    toast({
      title: "File Shared",
      description: `File shared with ${contact?.name}.`,
    });
    setDetailsModalOpen(false);
  };

  const activeFiltersCount = filters.departments.length + filters.roles.length;

  return (
    <div className="min-h-screen flex w-full dark:bg-gray-900 transition-colors">
        <Mainsidebar/>
      <div className="p-6 px-8 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {filteredContacts.length} Employee{filteredContacts.length !== 1 ? 's' : ''}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-300 dark:border-gray-600 relative"
              onClick={() => setFilterModalOpen(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setAddModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard 
              key={contact.id} 
              {...contact} 
              onClick={() => handleContactClick(contact)}
            />
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No contacts found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddCandidateModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onAddCandidate={handleAddCandidate}
      />

      <ContactDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        contact={selectedContact}
        onScheduleMeeting={handleScheduleMeeting}
        onStartChat={handleStartChat}
        onShareFile={handleShareFile}
      />

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}  
        onApplyFilters={setFilters}
        currentFilters={filters}
      />
    </div>
  );
}
