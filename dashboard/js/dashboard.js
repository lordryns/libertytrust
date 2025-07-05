const appwrite_url = "https://fra.cloud.appwrite.io/v1"
const project_id = "686815220031b86fa074"

const client = new Appwrite.Client()
                                    .setEndpoint(appwrite_url)
                                    .setProject(project_id)


const account = new Appwrite.Account(client)

const notyf = new Notyf();


function redirectUnregistered(){
  account.get()
   .then(res => {
    document.getElementById("headername").innerHTML = res.name; 
    notyf.success("Welcome!");
   }).catch(err => {
    console.log(err)
    location.replace("../../user");
   })
}

redirectUnregistered();
