const appwrite_url = "https://fra.cloud.appwrite.io/v1";
const project_id = "686815220031b86fa074";
const database_id = "686969bc000e208d6e74";
const collection_id = "686969c800398b500084";

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
