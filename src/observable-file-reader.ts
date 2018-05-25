import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export function readFileAsDataURL(file: Blob): Observable<string>
{
	return Observable.create((observable) => {
		const fileReader = new FileReader;

		fileReader.onload = (() => {
			observable.next(fileReader.result);
			observable.complete();
		});

		fileReader.readAsDataURL(file);
	});
}


export function readFileAsBase64(file: Blob): Observable<string>
{
	return readFileAsDataURL(file).pipe(
		map(stripBase64Prefix),
	);
}


export function readFileInChunksAsDataURL(file: Blob, chunkSize: number = 64 * 1024, contentType?: string): Observable<string>
{
	const fileSize = file.size;

	return Observable.create((observable) => {

		function readChunk(offset: number): void
		{
			const end = offset + chunkSize;
			const fileReader = new FileReader;
			const chunk = file.slice(offset, end, contentType);

			fileReader.onload = (() => {
				observable.next(fileReader.result);

				if (end >= fileSize) {
					observable.complete();
				} else {
					readChunk(end);
				}
			});

			fileReader.readAsDataURL(chunk);
		}

		readChunk(0);
	});
}


export function readFileInChunksAsBase64(file: Blob, chunkSize: number = 64 * 1024, contentType?: string): Observable<string>
{
	return readFileInChunksAsDataURL(file, chunkSize, contentType).pipe(
		map(stripBase64Prefix),
	);
}


function stripBase64Prefix(data: string): string
{
	return data.substr(data.indexOf(';base64,') + 8);
}
