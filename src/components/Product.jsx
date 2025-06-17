import { Facebook, Instagram, Star, Twitter, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import pb from "../pb";
import { useParams } from "react-router-dom";

const Product = ({ searchTerm, selectedCategory }) => {
  const [businessInfo, setBusinessInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const hasProducts = products && products.length > 0;
  const {slug} = useParams();

  const fetchProducts = async () => {
    pb.autoCancellation(false);
    try {
      let filters = [];
      if (selectedCategory) {
        const category = await pb
          .collection("categories")
          .getFirstListItem(`name = "${selectedCategory}"`, {});
        if (category && category.id) {
          filters.push(`category = "${category.id}"`);
        }
      }
      if(searchTerm && searchTerm.trim() != ""){
        let term = searchTerm.trim();
        filters.push(`name ~ "${term}"`)
      }
      const combinedFilters = filters.join(" && ");
      
      const business = await pb
        .collection("businesses")
        .getFirstListItem(`slug = "${slug}"`, {});
      setBusinessInfo(business);
      const records = await pb.collection("products").getFullList({
        sort: "name",
        filter: combinedFilters,
      });
      setProducts(records);
    } catch (error) {
      console.error("Fetch error:", error);
      setProducts([]);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);
  return (
    <div className="bg-[#181818] h-auto -mt-[70px] relative border-t-2 border-t-white py-5 pt-[150px] pb-20 font-kugile text-white ">
      {!hasProducts ? (
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-center text-4xl text-[#c09d5b] font-bold ">
            NO PRODUCTS AVAILABLE FOR THIS CATEGORY.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-7 place-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer bg-[#1e1e1e] w-[400px] text-white transition duration-300 transform hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-[#c09d5b] hover:shadow-[#c09d5b]/50"
            >
              <img
                className="w-full h-[300px] object-cover"
                onClick={() => setSelectedProduct(product)}
                src={pb.files.getURL(product, product.images)}
                alt={product.name}
              />

              <div className="flex flex-col gap-3 pt-8 px-5">
                <p className="text-[24px] uppercase ">{product.name}</p>
                <p className="italic text-[20px]">${product.unitPrice}</p>
              </div>
              <div className="flex justify-around gap-2 mt-8 border-t-2 border-t-[#c09d5b] pt-4 px-5 mb-4">
                <p className="text-[20px]">Order</p>
                <div className="flex gap-1">
                  {Array.from({ length: product.rating }, (_, index) => (
                    <Star
                      key={index}
                      className="  text-[#c09d5b] w-6 h-6 fill-yellow-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-[40%] h-auto rounded-md bg-[#181818] relative font-kugile z-50 mx-auto flex flex-col justify-center text-white p-10 transition duration-300 transform hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-[#c09d5b] hover:shadow-[#c09d5b]/50 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <p className="text-[#c09d5b] text-5xl font-[600] mb-5">
                {selectedProduct.name.toUpperCase()}
              </p>
              <X
                size={40}
                className="cursor-pointer hover:text-[#c09d5b] "
                onClick={() => setSelectedProduct(null)}
              />
            </div>
            <div className="grid grid-cols-2 gap-[50px] font-kugile">
              <img
                className="w-[400px] h-[400px] object-cover "
                src={pb.files.getURL(selectedProduct, selectedProduct.images)}
                alt=""
              />
              <div className="flex flex-col gap-10">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-end gap-2">
                    <div className="flex gap-1">
                      {Array.from(
                        { length: selectedProduct.rating },
                        (_, index) => (
                          <Star
                            key={index}
                            className="  text-[#c09d5b] w-6 h-6 fill-yellow-200"
                          />
                        )
                      )}
                    </div>
                  </div>
                  <p className="text-2xl italic">
                    ${selectedProduct.unitPrice}
                  </p>
                </div>

                <p
                  className="text-[#f1d092] text-[25px]"
                  dangerouslySetInnerHTML={{
                    __html: selectedProduct.description,
                  }}
                ></p>
                <div className="flex flex-col gap-3">
                  <p className="text-[#c09d5b] font-[600] text-[22px] ">
                    INGREDIENTS:
                  </p>
                  <p className="italic text-[18px]">
                    {selectedProduct.ingredients.join(", ")}
                  </p>
                </div>
              </div>
            </div>
            <hr className="w-[80%] mx-auto m-10 " />
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <p className="text-[#c09d5b] font-[600] ">CONTACT US</p>
                <div className="flex justify-start items-center gap-5 text-[18px]">
                  <p>{businessInfo.phoneNumber}</p>
                  <p>{businessInfo.address}</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-5">
                <a
                  href={businessInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook
                    size={50}
                    className="cursor-pointer p-2 hover:bg-white text-[#c09d5b] rounded-md ring-yellow-200 "
                  />
                </a>
                <a
                  href={businessInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram
                    size={50}
                    className="cursor-pointer p-2 hover:bg-white text-[#c09d5b] rounded-md ring-yellow-200 "
                  />
                </a>
                <a
                  href={businessInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter
                    size={50}
                    className="cursor-pointer p-2 hover:bg-white text-[#c09d5b] rounded-md ring-yellow-200 "
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
