import React, { useEffect } from "react";
import { useState } from "react";
import pb from "../pb";

const Category = ({ onSelectedCategory, businessSlug }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const handleclick = (category) => {
    setActiveCategory(category);
  };
  const fetchCategories = async () => {
    pb.autoCancellation(false);
    try {
      const business = await pb
        .collection("businesses")
        .getFirstListItem(`slug= "${businessSlug}" `, {});
      const records = await pb.collection("categories").getFullList({
        sort: "created",
        filter: `business ="${business.id}" `,
      });
      setCategories(records);
      if (records.length > 0) {
        setActiveCategory(records[0].name);
        onSelectedCategory(records[0].name);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setCategories([]);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const activeCat = categories.find(
    (cat) => cat.name.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div
      className={`relative bg-[#1e1e1e] font-kugile text-white flex flex-col gap-3 items-center justify-around p-5 mx-auto w-[80%] h-auto -mt-32 z-10 border-t-4 border-t-[#c09d5b] `}
    >
      <div className="flex gap-16 items-center justify-around  ">
        {categories.map((cat) => {
          const isActive =
            activeCategory.toLowerCase() === cat.name.toLowerCase();
          return (
            <div
              key={cat.id}
              className={`text-[18px] flex gap-4 justify-center items-center py-4 px-7 hover:bg-[#c09d5b] cursor-pointer ${
                isActive ? "bg-[#c09d5b]" : ""
              }`}
              onClick={() => {
                onSelectedCategory(cat.name);
                handleclick(cat.name);
              }}
            >
              <p>{cat.name.toUpperCase()}</p>
              <i className={`fa-solid fa-${cat.icon}`}></i>
            </div>
          );
        })}
      </div>
      {activeCat && activeCat.description && (
        <p
          className="m-4 text-center italic text-[16px]"
          dangerouslySetInnerHTML={{ __html: activeCat.description }}
        />
      )}
    </div>
  );
};

export default Category;
