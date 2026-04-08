"use client";
import { useState } from "react";
import { Search, Filter, Plus, Eye, Download } from "lucide-react";
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

// Mock data
const orders = [
  {
    id: "ZAM-2026-001",
    customer: "Firma ABC Sp. z o.o.",
    date: "2026-03-06",
    status: "new",
    items: "EUR x 100, Industrial x 50",
    amount: 12450,
    payment: "pending",
  },
  {
    id: "ZAM-2026-002",
    customer: "Logistyka XYZ",
    date: "2026-03-06",
    status: "inProgress",
    items: "US x 75",
    amount: 8900,
    payment: "paid",
  },
  {
    id: "ZAM-2026-003",
    customer: "Transport 24",
    date: "2026-03-05",
    status: "completed",
    items: "EUR x 120",
    amount: 15200,
    payment: "paid",
  },
  {
    id: "ZAM-2026-004",
    customer: "Magazyny Polski",
    date: "2026-03-05",
    status: "inProgress",
    items: "Industrial x 100, CP x 80",
    amount: 22100,
    payment: "paid",
  },
  {
    id: "ZAM-2026-005",
    customer: "Hurtownia Palet",
    date: "2026-03-04",
    status: "completed",
    items: "EUR x 200",
    amount: 25400,
    payment: "paid",
  },
  {
    id: "ZAM-2026-006",
    customer: "EcoLog Sp. z o.o.",
    date: "2026-03-04",
    status: "cancelled",
    items: "US x 50",
    amount: 5900,
    payment: "cancelled",
  },
];

export function OrdersPage() {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusLabels: Record<string, string> = {
    new: "Nowe",
    inProgress: "W realizacji",
    completed: "Zrealizowane",
    cancelled: "Anulowane",
  };

  const statusColors: Record<string, string> = {
    new: colors.statusNew,
    inProgress: colors.statusInProgress,
    completed: colors.statusCompleted,
    cancelled: colors.statusCancelled,
  };

  const paymentLabels: Record<string, string> = {
    pending: "Oczekująca",
    paid: "Opłacona",
    cancelled: "Anulowana",
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
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
            Zamówienia
          </h1>
          <p style={{ color: colors.textSecondary }}>
            Zarządzaj zamówieniami sprzedaży palet
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
          Nowe zamówienie
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
              placeholder="Szukaj po numerze zamówienia lub kliencie..."
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
              <SelectItem value="new">Nowe</SelectItem>
              <SelectItem value="inProgress">W realizacji</SelectItem>
              <SelectItem value="completed">Zrealizowane</SelectItem>
              <SelectItem value="cancelled">Anulowane</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Więcej filtrów
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Wszystkie",
            count: orders.length,
            color: colors.textSecondary,
          },
          {
            label: "Nowe",
            count: orders.filter((o) => o.status === "new").length,
            color: colors.statusNew,
          },
          {
            label: "W realizacji",
            count: orders.filter((o) => o.status === "inProgress").length,
            color: colors.statusInProgress,
          },
          {
            label: "Zrealizowane",
            count: orders.filter((o) => o.status === "completed").length,
            color: colors.statusCompleted,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{ color: colors.textSecondary }}
            >
              {stat.label}
            </p>
            <p className="text-2xl font-semibold" style={{ color: stat.color }}>
              {stat.count}
            </p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
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
                Nr zamówienia
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Klient
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Data
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Pozycje
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Kwota
              </TableHead>
              <TableHead style={{ color: colors.textSecondary }}>
                Płatność
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
            {filteredOrders.map((order) => (
              <TableRow
                key={order.id}
                style={{ borderColor: colors.border }}
                className="hover:bg-opacity-50"
              >
                <TableCell
                  className="font-medium"
                  style={{ color: colors.textPrimary }}
                >
                  {order.id}
                </TableCell>
                <TableCell style={{ color: colors.textPrimary }}>
                  {order.customer}
                </TableCell>
                <TableCell style={{ color: colors.textSecondary }}>
                  {order.date}
                </TableCell>
                <TableCell style={{ color: colors.textSecondary }}>
                  <span className="text-sm">{order.items}</span>
                </TableCell>
                <TableCell
                  className="font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  {order.amount.toLocaleString("pl-PL")} PLN
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {paymentLabels[order.payment]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    style={{
                      backgroundColor: statusColors[order.status] + "20",
                      color: statusColors[order.status],
                    }}
                  >
                    {statusLabels[order.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          Pokazano {filteredOrders.length} z {orders.length} zamówień
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Poprzednia
          </Button>
          <Button variant="outline" size="sm">
            Następna
          </Button>
        </div>
      </div>
    </div>
  );
}
