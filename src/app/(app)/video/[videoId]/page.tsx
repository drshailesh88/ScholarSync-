import { VideoReadingRoom } from "@/components/video/VideoReadingRoom";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  return <VideoReadingRoom videoId={videoId} />;
}
