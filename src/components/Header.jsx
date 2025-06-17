import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import pb from "../pb";
import { useParams } from "react-router-dom";

const Header = ({ onSearchTerm, onSetSearchTerm }) => {
  const [business, setBusiness] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const {slug} = useParams();


  const fetchBusiness = async () => {
    pb.autoCancellation(false);
    try {
      const records = await pb
        .collection("businesses")
        .getFirstListItem(`slug = "${slug}"`, {});
      setBusiness(records);
    } catch (error) {
      console.log("error");
      setBusiness({});
    }
  };
  useEffect(() => {
    fetchBusiness();
  }, []);
  return (
    <div
      className="bg-[black] font-kugile text-white flex flex-col items-center py-5 px-10 bg-cover w-screen h-[600px]"
      style={{ backgroundImage: "url('public/black-gray.png')" }}
    >
      <div className="absolute mx-auto mt-5">
        <div className=" flex justify-around items-center gap-7 cursor-pointer">
          <p className="text-[13px] hover:text-[#c09d5b] hover:underline">
            HOME
          </p>
          <p className="text-[13px] hover:text-[#c09d5b] hover:underline">
            ABOUT
          </p>
          <p className="text-[13px] hover:text-[#c09d5b] hover:underline">
            CONTACT
          </p>
        </div>
      </div>
      <div className=" flex justify-between gap-7 w-full p-4">
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          {business.logo &&
          
          <img
            className="w-16 h-9 bg-cover"
            src={pb.files.getURL(business, business.logo)}
            alt={business.name}
          />
          }
          <p className="text-[16px] uppercase">{business.name}</p>
        </div>
        <div className=" flex gap-2 justify-center items-center  ">
          <div
            className={`flex items-center border border-[#c09d5b] rounded-md p-2 bg-white transition-all duration-300 ease-in-out h-10 ${
              isOpen ? "w-64 " : "w-10"
            }`}
          >
            <i
              onClick={() => setIsOpen(!isOpen)}
              className="fa-solid fa-magnifying-glass cursor-pointer text-black "
            ></i>
            <input
              type="text"
              placeholder="SEARCH..."
              value={onSearchTerm}
              onChange={(e) => onSetSearchTerm(e.target.value)}
              className={`ml-2 outline-none text-sm text-black transition-opacity duration-300 p-2 h-full ${
                isOpen ? "opacity-100 w-full" : "opacity-0 w-0"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-8">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className="  text-[#c09d5b] w-6 h-6 fill-yellow-200"
          />
        ))}
      </div>
      <p className="italic mt-5">PRESENTING TO YOU...</p>
      <p className="mt-8 text-6xl">THE BEST E-MENU SYSTEM IN CAMBODIA</p>
      <p className="mt-8 text-6xl text-[#c09d5b] font-bold italic">MENUEW</p>
      <div className="font-bold px-5 py-2 bg-[#c09d5b] mt-8 hover:bg-[#a68b59] cursor-pointer">
        EMAIL US
      </div>
    </div>
  );
};

export default Header;
