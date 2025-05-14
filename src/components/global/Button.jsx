"use client";
import Link from "next/link";

const Button = ({ link, text, onClick }) => {
  if (link) {
    return (
      <Link href={link} className={`p-2 rounded-xs`}>
        <button>{text}</button>
      </Link>
    );
  } else {
    return <button className={`p-2 rounded-xs`} onClick={onClick}></button>;
  }
};
export default Button;
