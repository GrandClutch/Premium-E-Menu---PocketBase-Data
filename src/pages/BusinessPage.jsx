import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import "../index.css";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";
import { useParams } from "react-router-dom";
import pb from "../pb";

const BusinessPage = () => {
  const { slug } = useParams();
  const [businessPage, setBusinessPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBusinessPage = async () => {
    pb.autoCancellation(false);
    try {
      const response = await pb
        .collection("businesses")
        .getFirstListItem(`slug = "${slug}"`);
      setBusinessPage(response);
    } catch (error) {
      console.error("Fetch Business Page:", error);
      setBusinessPage(null);
    }
  };

  useEffect(() => {
    fetchBusinessPage();
  }, [slug]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (!businessPage) {
  return (
    <div className="w-full h-dvh flex justify-center items-center bg-[#1e1e1e] text-[#c09d5b] font-kugile">
      <p className="text-7xl uppercase font-bold">Business Page Not Found!!!</p>    
    </div>
  );
}


  return (
    <div className="relative overflow-hidden">
      <Header onSearchTerm={searchTerm} onSetSearchTerm={setSearchTerm} />
      <Category onSelectedCategory={handleCategoryChange} businessSlug={slug} />
      {isLoading ? (
        <div className="bg-[#181818] h-auto -mt-[70px] relative border-t-2 border-t-white py-5 pt-[150px] pb-20 font-kugile text-white ">
          <div className="grid grid-cols-4 gap-y-7 place-items-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <Product
          selectedCategory={selectedCategory}
          searchTerm={debouncedSearchTerm}
        />
      )}
    </div>
  );
};

export default BusinessPage;
