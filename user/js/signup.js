const appwrite_url = "https://fra.cloud.appwrite.io/v1";
const project_id = "686815220031b86fa074";
const database_id = "686969bc000e208d6e74";
const collection_id = "686969c800398b500084";

const client = new Appwrite.Client()
  .setEndpoint(appwrite_url)
  .setProject(project_id);

const databases = new Appwrite.Databases(client);
const notyf = new Notyf();

const alertDiv = document.getElementById("alert-div");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let phoneno = document.getElementById("phoneno").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let checkbox = document.getElementById("checkbox");

    const submitBtn = document.querySelector(".submit");
    submitBtn.innerHTML = "Processing...";

    if (password === confirmPassword) {
      const ID = Appwrite.ID;
      const currentUserId = ID.unique();

      databases.createDocument(
        database_id,
        collection_id,
        currentUserId,
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneno: phoneno,
          password: password
        }
      ).then(res => {
        localStorage.setItem("id", currentUserId);
        notyf.success("Account created successfully!");
        submitBtn.innerHTML = "Register";
        location.replace("../../dashboard");
      }).catch(err => {
        console.error(err);
        notyf.error("An error occurred while creating your account: " + err.message);
        submitBtn.innerHTML = "Register";
      });
    } else {
      notyf.error("Passwords don't match!");
    }
  });
});
