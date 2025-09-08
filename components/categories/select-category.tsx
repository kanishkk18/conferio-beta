import { useEffect, useState } from "react";
import Category from "interfaces/category";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { List, Plus, Check } from "lucide-react";
import { DropdownMenu } from "../ui/dropdown-menu";
import { CategoryForm } from "./category-form";
import { Skeleton } from "../ui/skeleton";
interface CategoryProps {
  categoryToSend: Category | null;
  setCategory: (value: Category) => void;
}

export function SelectCategory({ categoryToSend, setCategory }: CategoryProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Error fetching category");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching category", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const handleSelectCategory = (category: Category) => {
    setCategory(category);
  };

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel
        asChild
        className="group/label w-full text-sm text-sidebar-foreground"
      >
        <span className="mb-2 flex items-center gap-2">
          <List />
         <span>My Projects</span> 
        </span>
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div className="flex items-center space-x-4" key={index}>
                <Skeleton className="h-10 w-10 rounded-full " />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-[310px]" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
              </div>
            ))
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <SidebarMenuItem key={category.id}>
                <DropdownMenu>
                  <div
                    className={`flex items-center gap-2 mt-2 p-1 px-2 w-full rounded-lg ${
                      categoryToSend?.id === category.id
                        ? ""
                        : "hover:bg-primary"
                    }`}
                    onClick={() => handleSelectCategory(category)}
                  >
                    {category.icon && (
                      <span
                        className="p-1.5 rounded-md"
                        style={{
                          backgroundColor: category.color,
                          fontSize: "1.2rem",
                        }}
                      >
                        {category.icon}
                      </span>
                    )}

                    <span className="text-sm">{category.name}</span>

                    <span className="flex ml-auto">
                      {categoryToSend?.id === category.id ? (
                        <Check className="text-ItsDone" />
                      ) : (
                        <Plus />
                      )}
                    </span>
                  </div>
                </DropdownMenu>
              </SidebarMenuItem>
            ))
          ) : (
            <div className="grid justify-items-center gap-2">
              <span className=" flex">
                no categories, create them here
              </span>
              <CategoryForm setCategories={setCategories} />
            </div>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
