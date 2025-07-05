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
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const submitBtn = document.querySelector(".submit");

    submitBtn.innerHTML = "Checking...";

    try {
      // Query documents where email == email and password == password
      const res = await databases.listDocuments(
        database_id,
        collection_id,
        [
          Appwrite.Query.equal("email", email),
          Appwrite.Query.equal("password", password)
        ]
      );

      if (res.documents.length > 0) {
        const userDoc = res.documents[0];
        localStorage.setItem("id", userDoc.$id);
        notyf.success("Login successful!");
        location.replace("../../dashboard");
      } else {
        notyf.error("Invalid email or password!");
        submitBtn.innerHTML = "Login";
      }
    } catch (err) {
      console.error("Login failed:", err);
      notyf.error("An error occurred. Try again.");
      submitBtn.innerHTML = "Login";
    }
  });
});
