"use client";
import { useState } from "react";
import {
  Search,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useTheme } from "../theme/theme-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

// Mock data
const buybackOffers = [
  {
    id: "SKUP-2026-001",
    supplier: "Firma Budowlana ABC",
    date: "2026-03-06",
    status: "pending",
    type: "EUR",
    quantity: 120,
    condition: "Dobry",
    offeredPrice: 45,
    marketPrice: 50,
    profitMargin: 82,
    profitability: "high",
  },
  {
    id: "SKUP-2026-002",
    supplier: "Magazyn XYZ",
    date: "2026-03-06",
    status: "pending",
    type: "Industrial",
    quantity: 80,
    condition: "Średni",
    offeredPrice: 38,
    marketPrice: 42,
    profitMargin: 57,
    profitability: "medium",
  },
  {
    id: "SKUP-2026-003",
    supplier: "Transport 24",
    date: "2026-03-05",
    status: "accepted",
    type: "EUR",
    quantity: 200,
    condition: "Bardzo dobry",
    offeredPrice: 48,
    marketPrice: 52,
    profitMargin: 79,
    profitability: "high",
  },
  {
    id: "SKUP-2026-004",
    supplier: "Logistyka Polska",
    date: "2026-03-05",
    status: "rejected",
    type: "US",
    quantity: 50,
    condition: "Zły",
    offeredPrice: 55,
    marketPrice: 56,
    profitMargin: 63,
    profitability: "low",
  },
  {
    id: "SKUP-2026-005",
    supplier: "Hurtownia Palet",
    date: "2026-03-04",
    status: "accepted",
    type: "Industrial",
    quantity: 150,
    condition: "Dobry",
    offeredPrice: 40,
    marketPrice: 44,
    profitMargin: 55,
    profitability: "medium",
  },
];

export function BuybackPage() {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOffer, setSelectedOffer] = useState<
    (typeof buybackOffers)[0] | null
  >(null);

  const statusLabels: Record<string, string> = {
    pending: "Oczekująca",
    accepted: "Zaakceptowana",
    rejected: "Odrzucona",
  };

  const statusColors: Record<string, string> = {
    pending: colors.statusPending,
    accepted: colors.statusAccepted,
    rejected: colors.statusRejected,
  };

  const profitabilityLabels: Record<string, string> = {
    high: "Wysoka",
    medium: "Średnia",
    low: "Niska",
  };

  const profitabilityColors: Record<string, string> = {
    high: colors.success,
    medium: colors.warning,
    low: colors.error,
  };

  const filteredOffers = buybackOffers.filter((offer) => {
    const matchesSearch =
      offer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-semibold mb-2"
            style={{ color: colors.textPrimary }}
          >
            Skup palet
          </h1>
          <p style={{ color: colors.textSecondary }}>
            Zarządzaj ofertami skupu i oceniaj ich opłacalność
          </p>
        </div>
        <Button
          className="gap-2"
          style={{
            backgroundColor: colors.primary,
            color: colors.primaryForeground,
          }}
        >
          <Plus className="w-4 h-4" />
          Nowa oferta skupu
        </Button>
      </div>

      {/* Filters */}
      <div
        className="rounded-lg p-6 border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: colors.textSecondary }}
            />
            <Input
              placeholder="Szukaj po numerze oferty lub dostawcy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie statusy</SelectItem>
              <SelectItem value="pending">Oczekujące</SelectItem>
              <SelectItem value="accepted">Zaakceptowane</SelectItem>
              <SelectItem value="rejected">Odrzucone</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Oczekujące",
            count: buybackOffers.filter((o) => o.status === "pending").length,
            color: colors.statusPending,
            icon: Clock,
          },
          {
            label: "Zaakceptowane",
            count: buybackOffers.filter((o) => o.status === "accepted").length,
            color: colors.statusAccepted,
            icon: CheckCircle,
          },
          {
            label: "Odrzucone",
            count: buybackOffers.filter((o) => o.status === "rejected").length,
            color: colors.statusRejected,
            icon: XCircle,
          },
          {
            label: "Wysoka rentowność",
            count: buybackOffers.filter((o) => o.profitability === "high")
              .length,
            color: colors.success,
            icon: TrendingUp,
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-lg p-4 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: colors.textSecondary }}
                >
                  {stat.label}
                </p>
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p
                className="text-2xl font-semibold"
                style={{ color: stat.color }}
              >
                {stat.count}
              </p>
            </div>
          );
        })}
      </div>

      {/* Offers Table */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: colors.border }}>
              <TableHead style={{ color: colors.textSecondary }}>
                Nr oferty
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Dostawca
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Data
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>Typ</TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Ilość
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Stan
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Cena oferty
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Opłacalność
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Status
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Akcje
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffers.map((offer) => (
              <TableRow key={offer.id} style={{ borderColor: colors.border }}>
                <TableCell
                  className="font-medium"
                  style={{ color: colors.textPrimary }}
                >
                  {offer.id}
                </TableCell>
                <TableCell style={{ color: colors.textPrimary }}>
                  {offer.supplier}
                </TableCell>
                <TableCell style={{ color: colors.textSecondary }}>
                  {offer.date}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{offer.type}</Badge>
                </TableCell>
                <TableCell style={{ color: colors.textPrimary }}>
                  {offer.quantity} szt
                </TableCell>
                <TableCell style={{ color: colors.textSecondary }}>
                  {offer.condition}
                </TableCell>
                <TableCell
                  className="font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  {offer.offeredPrice} PLN
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {offer.profitability === "high" ? (
                      <TrendingUp
                        className="w-4 h-4"
                        style={{
                          color: profitabilityColors[offer.profitability],
                        }}
                      />
                    ) : (
                      <TrendingDown
                        className="w-4 h-4"
                        style={{
                          color: profitabilityColors[offer.profitability],
                        }}
                      />
                    )}
                    <Badge
                      style={{
                        backgroundColor:
                          profitabilityColors[offer.profitability] + "20",
                        color: profitabilityColors[offer.profitability],
                      }}
                    >
                      {profitabilityLabels[offer.profitability]}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    style={{
                      backgroundColor: statusColors[offer.status] + "20",
                      color: statusColors[offer.status],
                    }}
                  >
                    {statusLabels[offer.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOffer(offer)}
                      >
                        Szczegóły
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Ocena opłacalności oferty</DialogTitle>
                        <DialogDescription>
                          {selectedOffer?.id} - {selectedOffer?.supplier}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedOffer && (
                        <div className="space-y-6 py-4">
                          {/* Offer Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Typ palety</Label>
                              <p className="text-lg font-semibold mt-1">
                                {selectedOffer.type}
                              </p>
                            </div>
                            <div>
                              <Label>Ilość</Label>
                              <p className="text-lg font-semibold mt-1">
                                {selectedOffer.quantity} szt
                              </p>
                            </div>
                            <div>
                              <Label>Stan</Label>
                              <p className="text-lg font-semibold mt-1">
                                {selectedOffer.condition}
                              </p>
                            </div>
                            <div>
                              <Label>Cena oferowana</Label>
                              <p className="text-lg font-semibold mt-1">
                                {selectedOffer.offeredPrice} PLN/szt
                              </p>
                            </div>
                          </div>

                          {/* Profitability Analysis */}
                          <div
                            className="p-4 rounded-lg border"
                            style={{
                              backgroundColor: colors.background,
                              borderColor: colors.border,
                            }}
                          >
                            <h4
                              className="font-semibold mb-4"
                              style={{ color: colors.textPrimary }}
                            >
                              Analiza rentowności
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span style={{ color: colors.textSecondary }}>
                                  Cena rynkowa sprzedaży:
                                </span>
                                <span
                                  className="font-semibold"
                                  style={{ color: colors.textPrimary }}
                                >
                                  {selectedOffer.marketPrice} PLN/szt
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span style={{ color: colors.textSecondary }}>
                                  Cena zakupu (oferta):
                                </span>
                                <span
                                  className="font-semibold"
                                  style={{ color: colors.textPrimary }}
                                >
                                  {selectedOffer.offeredPrice} PLN/szt
                                </span>
                              </div>
                              <div
                                className="h-px"
                                style={{ backgroundColor: colors.border }}
                              />
                              <div className="flex justify-between items-center">
                                <span
                                  className="font-semibold"
                                  style={{ color: colors.textPrimary }}
                                >
                                  Przewidywana marża:
                                </span>
                                <span
                                  className="text-xl font-semibold"
                                  style={{ color: colors.success }}
                                >
                                  {selectedOffer.profitMargin} PLN/szt
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span
                                  className="font-semibold"
                                  style={{ color: colors.textPrimary }}
                                >
                                  Całkowity zysk:
                                </span>
                                <span
                                  className="text-xl font-semibold"
                                  style={{ color: colors.success }}
                                >
                                  {(
                                    selectedOffer.profitMargin *
                                    selectedOffer.quantity
                                  ).toLocaleString("pl-PL")}{" "}
                                  PLN
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Recommendation */}
                          <div
                            className="p-4 rounded-lg border-l-4"
                            style={{
                              backgroundColor: colors.background,
                              borderLeftColor:
                                profitabilityColors[
                                  selectedOffer.profitability
                                ],
                            }}
                          >
                            <div className="flex items-start gap-3">
                              {selectedOffer.profitability === "high" ? (
                                <TrendingUp
                                  className="w-5 h-5 mt-0.5"
                                  style={{
                                    color:
                                      profitabilityColors[
                                        selectedOffer.profitability
                                      ],
                                  }}
                                />
                              ) : (
                                <TrendingDown
                                  className="w-5 h-5 mt-0.5"
                                  style={{
                                    color:
                                      profitabilityColors[
                                        selectedOffer.profitability
                                      ],
                                  }}
                                />
                              )}
                              <div>
                                <p
                                  className="font-semibold mb-1"
                                  style={{ color: colors.textPrimary }}
                                >
                                  {selectedOffer.profitability === "high"
                                    ? "Rekomendacja: AKCEPTUJ"
                                    : selectedOffer.profitability === "medium"
                                      ? "Rekomendacja: ROZWAŻ"
                                      : "Rekomendacja: ODRZUĆ"}
                                </p>
                                <p
                                  className="text-sm"
                                  style={{ color: colors.textSecondary }}
                                >
                                  {selectedOffer.profitability === "high"
                                    ? "Oferta wysoce rentowna. Przewidywana marża znacznie przekracza średnią."
                                    : selectedOffer.profitability === "medium"
                                      ? "Oferta umiarkowanie rentowna. Rozważ negocjacje ceny."
                                      : "Oferta niskrentowna. Nie zalecamy przyjęcia w obecnej formie."}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        {selectedOffer?.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              style={{
                                borderColor: colors.error,
                                color: colors.error,
                              }}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Odrzuć
                            </Button>
                            <Button
                              style={{
                                backgroundColor: colors.success,
                                color: colors.successForeground,
                              }}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Akceptuj
                            </Button>
                          </>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
