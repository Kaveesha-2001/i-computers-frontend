import { createClient } from "@supabase/supabase-js";

let url = "https://qkoichhnxowhqdcmknul.supabase.co";
let key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrb2ljaGhueG93aHFkY21rbnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTkzMjEsImV4cCI6MjA4ODg5NTMyMX0.9RYfcnz36A88ab4IIIc0_DC-pppbOZJXnYy39pjnWxw";
const supabase = createClient(url, key);

export default function uploadMedia(file) {
	return new Promise((resolve, reject) => {
		if (file == null) {
			reject("No file selected");
		} else {
			const timeStamp = new Date().getTime();
			const fileName = timeStamp + "_" + file.name;

			supabase.storage
				.from("images").upload(fileName, file, {
					upsert: false,
					cacheControl: "3600",
				}).then(() => {

					const publicUrl = supabase.storage
						.from("images")
						.getPublicUrl(fileName).data.publicUrl;

					resolve(publicUrl);
				})
				.catch((error) => {
					reject(error);
				});
		}
	});
}
