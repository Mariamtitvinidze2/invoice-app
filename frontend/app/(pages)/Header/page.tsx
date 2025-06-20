import Image from "next/image";
import React from "react";
import profile from "../../../Images/profile.png";

const Header = () => {
  return (
    <div className="fixed z-50 w-[80px] h-full bg-[#373B53] flex flex-col justify-between items-center rounded-r-[20px] overflow-hidden">
      <svg
        width="103"
        height="103"
        viewBox="0 0 103 103"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[110px] mt-[-16px]"
      >
        <path
          d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
          fill="#7C5DFA"
        />
        <mask
          id="mask0_1_42"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="103"
          height="103"
        >
          <path
            d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_1_42)">
          <path
            d="M103 52H20C8.95431 52 0 60.9543 0 72V135C0 146.046 8.95431 155 20 155H103V52Z"
            fill="#9277FF"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M42.6942 33.2922L52 51.9999L61.3058 33.2922C67.6645 36.6407 72 43.314 72 50.9999C72 62.0456 63.0457 70.9999 52 70.9999C40.9543 70.9999 32 62.0456 32 50.9999C32 43.314 36.3355 36.6407 42.6942 33.2922Z"
          fill="white"
        />
      </svg>

      <div className="flex flex-col items-center gap-4 pb-6">
        <svg
          width="90"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[20px] h-[20px] cursor-pointer"
        >
          <path
            d="M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z"
            fill="#7E88C3"
          />
        </svg>

        <div className="w-full h-[1px] bg-[#494E6E]" />
        <Image
          src={profile}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full border-white"
        />
      </div>
    </div>
  );
};

export default Header;
