import BookDetails from "@/components/books/BookDetails";

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <BookDetails id={id} />;
}
