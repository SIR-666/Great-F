import { useEffect, useState, useRef } from "react";
import { API_URL3 } from "@/config/index";

export default function MooNewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0); // index of main news

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${API_URL3}/api/news`);
        const result = await res.json();
        if (result && Array.isArray(result.data)) {
          // Sort descending by created_at (terbaru di depan)
          const sorted = [...result.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setNews(sorted);
        } else if (Array.isArray(result)) {
          const sorted = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setNews(sorted);
        } else {
          setNews([]);
        }
      } catch (err) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  // Use a mapping object for image indexes per NewsID
  const [sideImageIndexes, setSideImageIndexes] = useState({});
  const intervalRef = useRef();

  // Always define mainNews and sideNews after hooks
  let mainNews = null;
  let sideNews = [];
  if (news.length) {
    mainNews = news[selectedIdx];
    sideNews = news.filter((_, idx) => idx !== selectedIdx);
  }

  // Reset indexes when news changes (preserve existing if possible)
  useEffect(() => {
    setSideImageIndexes((prev) => {
      const next = {};
      sideNews.forEach((item) => {
        next[item.NewsID] = prev[item.NewsID] || 0;
      });
      return next;
    });
  }, [sideNews.map((n) => n.NewsID).join(",")]);

  // Carousel effect: cycle image every 3s
  useEffect(() => {
    if (!sideNews.length) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSideImageIndexes((prev) => {
        const next = { ...prev };
        sideNews.forEach((item) => {
          const images = item.Images || [];
          if (!images.length) {
            next[item.NewsID] = 0;
          } else {
            const cur = prev[item.NewsID] || 0;
            next[item.NewsID] = (cur + 1) % images.length;
          }
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [sideNews.map((n) => n.NewsID).join(",")]);

  if (loading) return <p>Loading Moo News...</p>;
  if (!news.length) return <p>No Moo News found.</p>;

  return (
    <>
      <div
        className="moo-news-flex"
        style={{
          display: "flex",
          gap: 32,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Main News */}
        <div
          className="moo-news-main"
          style={{
            flex: 2,
            minWidth: 0,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px #0001",
            padding: 24,
            width: "100%",
            boxSizing: "border-box",
            maxWidth: "100%",
          }}
        >
          <h2 style={{ fontSize: 28, marginBottom: 12 }}>{mainNews.Volume}</h2>
          <div style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>
            {mainNews.created_at &&
              new Date(mainNews.created_at).toLocaleDateString()}
          </div>
          {mainNews.Images && mainNews.Images.length > 0 ? (
            <div style={{ width: "100%", marginBottom: 16 }}>
              {mainNews.Images.map((img) => (
                <img
                  key={img.ImageID}
                  src={`${API_URL3}/${img.ImageUrl}`}
                  alt="Moo News"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 12,
                    boxShadow: "0 2px 12px #0002",
                    marginBottom: 18,
                    display: "block",
                    objectFit: "unset",
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              style={{ color: "#aaa", fontStyle: "italic", marginBottom: 16 }}
            >
              No images for this news.
            </div>
          )}
          <div style={{ color: "#666", fontSize: 16 }}>
            {/* Bisa tambahkan konten/summary jika ada */}
          </div>
        </div>

        {/* Side News Accordion */}
        <div
          className="moo-news-side"
          style={{
            flex: 1,
            minWidth: 220,
            maxWidth: 400,
            width: "100%",
            boxSizing: "border-box",
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 12,
              
              textAlign: "left",
            }}
          >
            Moo News Lainnya
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxHeight: 1220,
              overflowY: "auto",
            }}
          >
            {sideNews.map((item) => {
              const realIdx = news.findIndex((n) => n.NewsID === item.NewsID);
              const images = item.Images || [];
              const curImgIdx = sideImageIndexes[item.NewsID] || 0;
              const showImg = images[curImgIdx];
              return (
                <div
                  key={item.NewsID}
                  onClick={() => setSelectedIdx(realIdx)}
                  style={{
                    cursor: "pointer",
                    background: realIdx === selectedIdx ? "#e0e7ff" : "#f3f4f6",
                    borderRadius: 12,
                    padding: "10px 10px 18px 10px",
                    boxShadow:
                      realIdx === selectedIdx ? "0 2px 8px #2563eb22" : "none",
                    border:
                      realIdx === selectedIdx
                        ? "2px solid #2563eb"
                        : "1px solid #e5e7eb",
                    transition: "all 0.15s",
                    fontSize: "clamp(13px, 2vw, 16px)",
                    minWidth: 0,
                    wordBreak: "break-word",
                    width: "100%",
                    maxWidth: 360,
                    margin: "0 auto",
                  }}
                >
                  <div
                    style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}
                  >
                    {item.Volume}
                  </div>
                  <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>
                    {item.created_at &&
                      new Date(item.created_at).toLocaleDateString()}
                  </div>
                  {showImg ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 0,
                      }}
                    >
                      <img
                        key={showImg.ImageID}
                        src={`${API_URL3}/${showImg.ImageUrl}`}
                        alt="thumb"
                        style={{
                          width: "100%",
                          maxWidth: 320,
                          height: 180,
                          objectFit: "cover",
                          borderRadius: 10,
                          boxShadow: "0 2px 12px #0001",
                          display: "block",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: 320,
                        height: 180,
                        background: "#eee",
                        borderRadius: 10,
                        margin: "0 auto",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Responsive style for mobile */}
      <style>{`
        @media (max-width: 900px) {
          .moo-news-flex {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .moo-news-main, .moo-news-side {
            max-width: 100% !important;
            width: 100% !important;
          }
          .moo-news-side {
            margin-top: 0 !important;
            position: static !important;
          }
        }
        @media (min-width: 900px) {
          .moo-news-side {
            position: sticky !important;
            top: 32px !important;
            align-self: flex-start !important;
          }
        }
      `}</style>
    </>
  );
}
