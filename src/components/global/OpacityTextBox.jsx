"use client";
import { Card, CardContent, CardTitle, cardVariants } from "../ui/card";

const OpacityTextBox = ({ title, content, className, date }) => {
  return (
    <Card
      className={
        className
          ? `${cardVariants({ variant: "opacity" })} ${className}`
          : cardVariants({ variant: "opacity" })
      }
    >
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <p>{date}</p>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

export default OpacityTextBox;
