"use client";
import { Card, CardContent, CardTitle, cardVariants } from "../ui/card";

const OpacityTextBox = ({ title, content, variant, className }) => {
  return (
    <Card
      className={
        className
          ? `${cardVariants({ variant: "opacity" })} ${className} h-[15rem] flex-col w-[15rem]`
          : `${cardVariants({ variant: "opacity" })} h-[15rem] flex-col w-[15rem]`
      }
    >
      <CardTitle>{title}</CardTitle>

      <CardContent className="whitespace-pre-wrap flex-grow overflow-y-auto">
        {content}
      </CardContent>
    </Card>
  );
};

export default OpacityTextBox;
