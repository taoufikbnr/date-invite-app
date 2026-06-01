"use server";

export async function sendDateEmail({
  to,
  date,
  time,
  activities,
}: {
  to: string;
  date: string;
  time: string;
  activities: string[];
}) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Date Invite 💖",
        email: process.env.SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject: "SHE SAID YES ❤️",
      htmlContent: `
        <div style="font-family:Arial;padding:20px">
          <h2>💖 She said YES!</h2>
          <p>Your date is confirmed 🎉</p>

          <h3>Date: ${date}</h3>
          <h3>Time: ${time}</h3>

          <h4>Activities:</h4>
          <ul>
            ${activities.map((a) => `<li>${a}</li>`).join("")}
          </ul>

          <br/>
          <p>Good luck soldier 🫡</p>
        </div>
      `,
    }),
  });
if (!res.ok) {
  const error = await res.text();

  console.error("🔥 BREVO FULL ERROR:", error);

  throw new Error(error);
}
  return await res.json();
}