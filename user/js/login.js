const appwrite_url = "https://fra.cloud.appwrite.io/v1"
const project_id = "686815220031b86fa074"

const client = new Appwrite.Client()
                                    .setEndpoint(appwrite_url)
                                    .setProject(project_id)


const account = new Appwrite.Account(client)

const notyf = new Notyf();

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("login-form").addEventListener("submit",  (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
  //  notyf.success(`${firstname} - ${lastname} -  ${username} -  ${email} - ${phoneno} -  ${password}`)
    
    var submitBtn = document.querySelector(".submit");

    submitBtn.innerHTML = "Processing...";
    
      
    const createSessionPromise = account.createEmailPasswordSession(email, password)
                                            .then(res => {
                                                location.replace("../../dashboard");
                                                submitBtn.innerHTML = "Login";
                                            })
                                            .catch(err => {
                                                submitBtn.innerHTML = "Login";
                                              notyf.error("We are unable to log you in, please ensure your details are correct!")
                                            });

      
  
    

  })

})


