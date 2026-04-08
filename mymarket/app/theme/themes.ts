// Definicje 3 profesjonalnych palet kolorystycznych dla systemu Pallettes

export interface ThemeColors {
  name: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  surface: string;
  surfaceForeground: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  error: string;
  errorForeground: string;
  info: string;
  infoForeground: string;
  // Status colors
  statusNew: string;
  statusInProgress: string;
  statusCompleted: string;
  statusCancelled: string;
  statusPending: string;
  statusAccepted: string;
  statusRejected: string;
  statusAvailable: string;
  statusLowStock: string;
  statusOutOfStock: string;
  // Chart colors
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

// 1. CORPORATE: Granat, stalowy niebieski, biel, neutralne szarości
export const corporateTheme: ThemeColors = {
  name: 'Corporate',
  primary: '#1e3a8a', // Granat
  primaryForeground: '#ffffff',
  secondary: '#64748b', // Stalowy niebieski
  secondaryForeground: '#ffffff',
  accent: '#3b82f6', // Jasny niebieski
  accentForeground: '#ffffff',
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceForeground: '#0f172a',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  success: '#10b981',
  successForeground: '#ffffff',
  warning: '#f59e0b',
  warningForeground: '#ffffff',
  error: '#ef4444',
  errorForeground: '#ffffff',
  info: '#3b82f6',
  infoForeground: '#ffffff',
  // Status
  statusNew: '#3b82f6',
  statusInProgress: '#f59e0b',
  statusCompleted: '#10b981',
  statusCancelled: '#6b7280',
  statusPending: '#f59e0b',
  statusAccepted: '#10b981',
  statusRejected: '#ef4444',
  statusAvailable: '#10b981',
  statusLowStock: '#f59e0b',
  statusOutOfStock: '#ef4444',
  // Charts
  chart1: '#1e3a8a',
  chart2: '#3b82f6',
  chart3: '#64748b',
  chart4: '#10b981',
  chart5: '#f59e0b',
};

// 2. INDUSTRIAL: Grafit, chłodne szarości, akcent pomarańczowy
export const industrialTheme: ThemeColors = {
  name: 'Industrial',
  primary: '#18181b', // Grafit
  primaryForeground: '#ffffff',
  secondary: '#52525b', // Chłodna szarość
  secondaryForeground: '#ffffff',
  accent: '#f97316', // Pomarańczowy
  accentForeground: '#ffffff',
  background: '#fafafa',
  surface: '#ffffff',
  surfaceForeground: '#09090b',
  textPrimary: '#09090b',
  textSecondary: '#71717a',
  border: '#e4e4e7',
  success: '#22c55e',
  successForeground: '#ffffff',
  warning: '#f97316',
  warningForeground: '#ffffff',
  error: '#dc2626',
  errorForeground: '#ffffff',
  info: '#3b82f6',
  infoForeground: '#ffffff',
  // Status
  statusNew: '#3b82f6',
  statusInProgress: '#f97316',
  statusCompleted: '#22c55e',
  statusCancelled: '#71717a',
  statusPending: '#f97316',
  statusAccepted: '#22c55e',
  statusRejected: '#dc2626',
  statusAvailable: '#22c55e',
  statusLowStock: '#f97316',
  statusOutOfStock: '#dc2626',
  // Charts
  chart1: '#18181b',
  chart2: '#52525b',
  chart3: '#f97316',
  chart4: '#22c55e',
  chart5: '#3b82f6',
};

// 3. ANALYTICS: Ciemny granat, turkus, jasne tła, nowoczesne neutralne
export const analyticsTheme: ThemeColors = {
  name: 'Analytics',
  primary: '#0f172a', // Ciemny granat
  primaryForeground: '#ffffff',
  secondary: '#334155', // Granatowo-szary
  secondaryForeground: '#ffffff',
  accent: '#06b6d4', // Turkus
  accentForeground: '#ffffff',
  background: '#f1f5f9',
  surface: '#ffffff',
  surfaceForeground: '#0f172a',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  border: '#cbd5e1',
  success: '#14b8a6',
  successForeground: '#ffffff',
  warning: '#f59e0b',
  warningForeground: '#ffffff',
  error: '#f43f5e',
  errorForeground: '#ffffff',
  info: '#06b6d4',
  infoForeground: '#ffffff',
  // Status
  statusNew: '#06b6d4',
  statusInProgress: '#f59e0b',
  statusCompleted: '#14b8a6',
  statusCancelled: '#64748b',
  statusPending: '#f59e0b',
  statusAccepted: '#14b8a6',
  statusRejected: '#f43f5e',
  statusAvailable: '#14b8a6',
  statusLowStock: '#f59e0b',
  statusOutOfStock: '#f43f5e',
  // Charts
  chart1: '#0f172a',
  chart2: '#06b6d4',
  chart3: '#334155',
  chart4: '#14b8a6',
  chart5: '#f59e0b',
};

export const themes = {
  corporate: corporateTheme,
  industrial: industrialTheme,
  analytics: analyticsTheme,
};

export type ThemeName = keyof typeof themes;
