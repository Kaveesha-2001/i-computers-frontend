import { createClient } from "@supabase/supabase-js";


const supabase = createClient(import.meta.env.VITE_API_url, import.meta.env.VITE_API_key);

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
