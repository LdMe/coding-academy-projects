package generator;

import java.io.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class Saver {
	public static void SaveFile(String f,String key) {

		FileOutputStream fop = null;
		File file;
		String content =key+ "\n";

		try {

			file = new File(f);
			fop = new FileOutputStream(f,true);

			// if file doesnt exists, then create it
			if (!file.exists()) {
				file.createNewFile();
			}

			// get the content in bytes
			byte[] contentInBytes = content.getBytes();

			fop.write(contentInBytes);
			fop.flush();
			fop.close();

			System.out.println("Done");

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (fop != null) {
					fop.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}