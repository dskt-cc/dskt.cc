import React from "react";

export const CustomParagraph = ({
  children,
  node,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any;
}) => {
  // Check if paragraph only contains an image
  const hasOnlyImage =
    node.children.length === 1 &&
    node.children[0].type === "element" &&
    node.children[0].tagName === "img";

  // Check if paragraph only contains a YouTube embed
  const hasOnlyYouTube =
    node.children.length === 1 &&
    node.children[0].type === "element" &&
    node.children[0].tagName === "a" &&
    (node.children[0].properties?.href?.includes("youtube.com") ||
      node.children[0].properties?.href?.includes("youtu.be"));

  // If it only contains an image or YouTube embed, don't wrap in <p>
  if (hasOnlyImage || hasOnlyYouTube) {
    return <>{children}</>;
  }

  return <p>{children}</p>;
};
