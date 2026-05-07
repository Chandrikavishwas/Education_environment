'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Generic data-fetching hook.
 * Handles loading, error, and success states for any async fetch function.
 *
 * @param {Function} fetchFn - async function that returns data
 * @param {Array}    deps    - dependency array (re-fetches when these change)
 */
export function useContent(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
