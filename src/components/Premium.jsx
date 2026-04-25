import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const CheckIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const StarIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CrownIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
  </svg>
);

const silverFeatures = [
  "Verified checkmark",
  "Enhanced Grok access",
  "Advanced analytics",
  "Less ads in your feeds",
];

const goldFeatures = [
  "Verified checkmark",
  "Enhanced Grok access",
  "Advanced analytics",
  "Less ads in your feeds",
  "Boosted replies",
  "Write Articles",
  "Get paid to post",
  "Creator Subscriptions",
];

const Premium = () => {
  const [selected, setSelected] = useState("gold");
  const [memberShip, setMembership] = useState(false);
  const verifyMembership = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });
      if (res.isVerfied) {
        setMembership(true);
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handlePay = async (membership) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membership: membership,
        },
        { withCredentials: true },
      );
      const { amount, currency, notes, orderId, userId } =
        order?.data?.savedPayment;
      // it should open razorpay dialog box
      const options = {
        key: order.data.keyId,
        amount,
        currency,
        name: "Vani India Pvt.Ltd",
        description: "Welcome to our Premium Side",
        order_id: orderId,
        prefill: {
          name: notes?.firstName + " " + notes?.lastName, //your customer's name
          email: notes?.emailId,
          contact: "+919876543210", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: verifyMembership,
      };
      var rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    verifyMembership();
  }, []);

  if (memberShip) {
    return (
      <div className="min-h-screen w-full overflow-y-auto no-scrollbar pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-white/10 bg-black/60 backdrop-blur-xl px-5 py-4">
          <h1 className="text-xl font-bold text-white">Premium</h1>
        </div>

        <div className="relative flex flex-col items-center justify-center px-5 pt-16 pb-10 text-center overflow-hidden">
          {/* Animated background orbs */}
          <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-amber-500/15 via-amber-400/10 to-transparent blur-3xl animate-pulse" />
          <div
            className="pointer-events-none absolute top-20 right-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-transparent blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          {/* Verified badge with glow */}
          <div className="relative mb-8">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-amber-400/30 to-emerald-400/20 blur-2xl animate-pulse" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-2xl shadow-amber-500/30">
              <svg
                className="h-12 w-12 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>

          {/* Success text */}
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-3">
            You're a Premium Member!
          </h2>
          <p className="text-base text-zinc-400 max-w-sm mx-auto leading-relaxed mb-10">
            You have already subscribed to our Membership plan. Enjoy all the
            exclusive features that come with your subscription.
          </p>

          {/* Membership card */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-amber-400/50 via-amber-500/25 to-amber-600/10 blur-[1px]" />
            <div className="relative rounded-3xl bg-gradient-to-b from-amber-950/50 via-zinc-900/95 to-black p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-md shadow-amber-500/30">
                  <CrownIcon />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Active Membership
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse" />
                  </h3>
                  <p className="text-xs text-amber-500/70">
                    Premium Subscriber
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "Verified checkmark",
                  "Enhanced Grok access",
                  "Advanced analytics",
                  "Priority support",
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-3 text-sm">
                    <span className="text-amber-400">
                      <CheckIcon />
                    </span>
                    <span className="text-zinc-300">{perk}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 text-center">
                <p className="text-xs text-zinc-500 mb-1">Status</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Thank you note */}
          <p className="mt-10 text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
            Thank you for supporting us! Your membership helps us build a better
            platform for everyone.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-y-auto no-scrollbar pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-black/60 backdrop-blur-xl px-5 py-4">
        <h1 className="text-xl font-bold text-white">Premium</h1>
      </div>

      {/* Hero Section */}
      <div className="relative px-5 pt-10 pb-8 text-center overflow-hidden">
        {/* Animated gradient orb */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-gradient-to-br from-amber-500/20 via-sky-500/15 to-purple-500/20 blur-3xl animate-pulse" />

        <div className="relative">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/25">
            <CrownIcon />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Upgrade to Premium
          </h2>
          <p className="mt-3 text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
            Unlock exclusive features and elevate your experience with a
            verified badge, enhanced tools, and more.
          </p>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-1 rounded-full bg-white/[0.06] p-1 border border-white/10">
          <button
            onClick={() => setSelected("silver")}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
              selected === "silver"
                ? "bg-gradient-to-r from-zinc-300 to-zinc-400 text-black shadow-lg shadow-zinc-400/20"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Silver
          </button>
          <button
            onClick={() => setSelected("gold")}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
              selected === "gold"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/25"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Gold
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6 px-5 max-w-3xl mx-auto">
        {/* Silver Card */}
        <div
          onClick={() => setSelected("silver")}
          className={`group relative w-full max-w-sm cursor-pointer rounded-3xl border p-[1px] transition-all duration-500 ${
            selected === "silver"
              ? "border-transparent"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          {/* Glow border for selected */}
          {selected === "silver" && (
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-zinc-300/60 via-zinc-400/30 to-zinc-500/10 blur-[1px]" />
          )}

          <div
            className={`relative h-full rounded-3xl p-6 transition-all duration-500 ${
              selected === "silver"
                ? "bg-gradient-to-b from-zinc-800/90 via-zinc-900/95 to-black"
                : "bg-white/[0.03] hover:bg-white/[0.05]"
            }`}
          >
            {/* Tier Badge */}
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-300 to-zinc-500 shadow-md">
                <StarIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Silver</h3>
                <p className="text-xs text-zinc-500">Essential tier</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">₹200</span>
                <span className="text-sm text-zinc-500 font-medium">
                  /month
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="mb-6 space-y-3">
              {silverFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <span className="text-zinc-400">
                    <CheckIcon />
                  </span>
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`w-full rounded-full py-3 text-sm font-bold transition-all duration-300 ${
                selected === "silver"
                  ? "bg-gradient-to-r from-zinc-200 to-zinc-300 text-black shadow-lg shadow-zinc-400/20 hover:shadow-zinc-400/30 active:scale-[0.98]"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15"
              }`}
              onClick={() => handlePay(selected)}
            >
              {selected === "silver" ? "Subscribe to Silver" : "Select Silver"}
            </button>
          </div>
        </div>

        {/* Gold Card */}
        <div
          onClick={() => setSelected("gold")}
          className={`group relative w-full max-w-sm cursor-pointer rounded-3xl border p-[1px] transition-all duration-500 ${
            selected === "gold"
              ? "border-transparent"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          {/* Popular badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <span className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1 text-[11px] font-bold text-black shadow-lg shadow-amber-500/30 whitespace-nowrap">
              ✦ MOST POPULAR
            </span>
          </div>

          {/* Glow border for selected */}
          {selected === "gold" && (
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-amber-400/60 via-amber-500/30 to-amber-600/10 blur-[1px]" />
          )}

          <div
            className={`relative h-full rounded-3xl pt-8 px-6 pb-6 transition-all duration-500 ${
              selected === "gold"
                ? "bg-gradient-to-b from-amber-950/40 via-zinc-900/95 to-black"
                : "bg-white/[0.03] hover:bg-white/[0.05]"
            }`}
          >
            {/* Tier Badge */}
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-md shadow-amber-500/30">
                <CrownIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Gold</h3>
                <p className="text-xs text-amber-500/70">Premium tier</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">₹500</span>
                <span className="text-sm text-zinc-500 font-medium">
                  /month
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="mb-6 space-y-3">
              {goldFeatures.map((feature, i) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <span className={i >= 4 ? "text-amber-400" : "text-zinc-400"}>
                    <CheckIcon />
                  </span>
                  <span
                    className={
                      i >= 4 ? "text-white font-medium" : "text-zinc-300"
                    }
                  >
                    {feature}
                  </span>
                  {i >= 4 && (
                    <span className="ml-auto rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                      GOLD
                    </span>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`w-full rounded-full py-3 text-sm font-bold transition-all duration-300 ${
                selected === "gold"
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-[0.98]"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15"
              }`}
              onClick={() => handlePay(selected)}
            >
              {selected === "gold" ? "Subscribe to Gold" : "Select Gold"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 px-5 text-center">
        <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
          Subscriptions auto-renew monthly. Cancel anytime from your account
          settings. By subscribing, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default Premium;
