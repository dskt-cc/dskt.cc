import localFont from "next/font/local";

const voc = localFont({
  src: [
    {
      path: "VOC-RE.woff",
    },
    {
      path: "VOC-IT.woff",
    },
  ],
});

export default voc;
