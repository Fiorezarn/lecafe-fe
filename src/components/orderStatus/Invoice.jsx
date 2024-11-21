import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function DownloadInvoice({ orderData }) {
  const handleDownload = () => {
    const doc = new jsPDF();
    const menus = JSON.parse(orderData.OrderDetail[0].od_mn_json);

    doc.addImage(
      "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1731496206/Le_Cafe-removebg-preview_a0izhq.png",
      20,
      8,
      30,
      30
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);

    doc.text("INVOICE", 140, 25);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 73, 94);

    doc.text(`Invoice Number: INV-${orderData.or_id}`, 140, 35);
    doc.text(`Date: ${formatDate(orderData.createdAt)}`, 140, 40);
    doc.text(`Order ID: ORDER-${orderData.or_id}`, 140, 45);

    doc.setFont("helvetica", "bold");
    doc.text("Le Café", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text("Gandaria City", 20, 55);
    doc.text("Jakarta Selatan, Indonesia, 12345", 20, 60);
    doc.text("Phone: +62 123 456 789", 20, 65);

    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 20, 75);
    doc.setFont("helvetica", "normal");
    doc.text("Customer Name", 20, 80);
    if (isNaN(Number(orderData.or_site))) {
      doc.text(`Delivery Address: ${orderData.or_site}`, 20, 85);
    } else {
      doc.text(`Dine-in Table: ${orderData.or_site}`, 20, 85);
    }

    doc.autoTable({
      startY: 95,
      head: [["Item", "Price", "Quantity", "Total"]],
      body: menus.map((menu) => [
        menu.name,
        formatPrice(menu.price),
        menu.quantity,
        formatPrice(menu.price * menu.quantity),
      ]),
      styles: { fontSize: 9, cellPadding: 5 },
      headStyles: { fillColor: [44, 62, 80], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30, halign: "right" },
        2: { cellWidth: 30, halign: "center" },
        3: { cellWidth: 30, halign: "right" },
      },
    });

    const finalY = doc.lastAutoTable.finalY || 120;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Total: ${formatPrice(orderData.or_total_price)}`,
      150,
      finalY + 10
    );
    doc.setFont("helvetica", "normal");
    doc.text(`Payment Method: ${orderData.payment_method}`, 20, finalY + 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your order!", 20, finalY + 30);

    doc.save(`invoice-ORDER-${orderData.or_id}-LeCafé.pdf`);
  };

  return (
    <Button onClick={handleDownload} className="mt-4 w-full">
      <Download className="mr-2 h-4 w-4" /> Download Invoice (PDF)
    </Button>
  );
}
