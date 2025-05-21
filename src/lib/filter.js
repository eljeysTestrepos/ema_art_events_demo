//
//

import { getEvent, getEventDates, getEventLocation } from "./api";

export async function getFilter() {
  const eventList = await getEvent();
  const eventDates = await getEventDates();
  const eventLocations = await getEventLocation();

  if (eventList != null) {
    let result = eventList.filter(checkDate);
    console.log("filter.js: ", result);
    function checkDate(element) {
      return element === "2025-05-01";
    }
  }
}
// const categoriesWithProducts = categories.filter((category) => {
//   return products.some((product) => product.category === category);
// });

//  let filteredProducts = [];

// Category Filter Visibility
// const [showCategories, setShowCategories] = useState(false);

//Category Filter Logic
// const [selectedCategories, setSelectedCategories] = useState([]);
// const [searchTerm] = useState("");

// const toggleCategory = (category) => {
//   setSelectedCategories((prev) =>
//     prev.includes(category)
//       ? prev.filter((c) => c !== category)
//       : [...prev, category]
//   );
// };

// const toggleCategoriesVisibility = () => {
//   setShowCategories(!showCategories);
// };

// if (products != null) {
//   console.log("products!=null");
//   filteredProducts = products.filter((product) => {
//     const categoryMatch =
//       selectedCategories.length === 0 ||
//       selectedCategories.includes(product.category);
//     const searchMatch =
//       searchTerm === "" ||
//       product.title.toLowerCase().includes(searchTerm.toLowerCase());
//     return categoryMatch && searchMatch;
//   });
// }

// {showCategories && (
//   <div className="absolute top-[60px] left-0 w-fit bg-white shadow-sm rounded-xs z-30 cursor-pointer">
//     <div className="flex flex-col gap-4 p-4">
//       {categories.map((category) => (
//         <Filter
//           key={category}
//           category={category}
//           checked={selectedCategories.includes(category)}
//           onChange={() => toggleCategory(category)}
//         />
//       ))}
//     </div>
//   </div>
// )}
