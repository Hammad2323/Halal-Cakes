import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import bakeryLogo from "../assets/bakery-logo.png"; 


const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    deliveryOption: "pickup",
  });
  const [screenshot, setScreenshot] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setScreenshot(e.target.files[0]);

  const generateReceipt = () => {
    if (!orderSnapshot) return;
    const { customer, items, total } = orderSnapshot;
    const doc = new jsPDF();
    doc.addImage(bakeryLogo, "PNG", 85, 10, 40, 40);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Amin's Halal Bakery", 105, 60, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Order Receipt", 105, 70, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Customer Name: ${customer.name}`, 20, 90);
    doc.text(`Address: ${customer.address}`, 20, 100);
    doc.text(`Contact: ${customer.contact}`, 20, 110);
    doc.text(`Delivery Option: ${customer.deliveryOption}`, 20, 120);

    doc.setLineWidth(0.5);
    doc.line(20, 125, 190, 125);

    let y = 140;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Order Details:", 20, y);
    y += 12;

    doc.setFont("helvetica", "normal");
    items.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. ${item.name} (x${item.quantity || 1}) - ¥ ${(item.price * (item.quantity || 1)).toLocaleString("ja-JP")}`,
        20,
        y
      );
      y += 8;

      if (item.details) {
        Object.entries(item.details).forEach(([key, value]) => {
          doc.text(`   • ${key}: ${value}`, 25, y);
          y += 7;
        });
      }

      y += 3;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Price: ¥ ${total.toLocaleString("ja-JP")}`, 20, y + 10);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for ordering with Amin's Halal Bakery!", 105, y + 30, {
      align: "center",
    });

    doc.save("order-receipt.pdf");
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!screenshot) {
      alert("Please upload the payment screenshot before placing the order.");
      return;
    }

    const snapshot = {
      customer: { ...formData },
      items: [...cartItems],
      total: totalPrice,
    };
    setOrderSnapshot(snapshot);

    let orderDetails = `Cake Order Receipt\n\nCustomer Name: ${formData.name}\nAddress: ${formData.address}\nContact: ${formData.contact}\nDelivery Option: ${formData.deliveryOption}\n\nItems:\n`;
    cartItems.forEach((item, index) => {
      orderDetails += `${index + 1}. ${item.name} - Qty: ${item.quantity || 1} - ¥ ${(item.price * (item.quantity || 1)).toLocaleString("ja-JP")}\n`;
      if (item.details) {
        Object.entries(item.details).forEach(([key, value]) => {
          orderDetails += `   • ${key}: ${value}\n`;
        });
      }
    });
    orderDetails += `\nTotal Price: ¥ ${totalPrice.toLocaleString("ja-JP")}\n`;

    emailjs.send(
      "service_ollhd2j",
      "template_pc6jn6i",
      { customer_name: formData.name, order_details: orderDetails },
      "eGLXq860KTfTP6LZB"
    ).then(
      () => { setOrderPlaced(true); dispatch(clearCart()); },
      (error) => { console.error("FAILED...", error); }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF3E0] via-[#FFE6CC] to-[#FFDFC0] px-4" style={{ fontFamily: "'Lora', serif" }}>
      <div className="bg-[#FFF8F0]/95 p-10 rounded-3xl shadow-lg w-full max-w-lg text-center text-[#5C3A21]">
        {!orderPlaced ? (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-[#5C3A21] drop-shadow-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
              Checkout
            </h1>
            <form onSubmit={handlePlaceOrder} className="space-y-4 text-lg">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
                className="w-full p-3 border rounded-lg border-[#D9B38C] text-[#5C3A21] font-semibold" required />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange}
                className="w-full p-3 border rounded-lg border-[#D9B38C] text-[#5C3A21] font-semibold" required />
              <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange}
                className="w-full p-3 border rounded-lg border-[#D9B38C] text-[#5C3A21] font-semibold" required />
              <select name="deliveryOption" value={formData.deliveryOption} onChange={handleChange}
                className="w-full p-3 border rounded-lg border-[#D9B38C] text-[#5C3A21] font-semibold">
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>

              <p className="text-2xl font-bold mt-4 text-[#5C3A21]">
                Total: ¥ {totalPrice.toLocaleString("ja-JP")}
              </p>

              <div className="mt-6 text-base text-[#5C3A21]">
                <p className="font-bold">Pay in the following account:</p>
                <p>Bank: Jp Bank</p>
                <p>Account Title: イジャズ　アンサ</p>
                <p>Account Number: 10460-34947021</p>
              </div>

              <div className="mt-4">
                <p className="text-base text-[#5C3A21]">Upload Payment Screenshot:</p>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full mt-2" required />
              </div>

              <button type="submit"
                className="w-full mt-6 bg-[#A6693A] hover:bg-[#8C532F] text-[#FFF8F0] font-bold py-3 px-4 rounded-xl text-lg">
                Place the Order
              </button>
            </form>
          </>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              ✅ Order Placed Successfully!
            </h2>
            <p className="mb-6 text-[#5C3A21] text-lg">
              Thank you for your order. A confirmation email has been sent.
            </p>
            <button onClick={generateReceipt}
              className="bg-[#A6693A] hover:bg-[#8C532F] text-[#FFF8F0] px-6 py-3 rounded-xl text-lg font-semibold">
              📄 Download Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
