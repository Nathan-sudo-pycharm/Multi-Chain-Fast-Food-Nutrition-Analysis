"use client";
import Link from "next/link";

export default function SideNote() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 text-medium text-gray-800 space-y-3">
      <h3 className="font-semibold text-base">About this tool</h3>

      <p className="text-sm">
        This dashboard lets you easily compare calories, protein, carbs, fat,
        and sugar in popular fast-food items from chains like KFC and McDonald's
        India.{" "}
        <p>
          It helps make smarter food choices for your daily life.
          <p></p>
          <p>
            <span className="font-bold text-red-500">Note:</span> These numbers
            come from the PDFs you shared and may change—always check the
            restaurant's latest info for accuracy.
          </p>
        </p>
      </p>

      <div>
        <p className="font-medium text-medium">How to use:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm  text-gray-600">
          <li>Select a restaurant</li>
          <li>Choose a category</li>
          <li>Add menu items</li>
          <li>Review nutrition totals</li>
        </ul>
      </div>

      <div className="border-t pt-3 text-sm text-gray-800">
        India-focused nutrition data · Educational project
        <br />
        <p className="text-medium text-muted-foreground pt-3">
          Built by{" "}
          <Link
            href="https://www.linkedin.com/in/nathan-sequeira214652/"
            target="_blank"
            className="font-medium text-blue-700"
          >
            Nathan Sequeira
          </Link>{" "}
          ·{" "}
          <Link
            href="https://nathansequeirafinal.vercel.app/"
            target="_blank"
            className="text-red-700 font-medium"
          >
            Portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
