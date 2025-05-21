"use client";
import { Card, CardContent, CardTitle, cardVariants } from "../ui/card";

const OpacityTextBox = ({ title, content, variant, className }) => {
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
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

export default OpacityTextBox;
