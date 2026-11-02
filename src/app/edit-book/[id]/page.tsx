import { Suspense } from "react";
import EditBook from "@/components/books/EditBook";

interface EditBookPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function EditBookContent({ params }: EditBookPageProps) {
  const { id } = await params;

  return <EditBook bookId={id} />;
}

export default function EditBookPage({ params }: EditBookPageProps) {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading edit page...</div>}
    >
      <EditBookContent params={params} />
    </Suspense>
  );
}
