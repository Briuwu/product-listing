"use client";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "./ui/button";

type Props = {
  mobile: string;
  tablet: string;
  desktop: string;
};
export const CardImg = ({ desktop, mobile, tablet }: Props) => {
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery("only screen and (min-width : 993px)");

  let img = isMediumDevice ? tablet : isLargeDevice ? desktop : mobile;
  return <img src={img.substring(1)} alt="" />;
};
