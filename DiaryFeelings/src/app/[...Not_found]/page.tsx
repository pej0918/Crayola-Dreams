import { notFound } from "next/navigation"

export default function NotFouncCatchAll() {
    notFound()
    return null;
}