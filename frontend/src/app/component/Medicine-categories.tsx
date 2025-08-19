// src/components/sections/medicine-categories.tsx
import {
  Brain,
  Heart,
  Pill,
  Syringe,
  Stethoscope,
  Droplet,
} from "lucide-react"; // Example icons
import { MedicineCategoryCard } from "./Medicine-category-card";

export function MedicineCategories() {
  return (
    <section className="py-12 px-4 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Medicine categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          <MedicineCategoryCard icon={Pill} title="Pain Reliever" />
          <MedicineCategoryCard icon={Syringe} title="Antibiotics" />
          <MedicineCategoryCard icon={Stethoscope} title="Cold & Flu" />
          <MedicineCategoryCard icon={Heart} title="Heart Health" />
          <MedicineCategoryCard icon={Brain} title="Mental Health" isActive />
          {/* Active state example */}
          <MedicineCategoryCard icon={Droplet} title="Allergy Relief" />
        </div>
      </div>
    </section>
  );
}
