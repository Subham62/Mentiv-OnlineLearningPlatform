import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { COURSE_CATEGORIES } from "@/config/courseCategories";

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)    //  if the category already select then unselect that
        : [...prevCategories, categoryId];        //  if category not select then select it

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSortByPrice("");
    handleFilterChange([], "");
  };

  const hasActiveFilters = selectedCategories.length > 0 || sortByPrice !== "";

  return (
    <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">
          Filters
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-violet-600 hover:text-violet-700"
          >
            Clear all
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      {/* Sort by Price */}
      <div className="mb-6">
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
          SORT BY PRICE
        </Label>
        <Select value={sortByPrice} onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select price order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      {/* Categories */}
      <div>
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
          CATEGORY
        </Label>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {COURSE_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded transition-colors"
            >
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-medium leading-none cursor-pointer flex-1"
              >
                {category.label}
              </Label>
              {selectedCategories.includes(category.id) && (
                <span className="text-violet-600 text-xs">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
