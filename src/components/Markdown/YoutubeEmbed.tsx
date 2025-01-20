const YOUTUBE_PATTERNS = [
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/i,
  /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?]+)/i,
] as const;

const getYouTubeVideoId = (url: string): string | null => {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

export const YouTubeEmbed = ({ url }: { url: string }) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return <a href={url}>{url}</a>;

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full aspect-video rounded-lg my-4"
    />
  );
};
