"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideNote from "@/components/SideNote";
import DataDisclaimer from "@/components/DataDisclaimer";

function useSwipe(onSwipeLeft) {
  let startX = 0;

  return {
    onPointerDown: (e) => {
      startX = e.clientX;
    },
    onPointerUp: (e) => {
      const diff = startX - e.clientX;
      if (diff > 60) {
        onSwipeLeft();
      }
    },
  };
}

//animation like iOS
const sheetVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", damping: 30, stiffness: 300 },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.25 },
  },
};

export default function NutritionDashboard() {
  // =====================
  // STATE
  // =====================
  const [chains, setChains] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState([
    "calories",
    "protein",
    "carbs",
    "fat",
    "sugar",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // =====================
  // FETCH CHAINS
  // =====================
  useEffect(() => {
    fetch("/api/chains")
      .then((res) => res.json())
      .then(setChains);
  }, []);

  // =====================
  // FETCH MENU ITEMS
  // =====================
  useEffect(() => {
    if (!selectedChain) return;

    fetch(`/api/menu?chain=${selectedChain}`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data.items || []));
  }, [selectedChain]);

  // =====================
  // ADD ITEM
  // =====================
  const handleAddItem = () => {
    if (!selectedMenuItem) return;

    const item = menuItems.find((i) => i.name === selectedMenuItem);

    if (item) {
      setSelectedItems((prev) => [...prev, { ...item, chain: selectedChain }]);
      setSelectedMenuItem("");
    }
  };

  // =====================
  // REMOVE ITEM
  // =====================
  const handleRemoveItem = (index) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  // =====================
  // FILTER TOGGLE
  // =====================
  const toggleFilter = (filter) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // =====================
  // TOTALS
  // =====================
  const totals = selectedItems.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
      sugar: acc.sugar + (item.sugar ?? 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0 }
  );

  const getChainName = (id) => chains.find((c) => c.id === id)?.name || id;

  // =====================
  // UI
  // =====================
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      {/* Desktop layout: main + side note */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
        {/* ================= MAIN CONTENT ================= */}
        <div className="space-y-6">
          {/* Header */}
          <motion.header
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-semibold md:text-5xl">
              Multi-Chain Fast Food Nutrition Analysis
            </h1>
            <p className="mt-1 text-sm text-muted-foreground md:text-xl">
              Track and compare nutrition across your favorite fast food
              restaurants
            </p>
            <div className="mt-2 flex justify-center">
              <DataDisclaimer />
            </div>
          </motion.header>

          {/* Chains */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle>Select Restaurant</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {chains.map((chain) => (
                <Button
                  key={chain.id}
                  onClick={() => {
                    setSelectedChain(chain.id);
                    setSelectedMenuItem("");
                    setMenuItems([]);
                    setSelectedCategory("All");
                  }}
                  className={
                    selectedChain === chain.id
                      ? "bg-black text-white hover:bg-black"
                      : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                  }
                >
                  {chain.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Categories */}
          {selectedChain && (
            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle>Select Category</CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      size="sm"
                      className={
                        selectedCategory === cat
                          ? "bg-black text-white"
                          : "bg-white text-black border border-gray-300"
                      }
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Menu */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Add Menu Item</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Select
                value={selectedMenuItem}
                onValueChange={setSelectedMenuItem}
                disabled={!selectedChain}
              >
                <SelectTrigger className="flex-1 border-gray-300">
                  <SelectValue placeholder="Select an item" />
                </SelectTrigger>

                <SelectContent className="bg-white border shadow-lg">
                  {filteredMenuItems.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={handleAddItem}
                disabled={!selectedMenuItem}
                className="bg-black text-white"
              >
                Add
              </Button>
            </CardContent>
          </Card>

          {/* Selected Items */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Selected Items ({selectedItems.length})</CardTitle>
            </CardHeader>

            <CardContent className="relative">
              {selectedItems.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No items selected.
                </p>
              )}

              <div className="relative max-h-[220px] overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {selectedItems.map((item, index) => {
                  const swipeHandlers = useSwipe(() => handleRemoveItem(index));

                  return (
                    <div
                      key={`${item.id}-${index}`}
                      {...swipeHandlers}
                      className="flex items-center justify-between border border-gray-200 rounded px-2 py-1.5 bg-white text-sm"
                    >
                      <div>
                        <p className="font-medium leading-tight">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {getChainName(item.chain)} · {item.calories} cal
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>

              {selectedItems.length > 0 && (
                <div className="sticky bottom-0 bg-white pt-3">
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => setSelectedItems([])}
                  >
                    Clear all items
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Nutrition Summary */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Nutrition Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                {["calories", "protein", "carbs", "fat", "sugar"].map((f) => (
                  <label key={f} className="flex items-center gap-2">
                    <Checkbox
                      checked={filters.includes(f)}
                      onCheckedChange={() => toggleFilter(f)}
                    />
                    <span className="capitalize">{f}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {filters.includes("calories") && (
                  <Stat label="Calories" value={totals.calories} />
                )}
                {filters.includes("protein") && (
                  <Stat label="Protein" value={`${totals.protein}g`} />
                )}
                {filters.includes("carbs") && (
                  <Stat label="Carbs" value={`${totals.carbs}g`} />
                )}
                {filters.includes("fat") && (
                  <Stat label="Fat" value={`${totals.fat}g`} />
                )}
                {filters.includes("sugar") && (
                  <Stat label="Sugar" value={`${totals.sugar}g`} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= DESKTOP SIDE NOTE ================= */}
        <aside className="hidden md:block sticky top-24 self-start">
          <SideNote />
        </aside>
      </div>

      {/* ================= MOBILE BOTTOM NOTE ================= */}
      <div className="block md:hidden mt-10">
        <SideNote />
      </div>
    </div>
  );
}

/* Small helper component */
function Stat({ label, value }) {
  return (
    <div className="border rounded p-3 text-center">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/*This os the disclaimer tool tip */
