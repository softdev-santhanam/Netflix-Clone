
export default async function displayRazorPay() {
    const data = await fetch("http://localhost:5000/razorpay", {
      method: "POST",
    }).then((t) => t.json());
   
    // console.log(data);
   
    const options = {
      key: "rzp_test_08aVXLQMyXDDCN",
      currency: data.currency,
      amount: data.amount,
      name: "SanthanaKrishnan",
      description: "Wallet Transaction",
      image: "http://localhost:5000/logo.jpeg",
      order_id: data.id,
      handler: function (response) {
        alert("PAYMENT ID ::" + response.razorpay_payment_id);
        alert("ORDER ID :: " + response.razorpay_order_id);
      },
      prefill: {
        name: "Santhanakrishnan",
        email: "inovsandy@gmail.com",
        contact: "9489623700",
      },
    };
   
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }