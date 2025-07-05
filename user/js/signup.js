
const appwrite_url = "https://fra.cloud.appwrite.io/v1"
const project_id = "686815220031b86fa074"

const client: Appwrite.Client = new Appwrite.Client()
										.setEndpoint(appwrite_url)
										.setProject(project_id)


const account = new Appwrite.Account(client)

const alertDiv = document.getElementById("alert-div");

document.getElementById("signup-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let firstname = document.getElementById("firstname");
	let lastname = document.getElementById("lastname");
	let username = document.getElementById("username");
	let phoneno = document.getElementById("phoneno");
	let email = document.getElementById("email");
	let password = document.getElementById("password");
	let confirmPassword = document.getElementById("confirm-password");
	let checkbox = document.getElementById("checkbox");

	if (checkbox.checked) {
		alertDiv.innerHTML = customAlert("Signup successful!", "success")
	}

})


function customAlert(message, state) {
	return `<div id="alert" style="
  position:fixed;
  top:20px;
  right:20px;
  background:#4caf50;
  color:#fff;
  padding:10px 20px;
  border-radius:5px;
  font-family:sans-serif;
  box-shadow:0 2px 6px rgba(0,0,0,0.2);
">${message}</div>

<script>
   const el = document.getElementById('alert');
   el.style.display = 'block';
   setTimeout(() => el.style.display = 'none', 3000)
</script>`
}