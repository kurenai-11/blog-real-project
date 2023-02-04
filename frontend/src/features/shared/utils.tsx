import { useTransition } from "@react-spring/web";

// tailwind classes for shared components
// z--1 - below everything z-0 main content of the page
// z-1 above main content of the page
export type OpenedModal = null | "addBlog" | "editBlog" | "deleteBlog";
export const modalOverlayClasses =
  "fixed z-1 top-0 left-0 w-full h-full bg-zinc-9 bg-opacity-70";
export const modalClasses =
  "w-[80vw] bg-zinc-9 fixed z-2 left-10% top-20% items-center text-xl rounded-xl flex flex-col";
export const closeButtonClasses =
  "absolute left-[calc(100%-3rem)] w-12 h-12 text-4xl decoration-none flex justify-center items-center text-amber-3 outline-none border-none bg-red-5 rounded-xl cursor-pointer";
export const modalTitleClasses =
  "bg-zinc-8 w-full h-12 py-3 text-center rounded-xl mb-4";
// A custom hook to animate modal popups
export const useModalTransition = (openState: boolean) =>
  useTransition(openState, {
    from: {
      scale: 0.5,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0.5,
      opacity: 0,
    },
  });
