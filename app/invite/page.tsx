"use client";

import { useState } from "react";
import { createInvitation } from "../actions/create-invitation";
export default function Home() {
  const [email, setEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

if (!isValidEmail) {
  alert("Please enter a valid email");
  return;
}
    try {
      setLoading(true);

      const invitationId = await createInvitation(email);

      const link = `${window.location.origin}/invite/${invitationId}`;

      setInviteLink(link);
    } catch (error) {
      console.error(error);
      alert("Failed to create invitation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-white">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-3xl font-bold text-center">
          Create Your Date Invite 💖
        </h1>

        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={handleCreate}
          disabled={loading || !email}
          className="w-full bg-pink-500 text-white p-3 rounded-lg"
        >
          {loading ? "Creating..." : "Create Invitation"}
        </button>

        {inviteLink && (
          <div className="space-y-2">
            <p className="font-medium">Your invitation link:</p>

            <input
              readOnly
              value={inviteLink}
              className="w-full border rounded-lg p-2"
            />

            <button
              onClick={() => navigator.clipboard.writeText(inviteLink)}
              className="w-full border rounded-lg p-2"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    </main>
  );
}