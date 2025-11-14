export async function handler(event, context) {
  try {
    const MAX_WHATSAPP = 6;

    const encodedLinks = [
      "aHR0cHM6Ly93YS5tZS85MTgwMDY4NTU5MzE=",
      "aHR0cHM6Ly93YS5tZS85MTkwNDc0OTk1OTI=",
      "aHR0cHM6Ly93YS5tZS85MTc5ODMzMjQ3MTQ=",
      "aHR0cHM6Ly93YS5tZS85MTg5ODQ2OTYxNTE=",
      "aHR0cHM6Ly93YS5tZS85MTk5ODY3Mjg3NDA=",
      "aHR0cHM6Ly93YS5tZS85MTkwMjQ3OTg3NzA=",
      "aHR0cHM6Ly93YS5tZS85MTc1ODQwMTk3NDg=",
      "aHR0cHM6Ly93YS5tZS85MTk3ODYwMzc1MDU=",
      "aHR0cHM6Ly93YS5tZS85MTg0MzQzOTYzMDM=",
      "aHR0cHM6Ly93YS5tZS85MTcwMTE0NzY3OTE=",
      "aHR0cHM6Ly93YS5tZS85MTcwNjc2OTc1NTQ=",
      "aHR0cHM6Ly93YS5tZS85MTcwNjEyNzA2MjQ=",

      // TELEGRAM LINK
      "aHR0cHM6Ly90Lm1lLyttUjVZdUpvV2tlSXhOemRs",

      // NEW ENCODED NUMBERS YOU SENT
      "aHR0cHM6Ly93YS5tZS85MTk1NTUzNDQxOTE=",
      "aHR0cHM6Ly93YS5tZS85MTk0NzUxNDI3NDY=",
      "aHR0cHM6Ly93YS5tZS85MTYzNzg0ODAxMTU=",
      "aHR0cHM6Ly93YS5tZS85MTY5MDAzMTI1MzY=",
      "aHR0cHM6Ly93YS5tZS85MTkwMzAxMTE2NTY=",
      "aHR0cHM6Ly93YS5tZS85MTc5OTcxOTEzMjU=",
      "aHR0cHM6Ly93YS5tZS85MTc1NTg2NDk5NDk=",
      "aHR0cHM6Ly93YS5tZS85MTg3MDc3MzY0NTA=",
      "aHR0cHM6Ly93YS5tZS85MTkyMjk0NDA3NjQ=",
      "aHR0cHM6Ly93YS5tZS85MTk3OTA5OTMwMjQ=",
      "aHR0cHM6Ly93YS5tZS85MTk1MTc1NDM5NDI=",
      "aHR0cHM6Ly93YS5tZS85MTg4OTQ4ODMyNDE=",
      "aHR0cHM6Ly93YS5tZS85MTk5MDI2ODQ2MzI=",
      "aHR0cHM6Ly93YS5tZS85MTcwNTEyMTY3ODg=",
      "aHR0cHM6Ly93YS5tZS85MTk2NTE0NzcyNTk=",
      "aHR0cHM6Ly93YS5tZS85MTkwMzg5MjUxNzU=",
      "aHR0cHM6Ly93YS5tZS85MTcwODk1NjgxMjE=",
      "aHR0cHM6Ly93YS5tZS85MTk2MjI0NTE3NDc=",
      "aHR0cHM6Ly93YS5tZS85MTkwNDM3NjI1ODM=",
      "aHR0cHM6Ly93YS5tZS85MTgxMDI4ODk2OTA=",
      "aHR0cHM6Ly93YS5tZS85MTc2NjgzMDMxNDc="
    ];

    const decoded = encodedLinks.map(l => Buffer.from(l, "base64").toString("utf8").trim());
    const telegram = decoded.find(l => l.includes("t.me"));
    const whatsapps = decoded.filter(l => l.includes("wa.me"));

    const cookie = event.headers.cookie || "";
    let count = 0;
    const match = cookie.match(/shown=(\d+)/);
    if (match) count = parseInt(match[1]);

    if (count >= MAX_WHATSAPP) {
      return {
        statusCode: 302,
        headers: {
          Location: telegram,
          "Set-Cookie": "shown=0; Path=/;"
        }
      };
    }

    const randomWA = whatsapps[Math.floor(Math.random() * whatsapps.length)];

    return {
      statusCode: 302,
      headers: {
        Location: randomWA,
        "Set-Cookie": `shown=${count + 1}; Path=/;`
      }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Server Error"
    };
  }
}
