const appwrite_url = "https://fra.cloud.appwrite.io/v1";
const project_id = "68b790860035ee5cedf6";
const database_id = "68b793dd000abf26b17e";
const collection_id = "users";

const client = new Appwrite.Client()
  .setEndpoint(appwrite_url)
  .setProject(project_id);

const databases = new Appwrite.Databases(client);
const notyf = new Notyf();

function redirectUnregistered() {
  const userId = localStorage.getItem("id");

  if (!userId) {
    location.replace("../../user");
    return;
  }

  databases.getDocument(database_id, collection_id, userId)
    .then((doc) => {
      document.getElementById("headername").innerText = doc.firstname || "User";
      document.getElementById("balance").innerText = doc.balance || 0.00;
      notyf.success("Welcome back!");
    })
    .catch((err) => {
      console.error("User not found or error occurred:", err);
      location.replace("../../user");
    });
}

redirectUnregistered();
