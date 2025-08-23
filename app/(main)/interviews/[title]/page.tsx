import InterviewPage from "@/fsd/pages/interview/ui";

interface InterviewPageProps {
  params: Promise<{ title: string }>;
}

export default async function Interview({ params }: InterviewPageProps) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);

  return <InterviewPage title={decodedTitle} />;
}
