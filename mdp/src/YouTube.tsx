import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCHz4r-MCVqe6E4bZEiHJIwA";

type VideoData = {
  videoId: string;
  title: string;
};

const CACHE_KEY = "latestYouTubeVideo";
const CACHE_TTL_MS = 1000 * 60 * 60 * 6;

const YouTube: React.FC = () => {
  const [video, setVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      // Check localStorage cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            setVideo(parsed.video);
            setLoading(false);
            return;
          }
        } catch {
          // ignore parsing errors and fall through
        }
      }

      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
        );
        const data = await res.json();
        const latest = data.items?.[0];
        if (latest?.id?.videoId) {
          const videoData = {
            videoId: latest.id.videoId,
            title: latest.snippet.title,
          };
          setVideo(videoData);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ video: videoData, timestamp: Date.now() })
          );
        } else {
          setVideo(null);
        }
      } catch (error) {
        console.error("Failed to fetch latest YouTube video:", error);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  if (loading) return <p>Loading latest Muddy Duck Offroad video…</p>;
  if (!video) return <p className="text-red-500">Couldn’t load the latest video.</p>;

  return (
    <div className="w-full aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
        title={video.title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTube;
