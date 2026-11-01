import EditBook from "@/components/books/EditBook";

interface EditBookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params;

  return <EditBook bookId={id} />;
}
