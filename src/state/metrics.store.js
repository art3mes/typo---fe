import { create } from 'zustand';
import { createSelector } from 'better-zustand-selector';

export const metricsStore = create((set) => ({
    errorPercentage: 0,
    wpm: 0,
    rawWpm: 0,
    cpm: 0,
    updateMetrics: (metrics) => {
        set(metrics);
    },
}));

export const useMetricsStore = createSelector(metricsStore);
