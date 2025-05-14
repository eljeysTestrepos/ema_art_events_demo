"use client";
import { Card, CardContent, CardTitle, cardVariants } from "../ui/card";

const OpacityTextBox = ({ title, content, variant }) => {
  return (
    <Card className={cardVariants({ variant: "opacity" })}>
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <pre>{content}</pre>
      </CardContent>
    </Card>
  );
};

export default OpacityTextBox;
