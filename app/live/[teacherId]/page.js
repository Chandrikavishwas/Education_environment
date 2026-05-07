'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Radio, RefreshCw, Calendar, Clock, RotateCcw } from 'lucide-react';
import contentService from '@/services/content.service';
import { ScheduleBadge } from '@/components/shared/StatusBadge';
import EmptyState from '@/components/shared/EmptyState';
import { formatDateTime } from '@/utils/helpers';
import { POLLING_INTERVAL_MS } from '@/utils/constants';

export default function LivePage() {
  const { teacherId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchLive = useCallback(async () => {
    setError(null);
    try {
      const data = await contentService.getLiveContent(teacherId);
      setItems(data);
      setLastRefresh(new Date());
      setActiveIndex(0);
    } catch (err) {
      setError(err?.message || 'Failed to load live content.');
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  // Initial load
  useEffect(() => { fetchLive(); }, [fetchLive]);

  // Auto-poll every 30 seconds
  useEffect(() => {
    const timer = setInterval(fetchLive, POLLING_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [fetchLive]);

  // Rotate through items based on their rotation duration
  useEffect(() => {
    if (items.length <= 1) return;
    const current = items[activeIndex];
    const duration = (current?.rotationDuration ?? 30) * 1000;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [activeIndex, items]);

  const activeItem = items[activeIndex];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-indigo-600 rounded-lg">
            <Radio size={16} className="text-white" />
          </div>
          <span className="font-bold text-white">EduBroadcast Live</span>
          {!loading && items.length > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 ml-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            Updated {lastRefresh.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchLive}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw size={15} className="text-gray-400" />
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center p-4">
        {loading && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
            <p className="text-gray-400 text-sm">Loading live content…</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center">
            <p className="text-red-400 text-sm mb-3">{error}</p>
            <button
              onClick={fetchLive}
              className="text-sm text-indigo-400 underline hover:text-indigo-300"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center max-w-sm">
            <div className="p-4 bg-gray-800 rounded-2xl inline-block mb-4">
              <Radio size={32} className="text-gray-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-300 mb-2">No content available</h2>
            <p className="text-sm text-gray-500">
              There is no live content at this time. Check back later or refresh the page.
            </p>
          </div>
        )}

        {!loading && !error && activeItem && (
          <div className="w-full max-w-3xl">
            {/* Content display */}
            <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
              <div className="relative">
                <img
                  src={activeItem.fileUrl}
                  alt={activeItem.title}
                  className="w-full max-h-[60vh] object-contain bg-black"
                />
                {/* Rotation indicator */}
                {items.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {items.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === activeIndex ? 'bg-white w-5' : 'bg-white/40'
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
                  {activeItem.subject}
                </p>
                <h1 className="text-2xl font-bold text-white mb-2">{activeItem.title}</h1>
                {activeItem.description && (
                  <p className="text-gray-400 text-sm mb-4">{activeItem.description}</p>
                )}

                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} /> {formatDateTime(activeItem.startTime)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} /> until {formatDateTime(activeItem.endTime)}
                  </div>
                  {activeItem.rotationDuration && (
                    <div className="flex items-center gap-1.5">
                      <RotateCcw size={12} /> {activeItem.rotationDuration}s rotation
                    </div>
                  )}
                  <ScheduleBadge startTime={activeItem.startTime} endTime={activeItem.endTime} />
                </div>

                {/* Slide counter */}
                {items.length > 1 && (
                  <p className="text-xs text-gray-600 mt-4">
                    Showing {activeIndex + 1} of {items.length} live items
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="px-6 py-3 text-center text-xs text-gray-700 border-t border-gray-900">
        Auto-refreshes every 30 seconds · EduBroadcast © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
