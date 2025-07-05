const appwrite_url = "https://fra.cloud.appwrite.io/v1"
const project_id = "686815220031b86fa074"

const client = new Appwrite.Client()
                                    .setEndpoint(appwrite_url)
                                    .setProject(project_id)


const account = new Appwrite.Account(client)

const notyf = new Notyf();

const alertDiv = document.getElementById("alert-div");

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("signup-form").addEventListener("submit",  (e) => {
    e.preventDefault();


    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let username = document.getElementById("username").value;
    let phoneno = document.getElementById("phoneno").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let checkbox = document.getElementById("checkbox");


  //  notyf.success(`${firstname} - ${lastname} -  ${username} -  ${email} - ${phoneno} -  ${password}`)
    
    var submitBtn = document.querySelector(".submit");

    submitBtn.innerHTML = "Processing...";
    if (password === confirmPassword) {
      const promise = account.create(username, email, password, firstname + " " + lastname) 
      promise.then(
        res => {
          notyf.success("Account created successfully!");
          submitBtn.innerHTML = "Register";

      
          const createSessionPromise = account.createEmailPasswordSession(email, password)
                                                    .then(res => {})
                                                    .catch(err => {
                                                      notyf.error("We are unable to log you, please do so manually or try again later.")
                                                    });

        }
      ).catch(err => {
          console.log(err);
          notyf.error("An error occured! We were unable to create an account for you, please try again. " + err);
          submitBtn.innerHTML = "Register";
        })
    } else {
      notyf.error("Passwords don't match!");
    }
    

  })

})


