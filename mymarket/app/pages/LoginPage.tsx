"use client";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Package, Mail, Lock, ArrowRight } from "lucide-react";
import { useTheme } from "../theme/theme-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function LoginPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - w prawdziwej aplikacji tutaj byłaby weryfikacja
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <Package
                className="w-8 h-8"
                style={{ color: colors.primaryForeground }}
              />
            </div>
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: colors.textPrimary }}
          >
            Pallettes
          </h1>
          <p style={{ color: colors.textSecondary }}>
            System zarządzania paletami
          </p>
        </div>

        {/* Login Form */}
        <div
          className="rounded-xl p-8 border shadow-lg"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: colors.textPrimary }}
          >
            Zaloguj się
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" style={{ color: colors.textPrimary }}>
                Email
              </Label>
              <div className="relative mt-2">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: colors.textSecondary }}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" style={{ color: colors.textPrimary }}>
                Hasło
              </Label>
              <div className="relative mt-2">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: colors.textSecondary }}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded"
                  style={{ accentColor: colors.primary }}
                />
                <span style={{ color: colors.textSecondary }}>
                  Zapamiętaj mnie
                </span>
              </label>
              <a
                href="#"
                className="font-medium hover:underline"
                style={{ color: colors.accent }}
              >
                Zapomniałeś hasła?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              style={{
                backgroundColor: colors.primary,
                color: colors.primaryForeground,
              }}
            >
              Zaloguj się
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div
            className="mt-6 text-center text-sm"
            style={{ color: colors.textSecondary }}
          >
            Nie masz konta?{" "}
            <a
              href="#"
              className="font-medium hover:underline"
              style={{ color: colors.accent }}
            >
              Skontaktuj się z administratorem
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-8 text-center text-sm"
          style={{ color: colors.textSecondary }}
        >
          <p>© 2026 Pallettes. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </div>
  );
}
