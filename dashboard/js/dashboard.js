const appwrite_url = "https://fra.cloud.appwrite.io/v1"
const project_id = "686815220031b86fa074"

const client = new Appwrite.Client()
                                    .setEndpoint(appwrite_url)
                                    .setProject(project_id)


const account = new Appwrite.Account(client)

const notyf = new Notyf();


async function redirectUnregistered(){
  try {
   let user = await account.get() 
   notify.success("Welcome!");
   document.getElementById("headername").innerHTML = user.name;
    console.log(JSON.stringify(user))
  } catch (error) {
    console.log(error);
    location.replace("/../../user/index.html")
  }

}

redirectUnregistered();
