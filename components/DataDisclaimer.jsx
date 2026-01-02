"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { Button } from "./ui/button";

export default function DataDisclaimer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop tooltip */}
      <div className="hidden md:inline-block relative group text-xs text-muted-foreground cursor-default">
        <span className="inline-flex items-center gap-1 underline decoration-dotted text-sm md:text-lg">
          <Info className="h-4 w-4 " />
          Nutrition data disclaimer
        </span>

        <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
          Nutrition values are estimated averages based on publicly available
          restaurant disclosures and FSSAI food composition references. Values
          may vary by country, recipe, or preparation method.
        </div>
      </div>

      {/* Mobile tap version */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground underline decoration-dotted"
        >
          <Info className="h-3 w-3" />
          Nutrition data disclaimer
        </button>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-sm rounded-lg bg-white p-4 text-sm text-gray-700 shadow-xl">
              <p className="font-semibold mb-2">Nutrition data disclaimer</p>
              <p>
                Nutrition values are estimated averages based on publicly
                available restaurant disclosures and FSSAI [India] food
                composition references. Values may vary by country, recipe, or
                preparation method.
              </p>

              <Button
                className="mt-4 w-full bg-red-600 text-white rounded-2xl"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
