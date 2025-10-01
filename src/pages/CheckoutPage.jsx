import React, { useState } from "react";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";

const CheckoutPage = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  // Generate PDF Receipt with full details
  const generateReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Cake Order Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Customer Name: ${formData.name}`, 20, 40);
    doc.text(`Address: ${formData.address}`, 20, 50);
    doc.text(`Contact: ${formData.contact}`, 20, 60);
    doc.text(`Delivery Option: ${formData.deliveryOption}`, 20, 70);

    let y = 90;
    cartItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - Qty: ${item.quantity || 1} - ¥ ${(item.price * (item.quantity || 1)).toLocaleString("ja-JP")}`,
        20,
        y
      );
      y += 10;

      // Add extra details if customized
      if (item.details) {
        Object.entries(item.details).forEach(([key, value]) => {
          doc.text(`   • ${key}: ${value}`, 30, y);
          y += 8;
        });
      }
    });

    doc.text(`Total Price: ¥ ${totalPrice.toLocaleString("ja-JP")}`, 20, y + 10);
    doc.save("order-receipt.pdf");
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!screenshot) {
      alert("Please upload the payment screenshot before placing the order.");
      return;
    }

    // Build formatted order details text
    let orderDetails = `Cake Order Receipt\n\n`;
    orderDetails += `Customer Name: ${formData.name}\n`;
    orderDetails += `Address: ${formData.address}\n`;
    orderDetails += `Contact: ${formData.contact}\n`;
    orderDetails += `Delivery Option: ${formData.deliveryOption}\n\n`;
    orderDetails += `Items:\n`;

    cartItems.forEach((item, index) => {
      orderDetails += `${index + 1}. ${item.name} - Qty: ${
        item.quantity || 1
      } - ¥ ${(item.price * (item.quantity || 1)).toLocaleString("ja-JP")}\n`;

      // Add details for customized cakes
      if (item.details) {
        Object.entries(item.details).forEach(([key, value]) => {
          orderDetails += `   • ${key}: ${value}\n`;
        });
      }
    });

    orderDetails += `\nTotal Price: ¥ ${totalPrice.toLocaleString("ja-JP")}\n`;

    const templateParams = {
      customer_name: formData.name,
      order_details: orderDetails,
    };

    emailjs
      .send(
        "service_ollhd2j", // your EmailJS service ID
        "template_pc6jn6i", // your EmailJS template ID
        templateParams,
        "eGLXq860KTfTP6LZB" // your EmailJS public key
      )
      .then(
        () => {
          setOrderPlaced(true);
        },
        (error) => {
          console.error("FAILED...", error);
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-pink-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
        {!orderPlaced ? (
          <>
            <h1 className="text-3xl font-bold text-pink-700 mb-6">Checkout</h1>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />

              <select
                name="deliveryOption"
                value={formData.deliveryOption}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>

              <p className="text-xl font-bold text-orange-700 mt-4">
                Total: ¥ {totalPrice.toLocaleString("ja-JP")}
              </p>

              <div className="mt-6 text-sm">
                <p className="font-bold text-pink-700">
                  Pay in the following account:
                </p>
                <p>Bank: Jp Bank</p>
                <p>Account Title: イジャズ　アンサ</p>
                <p>Account Number: 10460-34947021</p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Upload Payment Screenshot:</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full mt-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg"
              >
                Place the Order
              </button>
            </form>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              ✅ Order Placed Successfully!
            </h2>
            <p className="mb-6 text-gray-700">
              Thank you for your order. A confirmation email has been sent.
            </p>
            <button
              onClick={generateReceipt}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg"
            >
              📄 Download Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
