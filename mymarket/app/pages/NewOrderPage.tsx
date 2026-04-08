"use client";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { useTheme } from "../theme/theme-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const palletTypes = [
  { id: "EUR", name: "Paleta EUR / EPAL", price: 127 },
  { id: "Industrial", name: "Paleta Industrial", price: 95 },
  { id: "US", name: "Paleta US Standard", price: 118 },
  { id: "CP", name: "Paleta CP (ChemPal)", price: 72 },
];

interface OrderItem {
  id: number;
  type: string;
  quantity: number;
  price: number;
  total: number;
}

export function NewOrderPage() {
  const { colors } = useTheme();
  const [items, setItems] = useState<OrderItem[]>([
    { id: 1, type: "EUR", quantity: 1, price: 127, total: 127 },
  ]);

  const addItem = () => {
    const newId = Math.max(...items.map((i) => i.id), 0) + 1;
    setItems([
      ...items,
      { id: newId, type: "EUR", quantity: 1, price: 127, total: 127 },
    ]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, field: keyof OrderItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "type") {
            const pallet = palletTypes.find((p) => p.id === value);
            if (pallet) {
              updated.price = pallet.price;
            }
          }
          if (field === "quantity" || field === "price" || field === "type") {
            updated.total = updated.quantity * updated.price;
          }
          return updated;
        }
        return item;
      }),
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.23;
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1
              className="text-3xl font-semibold"
              style={{ color: colors.textPrimary }}
            >
              Nowe zamówienie
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Wypełnij formularz aby utworzyć nowe zamówienie
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Anuluj</Button>
          <Button
            style={{
              backgroundColor: colors.primary,
              color: colors.primaryForeground,
            }}
          >
            <Save className="w-4 h-4 mr-2" />
            Zapisz zamówienie
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: colors.textPrimary }}
            >
              Dane klienta
            </h3>
            <div className="space-y-4">
              <div>
                <Label>Wybierz klienta</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Wybierz z listy lub dodaj nowego" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cli1">Firma ABC Sp. z o.o.</SelectItem>
                    <SelectItem value="cli2">Logistyka XYZ</SelectItem>
                    <SelectItem value="cli3">Transport 24</SelectItem>
                    <SelectItem value="new">+ Dodaj nowego klienta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="kontakt@firma.pl"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Telefon</Label>
                  <Input
                    type="tel"
                    placeholder="+48 123 456 789"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div
            className="rounded-lg border overflow-hidden"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div
              className="p-6 border-b flex items-center justify-between"
              style={{ borderColor: colors.border }}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: colors.textPrimary }}
              >
                Pozycje zamówienia
              </h3>
              <Button size="sm" onClick={addItem} className="gap-2">
                <Plus className="w-4 h-4" />
                Dodaj pozycję
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: colors.border }}>
                  <TableHead style={{ color: colors.textSecondary }}>
                    Typ palety
                  </TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>
                    Ilość
                  </TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>
                    Cena jedn.
                  </TableHead>
                  <TableHead style={{ color: colors.textSecondary }}>
                    Wartość
                  </TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    style={{ borderColor: colors.border }}
                  >
                    <TableCell>
                      <Select
                        value={item.type}
                        onValueChange={(value: any) =>
                          updateItem(item.id, "type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {palletTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "price",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-32"
                      />
                    </TableCell>
                    <TableCell
                      className="font-semibold"
                      style={{ color: colors.textPrimary }}
                    >
                      {item.total.toLocaleString("pl-PL")} PLN
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                      >
                        <Trash2
                          className="w-4 h-4"
                          style={{ color: colors.error }}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div
              className="p-6 border-t space-y-2"
              style={{ borderColor: colors.border }}
            >
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Suma netto:</span>
                <span
                  className="font-medium"
                  style={{ color: colors.textPrimary }}
                >
                  {subtotal.toLocaleString("pl-PL")} PLN
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>VAT (23%):</span>
                <span
                  className="font-medium"
                  style={{ color: colors.textPrimary }}
                >
                  {tax.toLocaleString("pl-PL")} PLN
                </span>
              </div>
              <div
                className="h-px my-2"
                style={{ backgroundColor: colors.border }}
              />
              <div className="flex justify-between">
                <span
                  className="font-semibold text-lg"
                  style={{ color: colors.textPrimary }}
                >
                  Suma brutto:
                </span>
                <span
                  className="font-semibold text-lg"
                  style={{ color: colors.success }}
                >
                  {total.toLocaleString("pl-PL")} PLN
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <Label>Uwagi do zamówienia</Label>
            <Textarea
              placeholder="Dodatkowe informacje, specjalne życzenia klienta..."
              className="mt-2"
              rows={4}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Delivery */}
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: colors.textPrimary }}
            >
              Dostawa
            </h3>
            <div className="space-y-4">
              <div>
                <Label>Data dostawy</Label>
                <Input type="date" className="mt-2" />
              </div>
              <div>
                <Label>Adres dostawy</Label>
                <Textarea
                  placeholder="Ulica, miasto, kod pocztowy"
                  className="mt-2"
                  rows={3}
                />
              </div>
              <div>
                <Label>Metoda dostawy</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Wybierz metodę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="own">Transport własny</SelectItem>
                    <SelectItem value="courier">Kurier</SelectItem>
                    <SelectItem value="pickup">Odbiór osobisty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: colors.textPrimary }}
            >
              Płatność
            </h3>
            <div className="space-y-4">
              <div>
                <Label>Metoda płatności</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Wybierz metodę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transfer">Przelew</SelectItem>
                    <SelectItem value="cash">Gotówka</SelectItem>
                    <SelectItem value="card">Karta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Termin płatności (dni)</Label>
                <Input type="number" defaultValue="14" className="mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
