import { get_storage, set_storage } from "./worker_comms";
  console.log("load added");

(async _ => {
  console.log(document.querySelector("#api_key"));
  const cur_key = (await get_storage("GEMINI_API_KEY"));
  console.log("Key is ",cur_key);
  if(cur_key) {
    (document.querySelector("#api_key") as HTMLInputElement).value = cur_key
  }
  (document.querySelector("#api_key") as HTMLInputElement).addEventListener("keyup", async (event) => {
    console.log("Going to set api key");
    await set_storage("GEMINI_API_KEY",(event.target as HTMLInputElement).value);
    console.log("SET API KEY");
  });
  console.log("Set storage listener added")

})();
