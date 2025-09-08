import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export interface FilterOptions {
  departments: string[];
  roles: string[];
}

const availableDepartments = ["Design Team", "Marketing", "SEO", "Data Team", "Product Design", "UI/UX Design"];
const availableRoles = ["Project Manager", "Designer", "Developer", "Analyst"];

export function FilterModal({ open, onOpenChange, onApplyFilters, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const handleDepartmentChange = (department: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      departments: checked 
        ? [...prev.departments, department]
        : prev.departments.filter(d => d !== department)
    }));
  };

  const handleRoleChange = (role: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      roles: checked 
        ? [...prev.roles, role]
        : prev.roles.filter(r => r !== role)
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  const handleClear = () => {
    const clearedFilters = { departments: [], roles: [] };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Filter Contacts</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Departments */}
          <div>
            <Label className="text-base font-medium text-gray-900 dark:text-white">Departments</Label>
            <div className="mt-2 space-y-2">
              {availableDepartments.map((department) => (
                <div key={department} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dept-${department}`}
                    checked={filters.departments.includes(department)}
                    onCheckedChange={(checked) => handleDepartmentChange(department, checked as boolean)}
                  />
                  <Label htmlFor={`dept-${department}`} className="text-sm text-gray-700 dark:text-gray-300">
                    {department}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Roles */}
          <div>
            <Label className="text-base font-medium text-gray-900 dark:text-white">Roles</Label>
            <div className="mt-2 space-y-2">
              {availableRoles.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role}`}
                    checked={filters.roles.includes(role)}
                    onCheckedChange={(checked) => handleRoleChange(role, checked as boolean)}
                  />
                  <Label htmlFor={`role-${role}`} className="text-sm text-gray-700 dark:text-gray-300">
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={handleClear}>
            Clear All
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} className="bg-orange-500 hover:bg-orange-600 text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

