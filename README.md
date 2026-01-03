# 🍔 Multi-Chain Fast Food Nutrition Analysis System

## 📌 Overview
The **Multi-Chain Fast Food Nutrition Analysis System** is a responsive web application that allows users to analyze, compare, and aggregate nutritional information across multiple fast-food chains.

Users can select restaurants, filter menu items by category, add multiple items, and view combined nutritional values such as **calories, protein, carbohydrates, fat, and sugar** in real time.

This project is designed with a **mobile-first mindset**, clean UI, and realistic data modeling, focusing on **EU and Indian markets**.

---

## 🎯 Problem Statement
Fast-food consumers often face:
- No single platform to compare nutrition across brands
- Lack of visibility into hidden macros (e.g., sugar)
- Difficulty aggregating nutrition across multiple items
- Poor mobile UX in existing nutrition tools

---

## ✅ Solution
This application solves the problem by:
- Centralizing nutrition data from multiple chains
- Allowing category-based menu filtering
- Calculating real-time macro totals
- Providing a clean, responsive, mobile-friendly UI
- Using structured JSON files to simulate backend APIs

---

## 🧠 Key Features
- Multi-chain restaurant selection
- Category-based menu filtering
- Nutrition aggregation (Calories, Protein, Carbs, Fat, Sugar)
- Scrollable multi-column selected items layout
- Mobile swipe-to-delete interaction
- EU-focused nutrition data disclaimer
- Clean component-based architecture
- JSON-driven backend simulation

---

## 🛠️ Tech Stack
- **Framework**: Next.js (App Router)
- **Frontend**: React
- **Styling**: Tailwind CSS, shadcn/ui
- **UI Generation**: [v0 by Vercel](https://v0.dev)
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **State Management**: React Hooks
- **Data Layer**: JSON-based mock APIs
- **Version Control**: Git & GitHub

---

## 🎨 UI & Design
The base UI structure and layout were initially generated using **[v0 by Vercel](https://v0.dev)** and then **heavily customized and extended manually**, including:
- State-driven interactions
- Responsive layouts
- Scroll behavior improvements
- Mobile gesture handling
- Accessibility and UX refinements

---
## ⚠️ Nutrition Data Disclaimer

Nutrition values shown in this application are **estimated averages** based on publicly available restaurant disclosures and **EU food composition references**.

Actual values may vary depending on:
- Country or region
- Recipe variations
- Serving size
- Preparation method

This tool is intended for **informational and comparative purposes only** and should not be considered a substitute for professional dietary advice.
---
## 📂 Simpler version of the Project Structure
```txt
app/
 ├─ page.js
 ├─ api/
 │   ├─ chains/
 │   └─ menu/
components/
 ├─ ui/
 ├─ NutritionSummary.jsx
 ├─ CreatorNote.jsx
data/
 ├─ mcdonalds.json
 ├─ burgerking.json
 └─ chains.json
